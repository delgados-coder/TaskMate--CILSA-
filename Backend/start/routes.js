'use strict'

const Route = use('Route')

Route.get('/', async ({ response }) => {
    response.send('<h2>API V2 Todo List APP</h2>')
})
Route.resource('api/v2/tareas', 'TareaController').apiOnly()
Route.resource('api/v2/categorias', 'CategoriaController').apiOnly()
Route.resource('api/v2/listas', 'ListaDeTareaController').apiOnly()
