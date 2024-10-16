var express = require('express');
var router = express.Router();
var pg = require('../db/db.js')

router.get('/', async function (req, res, next) {
  try {
    const getList = (await pg.query('SELECT id, titulo, descripcion, estado, created_at, updated_at, id_categoria, id_lista FROM tareas where id_user = $1;', [req.session.user])).rows
    count = getList.length
    
    res.render('dashboard', { css: 'dashboard', loggedIn: true, tareasGrid: true, tareas: getList, totalCount: count });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async function (req, res, next) {
  console.log(req.body);
  
  try {
    (await pg.query(`INSERT INTO tareas (titulo, descripcion, estado, created_at, updated_at, id_categoria, id_lista, id_user) VALUES($1, $2, $3, now(), now(), $4, $5, $6) RETURNING id;`, 
      [String(req.body.titulo), String(req.body.descripcion), false, Number(req.body.id_categoria), Number(req.body.id_lista), req.session.user ]))
    res.json()
  } catch (error) {
    console.log(error);
  }
})

router.get('/id', async function (req, res, next) {
  try {
    const lista = (await pg.query('SELECT t.titulo, t.descripcion, t.estado, t.created_at, t.updated_at, t.id_categoria, t.id_lista, categorias.nombre_categoria, lista_de_tareas.nombre_lista  FROM tareas t left join categorias on t.id_categoria = categorias.id left join lista_de_tareas on t.id_lista = lista_de_tareas.id WHERE t.id = $1', [Number(req.query.id)])).rows;
    res.json(lista)
  } catch (error) {
    console.log(error);
  }
})

router.put('/id', async function (req, res, next) {
  console.log(req.body);
  
  try {
    let actualizar = (await pg.query(`UPDATE tareas SET titulo= $1, descripcion= $2, created_at= now(), updated_at = now(), id_categoria= $3, id_lista= $4 WHERE id= $5;`,
      [String(req.body.titulo), String(req.body.descripcion), Number(req.body.id_categoria), Number(req.body.id_lista), Number(req.query.id) ])).rows
    console.log(actualizar);
    res.send()
  } catch (error) {
    console.log(error);
  }
})

router.put('/estado', async function (req, res, next) {
  console.log(req.body);
  
  try {
    let actualizar = (await pg.query(`UPDATE tareas SET estado = $1 WHERE id= $2;`,
      [Boolean(req.body.estado),Number(req.query.id) ])).rows
    console.log(actualizar);
    res.send()
  } catch (error) {
    console.log(error);
  }
})

router.delete('/id', async function (req, res, next) {
  try {
    let del = (await pg.query(`DELETE FROM tareas WHERE id = $1;`, [Number(req.query.id)])).rows
    res.json(del)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
