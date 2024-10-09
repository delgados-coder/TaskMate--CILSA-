'use strict'

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const axios = require('axios');

class TareasController {
  /*------------------------------------------------------------------------------------------*/
  async index({ response }) {
    try {
      const tareas = await this.fetch('http://127.0.0.1:3333/api/v2/tareas');

      let completeCount = 0;
      let pendingCount = 0;

      tareas.forEach(tarea => {
        if (tarea.estado) {
          completeCount++;
        } else {
          pendingCount++;
        }
      });

      const rutaArchivo = path.join(__dirname, '../../../resources/views/entidades/tareas/index.hbs');
      const plantillaCargada = fs.readFileSync(rutaArchivo, 'utf-8');
      const plantillaCompilada = Handlebars.compile(plantillaCargada);

      const html = plantillaCompilada({
        tareas,
        totalCount: tareas.length,
        completeCount: completeCount,
        pendingCount: pendingCount
      });

      response.send(html);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      response.status(500).send("Error al cargar las tareas.");
    }
  }
  /*------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------*/

  async fetch(url) {
    const response = await axios.get(url);
    return response.data; 
  }
}

module.exports = TareasController;