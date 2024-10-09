'use strict'

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const axios = require('axios');

class CategoriasController {
  async index({ response }) {
    try {
      const categorias = await this.fetch('http://127.0.0.1:3333/api/v2/categorias');
      const totalCount = categorias.length;

      const rutaArchivo = path.join(__dirname, '../../../resources/views/entidades/categorias/index.hbs');
      const plantillaCargada = fs.readFileSync(rutaArchivo, 'utf-8');
      const plantillaCompilada = Handlebars.compile(plantillaCargada);
      const html = plantillaCompilada({ categorias, totalCount });

      response.send(html);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      response.status(500).send("Error al cargar las categorías.");
    }
  }

  async fetch(url) {
    const response = await axios.get(url);
    return response.data;
  }
}

module.exports = CategoriasController;
