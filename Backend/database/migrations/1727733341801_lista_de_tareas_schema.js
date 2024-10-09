'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListaDeTareasSchema extends Schema {
  up () {
    this.create('lista_de_tareas', (table) => {
      table.increments('id')
      table.string('nombre_lista')
      table.text('descripcion')
      table.timestamps(true, true);
    })
  }

  down () {
    this.drop('lista_de_tareas')
  }
}

module.exports = ListaDeTareasSchema
