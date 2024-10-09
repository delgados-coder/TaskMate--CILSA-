'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ListaDeTareas extends Model {
  tareas () {
    return this.hasMany('App/Models/Tarea', 'id', 'id_lista')
  }
}

module.exports = ListaDeTareas
