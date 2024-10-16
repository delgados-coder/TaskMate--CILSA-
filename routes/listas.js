var express = require('express');
var router = express.Router();
var pg = require('../db/db.js')

router.get('/', async function (req, res, next) {
  try {
    const getList = (await pg.query('SELECT id, nombre_lista, descripcion FROM lista_de_tareas WHERE id_user = $1', [req.session.user])).rows
    count = getList.length
    res.render('dashboard', { css: 'dashboard', loggedIn: true, listasGrid: true, listas: getList, totalCount: count });
  } catch (error) {
    console.log(error);
  }
});

router.get('/all', async function (req, res, next) {
  try {
    const getList = (await pg.query('SELECT id, nombre_lista, descripcion FROM lista_de_tareas')).rows
    res.json({ listas: getList });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    (await pg.query(`INSERT INTO lista_de_tareas (nombre_lista, descripcion, created_at, updated_at, id_user) VALUES ($1,$2, now(), now(), $3) RETURNING id;`,
      [req.body.nombre_lista, req.body.descripcion, req.session.user]))
    res.json()
  } catch (error) {
    console.log(error);
  }
})

router.get('/id', async function (req, res, next) {
  console.log(req.query);
  try {
    const lista = (await pg.query('SELECT id, nombre_lista, descripcion FROM lista_de_tareas WHERE id = $1', [Number(req.query.id)])).rows;
    res.json(lista[0])
  } catch (error) {
    console.log(error);
  }
})

router.put('/id', async function (req, res, next) {
  console.log(req.query);

  try {
    let actualizar = (await pg.query(`UPDATE lista_de_tareas SET nombre_lista= $1, descripcion = $2, created_at= now(), updated_at= now() WHERE id = $3;
      `, [String(req.body.nombre_lista), String(req.body.descripcion), Number(req.query.id)])).rows
    console.log(actualizar);
    res.send()
  } catch (error) {
    console.log(error);
  }
})

router.delete('/id', async function (req, res, next) {
  try {
    let del = (await pg.query(`DELETE FROM lista_de_tareas WHERE id = $1;`, [Number(req.query.id)])).rows
    res.json(del)
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
