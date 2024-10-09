'use strict'

class dashboardController {

  async index({ response }) {
    response.redirect('./tareas')
    }
  }

module.exports = dashboardController;
