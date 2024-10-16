var express = require('express');
var router = express.Router();
var pg = require('../db/db.js')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const getList = (await pg.query('SELECT id, nombre_categoria, descripcion FROM categorias WHERE id_user = $1', [req.session.user])).rows
    count = getList.length
    res.render('dashboard', { css: 'dashboard', loggedIn: true, categoriasGrid: true, categorias: getList, totalCount: count });
  } catch (error) {
    console.log(error);
  }
});

router.get('/all', async function (req, res, next) {
  try {
    const getList = (await pg.query('SELECT id, nombre_categoria, descripcion FROM categorias')).rows
    res.json({ categorias: getList });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    (await pg.query(`INSERT INTO categorias (nombre_categoria, descripcion, created_at, updated_at, id_user) VALUES ($1, $2, now(), now(), $3) RETURNING id;`,
    [req.body.nombre_categoria, req.body.descripcion, req.session.user]))
    res.json()
  } catch (error) {
    console.log(error);
  }
})

router.get('/id', async function (req, res, next) {
  try {
    const lista = (await pg.query('SELECT id, nombre_categoria, descripcion FROM categorias WHERE id = $1', [Number(req.query.id)])).rows;
    res.json(lista[0])
  } catch (error) {
    console.log(error);
  }
})

router.put('/id', async function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  
  try {
    let actualizar = (await pg.query(`UPDATE categorias SET nombre_categoria= $1, descripcion = $2, created_at= now(), updated_at= now() WHERE id = $3;`, [String(req.body.nombre_categoria), String(req.body.descripcion), Number(req.query.id)])).rows
    console.log(actualizar);
    res.send()
  } catch (error) {
    console.log(error);
  }
})

router.delete('/id', async function (req, res, next) {
  try {
    let del = (await pg.query(`DELETE FROM categorias WHERE id = $1;`, [Number(req.query.id)])).rows
    res.json(del)
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
