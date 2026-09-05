// ---------- TOAST ----------
const toastEl = document.getElementById("toast");
let toastTimer = null;

function showToast(message, type = "success") {
  toastEl.textContent = message;
  toastEl.className = "page__toast is-shown " + (type === "error" ? "is-error" : "is-success");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("is-shown");
  }, 4200);
}

// ---------- VIEW SWITCHING ----------
function setView(name) {
  document.querySelectorAll(".view").forEach((v) => {
    v.classList.toggle("is-active", v.dataset.view === name);
  });
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.view === name);
  });
  if (name === "mine") loadMine();
  if (name === "admin") loadAdmin();
}

document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

// ---------- AUTH STATE ----------
function refreshAuthUI() {
  const user = Auth.currentUser();
  const loggedIn = !!user;

  document.getElementById("nav-logged-out").classList.toggle("is-hidden", loggedIn);
  document.getElementById("nav-logged-in").classList.toggle("is-hidden", !loggedIn);
  document.getElementById("whoami").classList.toggle("is-hidden", !loggedIn);
  document.getElementById("btn-logout").classList.toggle("is-hidden", !loggedIn);
  document.getElementById("nav-admin").classList.toggle("is-hidden", !(loggedIn && user.role === "admin"));

  if (loggedIn) {
    const whoami = document.getElementById("whoami");
    whoami.innerHTML = `<strong>${escapeHtml(user.name || "")}</strong>${escapeHtml(user.email || "")}`;
    setView("book");
  } else {
    setView("login");
  }
}

