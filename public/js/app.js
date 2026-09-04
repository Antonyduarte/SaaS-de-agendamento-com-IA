const $ = (selector, scope = document) => scope.querySelector(selector)
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]

const state = {
  token: localStorage.getItem("agendaFlowToken"),
  resetEmail: "",
  editing: null
}

const authView = $("#auth-view")
const dashboardView = $("#dashboard-view")
const modal = $("#appointment-modal")
const appointmentForm = $("#appointment-form")
const toast = $("#toast")

function message(text, error = false) {
  toast.textContent = text
  toast.className = `toast show${error ? " error" : ""}`
  clearTimeout(message.timeout)
  message.timeout = setTimeout(() => toast.classList.remove("show"), 4200)
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function getCurrentUser() {
  try {
    const payload = state.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(decodeURIComponent(atob(payload).split("").map(char => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`).join("")))
  } catch {
    return null
  }
}

function validateEmailBeforeSubmit(form) {
  const emailInput = $("[name=email]", form)
  if (emailIsValid(emailInput.value)) return true

  emailInput.focus()
  message("Formato de e-mail inválido", true)
  return false
}

async function request(url, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) }
  if (state.token) headers.Authorization = `Bearer ${state.token}`
  const response = await fetch(url, { ...options, headers })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || "Não foi possível concluir a operação.")
  return data
}

function setAuthForm(formName) {
  $$(".form", authView).forEach(form => form.classList.add("hidden"))
  $(`#${formName}-form`).classList.remove("hidden")
  $$(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.auth === formName))
  const content = {
    login: ["Entre na sua conta", "Acesse sua agenda e acompanhe seus horários."],
    register: ["Crie sua conta", "Comece a organizar sua rotina em poucos segundos."],
    forgot: ["Recupere seu acesso", "Informe o e-mail usado no cadastro para receber um código."],
    reset: ["Crie uma nova senha", "Digite o código enviado para o seu e-mail."]
  }[formName]
  $("#auth-title").textContent = content[0]
  $("#auth-subtitle").textContent = content[1]
}

function showDashboard() {
  authView.classList.add("hidden")
  dashboardView.classList.remove("hidden")
  $("#admin-button").classList.toggle("hidden", getCurrentUser()?.role !== "admin")
  $("#today-label").textContent = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(new Date())
  loadAppointments()
}

function showAuth() {
  dashboardView.classList.add("hidden")
  authView.classList.remove("hidden")
  setAuthForm("login")
}

function toISODate(value) {
  if (/^\d{4}-\d{2}-\d{2}/.test(String(value))) return String(value).slice(0, 10)
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10)
}

function formatAppointmentDate(value) {
  const date = new Date(`${toISODate(value)}T12:00:00`)
  return { day: String(date.getDate()).padStart(2, "0"), month: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date).replace(".", "") }
}

function formatTime(value) { return String(value || "").slice(0, 5) }

async function loadAppointments() {
  const list = $("#appointments-list")
  list.innerHTML = '<div class="empty-state"><span>◌</span>Carregando seus horários...</div>'
  try {
    const data = await request("/agendamento")
    const appointments = Array.isArray(data) ? data : []
    $("#appointments-count").textContent = appointments.length ? `${appointments.length} ${appointments.length === 1 ? "horário marcado" : "horários marcados"}` : "Nenhum horário marcado"
    if (!appointments.length) {
      list.innerHTML = '<div class="empty-state"><span>☼</span><strong>Sua agenda está livre.</strong><br>Adicione seu primeiro agendamento.</div>'
      return
    }
    appointments.sort((a, b) => `${a.data}${a.hora}`.localeCompare(`${b.data}${b.hora}`))
    list.innerHTML = appointments.map(item => {
      const date = formatAppointmentDate(item.data)
      return `<article class="appointment"><div class="appointment-date"><b>${date.day}</b><span>${date.month}</span></div><div><h3>${escapeHtml(item.nome)}</h3><p>${formatTime(item.hora)} · ${new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(new Date(`${toISODate(item.data)}T12:00:00`))}</p></div><div class="appointment-actions"><button title="Editar" data-edit='${encodeURIComponent(JSON.stringify(item))}'>✎</button><button title="Excluir" data-delete="${item.id}">⌫</button></div></article>`
    }).join("")
  } catch (error) {
    if (/token|expirado/i.test(error.message)) logout(true)
    else { list.innerHTML = '<div class="empty-state"><span>!</span>Não foi possível carregar a agenda.</div>'; message(error.message, true) }
  }
}

function escapeHtml(value) { const element = document.createElement("div"); element.textContent = value; return element.innerHTML }

async function loadSlots(date, selected = "") {
  const select = appointmentForm.hora
  select.innerHTML = '<option value="">Carregando...</option>'
  if (!date) { select.innerHTML = '<option value="">Escolha uma data</option>'; return }
  try {
    const data = await request(`/agendamento/disponiveis?data=${date}`)
    const slots = data.rows || []
    const values = slots.map(slot => typeof slot === "string" ? slot : slot.horario)
    if (selected && !values.includes(selected)) values.unshift(selected)
    select.innerHTML = `<option value="">Escolha</option>${values.map(time => `<option value="${time}" ${time === selected ? "selected" : ""}>${time}</option>`).join("")}`
    $("#slot-help").textContent = values.length ? "Os horários exibidos estão disponíveis." : "Não há horários disponíveis nessa data."
  } catch (error) {
    select.innerHTML = '<option value="">Indisponível</option>'
    $("#slot-help").textContent = "Não foi possível buscar os horários agora."
  }
}

function openAppointment(item = null) {
  state.editing = item
  appointmentForm.reset()
  $("[name=id]", appointmentForm).value = item?.id || ""
  appointmentForm.nome.value = item?.nome || ""
  appointmentForm.data.value = item ? toISODate(item.data) : new Date().toISOString().slice(0, 10)
  appointmentForm.data.min = new Date().toISOString().slice(0, 10)
  $("#modal-eyebrow").textContent = item ? "EDITAR HORÁRIO" : "NOVO HORÁRIO"
  $("#modal-title").textContent = item ? "Editar agendamento" : "Adicionar agendamento"
  loadSlots(appointmentForm.data.value, item ? formatTime(item.hora) : "")
  modal.showModal()
}

function logout(silent = false) {
  localStorage.removeItem("agendaFlowToken")
  state.token = null
  showAuth()
  if (!silent) message("Você saiu da sua conta.")
}

$$('.tab').forEach(tab => tab.addEventListener("click", () => setAuthForm(tab.dataset.auth)))
$$('[data-view]').forEach(button => button.addEventListener("click", () => setAuthForm(button.dataset.view)))
$$('.toggle-password').forEach(button => button.addEventListener("click", () => {
  const input = $("input", button.parentElement)
  input.type = input.type === "password" ? "text" : "password"
  button.textContent = input.type === "password" ? "◉" : "◌"
}))

$("#login-form").addEventListener("submit", async event => {
  event.preventDefault()
  if (!validateEmailBeforeSubmit(event.currentTarget)) return
  const form = new FormData(event.currentTarget)
  try {
    const data = await request("/auth/login", { method: "POST", body: JSON.stringify({ email: form.get("email"), senha: form.get("senha") }) })
    state.token = data.rows
    localStorage.setItem("agendaFlowToken", state.token)
    showDashboard()
    message("Login realizado. Que bom ter você de volta!")
  } catch (error) { message(error.message, true) }
})

$("#register-form").addEventListener("submit", async event => {
  event.preventDefault()
  if (!validateEmailBeforeSubmit(event.currentTarget)) return
  const form = new FormData(event.currentTarget)
  try {
    await request("/auth/register", { method: "POST", body: JSON.stringify(Object.fromEntries(form)) })
    message("Conta criada! Agora entre com seus dados.")
    $("#login-form [name=email]").value = form.get("email")
    setAuthForm("login")
  } catch (error) { message(error.message, true) }
})

$("#forgot-form").addEventListener("submit", async event => {
  event.preventDefault()
  if (!validateEmailBeforeSubmit(event.currentTarget)) return
  const email = new FormData(event.currentTarget).get("email")
  try {
    const data = await request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) })
    state.resetEmail = email
    $("#reset-form [name=code]").focus()
    setAuthForm("reset")
    message(data.message || "Código enviado. Verifique seu e-mail.")
  } catch (error) { message(error.message, true) }
})

