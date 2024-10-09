'use strict'

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const axios = require('axios');

class ListasController {
   /*------------------------------------------------------------------------------------------*/
  async index({ response }) {
    try {
      const listas = await this.fetch('http://127.0.0.1:3333/api/v2/listas');
      const totalCount = listas.length;
      const rutaArchivo = path.join(__dirname, '../../../resources/views/entidades/listas/index.hbs');
      const plantillaCargada = fs.readFileSync(rutaArchivo, 'utf-8');
      const plantillaCompilada = Handlebars.compile(plantillaCargada);
      const html = plantillaCompilada({ listas,totalCount });
      
      response.send(html);
    } catch (error) {
      console.error("Error al obtener las listas:", error);
      response.status(500).send("Error al cargar las listas.");
    }
  }
  /*------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------*/

  async fetch(url) {
      const response = await axios.get(url);
      return response.data; 
  }
}

module.exports = ListasController;
