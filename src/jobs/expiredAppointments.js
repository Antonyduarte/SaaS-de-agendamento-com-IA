const service = require("../modules/agendamentos/agenda.service")

//Atualiza a cada minuto, os status dos agendamentos
async function expiredAppointmens() {
    setTimeout(async () => {
        await service.expireAppointments()
    }, 60000);
}

module.exports = { expiredAppointmens }