$("#reset-form").addEventListener("submit", async event => {
  event.preventDefault()
  const form = new FormData(event.currentTarget)
  try {
    await request("/auth/reset-password", { method: "PUT", body: JSON.stringify({ email: state.resetEmail, code: form.get("code"), password: form.get("password") }) })
    message("Senha alterada com sucesso. Entre com a nova senha.")
    setAuthForm("login")
  } catch (error) { message(error.message, true) }
})

$("#new-appointment-button").addEventListener("click", () => openAppointment())
$("#refresh-button").addEventListener("click", loadAppointments)
$("#logout-button").addEventListener("click", () => logout())
$(".close-modal").addEventListener("click", () => modal.close())
appointmentForm.data.addEventListener("change", () => loadSlots(appointmentForm.data.value))

appointmentForm.addEventListener("submit", async event => {
  event.preventDefault()
  const form = new FormData(appointmentForm)
  const id = form.get("id")
  const payload = { nome: form.get("nome"), data: form.get("data"), hora: form.get("hora") }
  try {
    if (id) await request("/agendamento", { method: "PUT", body: JSON.stringify({ id, data: payload.data, hora: payload.hora }) })
    else await request("/agendamento", { method: "POST", body: JSON.stringify(payload) })
    modal.close(); message(id ? "Agendamento atualizado." : "Agendamento criado com sucesso."); loadAppointments()
  } catch (error) { message(error.message, true) }
})

$("#appointments-list").addEventListener("click", async event => {
  const edit = event.target.closest("[data-edit]")
  const remove = event.target.closest("[data-delete]")
  if (edit) return openAppointment(JSON.parse(decodeURIComponent(edit.dataset.edit)))
  if (remove && confirm("Deseja excluir este agendamento?")) {
    try { await request(`/agendamento/${remove.dataset.delete}`, { method: "DELETE" }); message("Agendamento excluído."); loadAppointments() }
    catch (error) { message(error.message, true) }
  }
})

if (state.token) showDashboard()