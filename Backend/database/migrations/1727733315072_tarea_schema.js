
const Schema = use('Schema')

class TareaSchema extends Schema {
  up () {
    this.create('tareas', (table) => {
      table.increments('id')
      table.string('titulo')
      table.text('descripcion')
      table.boolean('estado').defaultTo(false) // Cambiado a booleano
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now()).nullable()
      table.integer('id_categoria').unsigned().references('id').inTable('categorias').onDelete('CASCADE')
      table.integer('id_lista').unsigned().references('id').inTable('lista_de_tareas').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('tareas')
  }
}

module.exports = TareaSchema