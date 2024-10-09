'use strict'

const ListaDeTareas = use('App/Models/ListaDeTarea')

class ListaDeTareaController {
  async index ({ response }) {
    const listas = await ListaDeTareas.all()
    return response.json(listas)
  }

  async store ({ request, response }) {
    const data = request.only(['nombre_lista', 'descripcion'])
    const lista = await ListaDeTareas.create(data)
    return response.status(201).json(lista)
  }

  async show ({ params, response }) {
    try {
      const lista = await ListaDeTareas.findOrFail(params.id)
      return response.json(lista)
    } catch (error) {
      return response.status(404).json({ message: 'Lista no encontrada' })
    }
  }

  async update ({ params, request, response }) {
    try {
      const lista = await ListaDeTareas.findOrFail(params.id)
      const data = request.only(['nombre_lista', 'descripcion'])
      lista.merge(data)
      await lista.save()
      return response.json(lista)
    } catch (error) {
      return response.status(404).json({ message: 'Lista no encontrada' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const lista = await ListaDeTareas.findOrFail(params.id)
      await lista.delete()
      return response.status(200).json({ message: 'Lista eliminada correctamente' })
    } catch (error) {
      return response.status(404).json({ message: 'Lista no encontrada' })
    }
  }
}

module.exports = ListaDeTareaController
