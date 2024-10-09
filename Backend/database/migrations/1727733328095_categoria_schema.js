'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaSchema extends Schema {
  up () {
    this.create('categorias', (table) => {
      table.increments('id')
      table.string('nombre_categoria')
      table.text('descripcion')
      table.timestamps(true, true);
    })
  }

  down () {
    this.drop('categorias')
  }
}

module.exports = CategoriaSchema
