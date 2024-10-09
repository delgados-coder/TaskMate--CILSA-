'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {
    categoria () {
      return this.belongsTo('App/Models/Categoria', 'id_categoria', 'id')
    }
  
    lista () {
      return this.belongsTo('App/Models/ListaDeTarea', 'id_lista', 'id')
    }
  }
  
  module.exports = Tarea
