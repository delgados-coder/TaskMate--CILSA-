'use strict'

const Route = use('Route')

//----------------------------------------------------//
Route.get('/', 'homeController.index'); 
//----------------------------------------------------//
Route.get('/register', 'registerController.index'); 
Route.post('/register', 'registerController.register'); 
//----------------------------------------------------//
Route.get('/login', 'loginController.index'); 
Route.post('/login', 'loginController.login');
//----------------------------------------------------//
Route.get('/dashboard/', 'dashboardController.index');
Route.get('/dashboard/tareas', 'tareasController.index');
Route.get('/dashboard/categorias', 'categoriasController.index');
Route.get('/dashboard/listas', 'listasController.index');
