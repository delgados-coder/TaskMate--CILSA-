'use strict'

const Categoria = use('App/Models/Categoria')

class CategoriaController {
  async index ({ response }) {
    const categorias = await Categoria.all()
    return response.json(categorias)
  }

  async store ({ request, response }) {
    const data = request.only(['nombre_categoria', 'descripcion'])
    const categoria = await Categoria.create(data)
    return response.status(201).json(categoria)
  }

  async show ({ params, response }) {
    try {
      const categoria = await Categoria.findOrFail(params.id)
      return response.json(categoria)
    } catch (error) {
      return response.status(404).json({ message: 'Categoría no encontrada' })
    }
  }

  async update ({ params, request, response }) {
    try {
      const categoria = await Categoria.findOrFail(params.id)
      const data = request.only(['nombre_categoria', 'descripcion'])
      categoria.merge(data)
      await categoria.save()
      return response.json(categoria)
    } catch (error) {
      return response.status(404).json({ message: 'Categoría no encontrada' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const categoria = await Categoria.findOrFail(params.id)
      await categoria.delete()
      return response.status(200).json({ message: 'Categoría eliminada correctamente' })
    } catch (error) {
      return response.status(404).json({ message: 'Categoría no encontrada' })
    }
  }
}

module.exports = CategoriaController
