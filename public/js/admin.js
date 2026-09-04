const $ = selector => document.querySelector(selector)

const token = localStorage.getItem("agendaFlowToken")
const list = $("#admin-appointments-list")
const empty = $("#admin-empty")
const toast = $("#toast")
let appointments = []

function decodeToken(value) {
  try {
    const payload = value.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(decodeURIComponent(atob(payload).split("").map(char => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`).join("")))
  } catch { return null }
}

function notify(text, error = false) {
  toast.textContent = text
  toast.className = `toast show${error ? " error" : ""}`
  clearTimeout(notify.timeout)
  notify.timeout = setTimeout(() => toast.classList.remove("show"), 4200)
}

function logout() {
  localStorage.removeItem("agendaFlowToken")
  window.location.href = "/"
}

function escapeHtml(value) {
  const element = document.createElement("div")
  element.textContent = value || ""
  return element.innerHTML
}

function formatDate(value) {
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`)
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date).replace(".", "")
}

function formatTime(value) {
  return String(value || "").slice(0, 5)
}

function render() {
  const term = $("#search-input").value.trim().toLowerCase()
  const visible = appointments.filter(item => [item.nome, item.cliente_nome, item.cliente_email].some(value => String(value || "").toLowerCase().includes(term)))
  $("#admin-count").textContent = `${visible.length} ${visible.length === 1 ? "registro encontrado" : "registros encontrados"}`
  list.innerHTML = visible.map(item => `
    <tr>
      <td><strong>${formatDate(item.data)}</strong><small>${formatTime(item.hora)}</small></td>
      <td>${escapeHtml(item.nome)}</td>
      <td><span class="client-avatar">${escapeHtml((item.cliente_nome || "?").charAt(0).toUpperCase())}</span>${escapeHtml(item.cliente_nome)}</td>
      <td>${escapeHtml(item.cliente_email)}</td>
    </tr>
  `).join("")
  empty.classList.toggle("hidden", visible.length > 0)
  if (!visible.length) empty.innerHTML = `<span>⌕</span>${term ? "Nenhum resultado para esta busca." : "Ainda não há agendamentos."}`
}

async function loadAppointments() {
  list.innerHTML = '<tr><td colspan="4" class="table-loading">Carregando agenda geral...</td></tr>'
  empty.classList.add("hidden")
  try {
    const response = await fetch("/agendamento/admin", { headers: { Authorization: `Bearer ${token}` } })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.message || "Não foi possível carregar a agenda.")
    appointments = Array.isArray(data) ? data : []
    $("#total-appointments").textContent = appointments.length
    render()
  } catch (error) {
    list.innerHTML = ""
    empty.classList.remove("hidden")
    empty.innerHTML = `<span>!</span>${escapeHtml(error.message)}`
    notify(error.message, true)
    if (/token|acesso/i.test(error.message)) setTimeout(logout, 1600)
  }
}

const user = token && decodeToken(token)
if (!user || user.role !== "admin") {
  window.location.replace("/")
} else {
  loadAppointments()
}

$("#search-input").addEventListener("input", render)
$("#refresh-button").addEventListener("click", loadAppointments)
$("#logout-button").addEventListener("click", logout)
