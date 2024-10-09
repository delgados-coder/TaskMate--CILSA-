'use strict'

const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

class registerController {

  async index({ response }) {
    const rutaArchivo = path.join(__dirname, '../../../resources/views/register/index.hbs')
    const plantillaCargada = fs.readFileSync(rutaArchivo, 'utf-8')
    const plantillaCompilada = Handlebars.compile(plantillaCargada)
    const html = plantillaCompilada()
    response.send(html)
  }
}

module.exports = registerController