'use strict'

const Tarea = use('App/Models/Tarea')

class TareaController {
  async index ({ response }) {
    const tareas = await Tarea.query()
      .with('categoria')  
      .with('lista')      
      .fetch()

    return response.json(tareas)
  }

  async store ({ request, response }) {
    const data = request.only(['titulo', 'descripcion', 'estado', 'id_categoria', 'id_lista'])
    const tarea = await Tarea.create(data)
    return response.status(201).json(tarea)
  }

  async show ({ params, response }) {
    try {
      const tarea = await Tarea.query()
        .with('categoria')  
        .with('lista')      
        .where('id', params.id)
        .firstOrFail()      

      return response.json(tarea)
    } catch (error) {
      return response.status(404).json({ message: 'Tarea no encontrada' })
    }
  }

  async update ({ params, request, response }) {
    try {
      const tarea = await Tarea.findOrFail(params.id)
      const data = request.only(['titulo', 'descripcion', 'estado', 'id_categoria', 'id_lista'])
      tarea.merge(data)
      await tarea.save()
      return response.json(tarea)
    } catch (error) {
      return response.status(404).json({ message: 'Tarea no encontrada' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const tarea = await Tarea.findOrFail(params.id)
      await tarea.delete()
      return response.status(200).json({ message: 'Tarea eliminada correctamente' })
    } catch (error) {
      return response.status(404).json({ message: 'Tarea no encontrada' })
    }
  }
}

module.exports = TareaController