document.getElementById("btn-logout").addEventListener("click", () => {
  Auth.clearToken();
  refreshAuthUI();
  showToast("Você saiu da sua conta.");
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// ---------- LOGIN ----------
document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const senha = form.senha.value;

  try {
    const res = await Api.login(email, senha);
    // O nome exato do campo que carrega o token depende de como
    // utils/apiRes.js monta a resposta. Tentamos os formatos mais
    // prováveis antes de desistir.
    const token =
      (res && (res.rows || res.data || res.token || res.result || res.dados)) ||
      (typeof res === "string" ? res : null);

    if (!token) {
      console.error("Resposta de login recebida (sem token reconhecido):", res);
      throw new Error("Resposta de login inesperada do servidor. Veja o console (F12) para o formato exato.");
    }
    Auth.setToken(token);
    form.reset();
    refreshAuthUI();
    showToast(res.message || "Bem-vindo(a) de volta!");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ---------- REGISTER ----------
document.getElementById("form-register").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  try {
    const res = await Api.register(form.nome.value.trim(), form.email.value.trim(), form.senha.value);
    showToast(res.message || "Conta criada com sucesso.");
    form.reset();
    setView("login");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ---------- FORGOT PASSWORD ----------
document.getElementById("form-forgot").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  try {
    const res = await Api.forgotPassword(form.email.value.trim());
    showToast(res.message || "Se o e-mail existir, um código foi enviado.");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ---------- RESET PASSWORD ----------
document.getElementById("form-reset").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  try {
    const res = await Api.resetPassword(form.email.value.trim(), form.code.value.trim(), form.password.value);
    showToast(res.message || "Senha alterada com sucesso.");
    form.reset();
    setView("login");
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ---------- BOOK APPOINTMENT ----------
const bookDateInput = document.getElementById("book-date");
const slotBoard = document.getElementById("slot-board");
const bookHoraInput = document.getElementById("book-hora");
const bookSubmitBtn = document.getElementById("book-submit");

const today = new Date().toISOString().slice(0, 10);
bookDateInput.min = today;

bookDateInput.addEventListener("change", loadSlots);

async function loadSlots() {
  const data = bookDateInput.value;
  bookHoraInput.value = "";
  bookSubmitBtn.disabled = true;

  if (!data) {
    slotBoard.innerHTML = `<p class="board-strip__hint">Escolha uma data para ver os horários.</p>`;
    return;
  }

  slotBoard.innerHTML = `<p class="board-strip__hint">Carregando horários...</p>`;

  try {
    const res = await Api.getDisponiveis(data);
    const horarios = (res && res.rows) || [];

    if (horarios.length === 0) {
      slotBoard.innerHTML = `<p class="board-strip__hint">Nenhum horário livre nesta data.</p>`;
      return;
    }

    slotBoard.innerHTML = "";
    horarios.forEach((item) => {
      const hora = item.horario || item;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot";
      btn.textContent = hora;
      btn.addEventListener("click", () => {
        document.querySelectorAll("#slot-board .slot").forEach((s) => s.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        bookHoraInput.value = hora;
        bookSubmitBtn.disabled = false;
      });
      slotBoard.appendChild(btn);
    });
  } catch (err) {
    slotBoard.innerHTML = `<p class="board-strip__hint">Não foi possível carregar os horários.</p>`;
    showToast(err.message, "error");
  }
}

document.getElementById("form-book").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value.trim();
  const data = form.data.value;
  const hora = bookHoraInput.value;

  if (!hora) {
    showToast("Selecione um horário disponível.", "error");
    return;
  }

  try {
    const res = await Api.criarAgendamento(nome, data, hora);
    showToast(res.message || "Agendamento confirmado.");
    form.reset();
    slotBoard.innerHTML = `<p class="board-strip__hint">Escolha uma data para ver os horários.</p>`;
    bookSubmitBtn.disabled = true;
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ---------- MY APPOINTMENTS ----------
async function loadMine() {
  const tbody = document.querySelector("#table-mine tbody");
  const emptyMsg = document.getElementById("mine-empty");
  tbody.innerHTML = "";
  emptyMsg.classList.add("is-hidden");

  try {
    const res = await Api.getMeusAgendamentos();
    const lista = Array.isArray(res) ? res : [];

    if (lista.length === 0) {
      emptyMsg.classList.remove("is-hidden");
      return;
    }

    lista.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(item.nome)}</td>
        <td>${escapeHtml(formatDate(item.data))}</td>
        <td>${escapeHtml(item.hora)}</td>
        <td>
          <button class="btn--edit-text" data-id="${item.id}" data-action="edit">Alterar</button>
          <button class="btn--danger-text" data-id="${item.id}" data-action="delete">Cancelar</button>
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    showToast(err.message, "error");
  }
}

document.querySelector("#table-mine tbody").addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.dataset.action === "delete") {
    if (!confirm("Cancelar este agendamento?")) return;
    try {
      const res = await Api.deletarAgendamento(id);
      showToast(res.message || "Agendamento cancelado.");
      loadMine();
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  if (btn.dataset.action === "edit") {
    openEditModal(id);
  }
});

function formatDate(iso) {
  if (!iso) return "";
  const d = String(iso).slice(0, 10);
  const [y, m, day] = d.split("-");
  if (!y || !m || !day) return iso;
  return `${day}/${m}/${y}`;
}

// ---------- EDIT MODAL ----------
const editModal = document.getElementById("edit-modal");
const formEdit = document.getElementById("form-edit");

function openEditModal(id) {
  formEdit.reset();
  formEdit.id.value = id;
  editModal.classList.remove("is-hidden");
}

document.getElementById("edit-cancel").addEventListener("click", () => {
  editModal.classList.add("is-hidden");
});

formEdit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = formEdit.id.value;
  const data = formEdit.data.value;
  const hora = formEdit.hora.value;

  try {
    const res = await Api.editarAgendamento(id, data, hora);
    showToast(res.message || "Horário alterado.");
    editModal.classList.add("is-hidden");
    loadMine();
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ---------- ADMIN ----------
async function loadAdmin() {
  const tbody = document.querySelector("#table-admin tbody");
  const emptyMsg = document.getElementById("admin-empty");
  tbody.innerHTML = "";
  emptyMsg.classList.add("is-hidden");

  try {
    const res = await Api.getTodosAgendamentos();
    const lista = Array.isArray(res) ? res : [];

    if (lista.length === 0) {
      emptyMsg.classList.remove("is-hidden");
      return;
    }

    lista.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(item.cliente_nome)}</td>
        <td>${escapeHtml(item.cliente_email)}</td>
        <td>${escapeHtml(item.nome)}</td>
        <td>${escapeHtml(formatDate(item.data))}</td>
        <td>${escapeHtml(item.hora)}</td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ---------- INIT ----------
refreshAuthUI();