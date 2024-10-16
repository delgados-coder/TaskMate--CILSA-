var express = require('express');
var router = express.Router();
var pg = require('../db/db.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home',{css:'home'})
})
router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

router.post('/', function (req, res, next) {
  res.json({ "welcome": "to the Express API", "routes": ["users", "tareas", "categorias", "listas"] })
})

router.post('/login', async function (req, res, next) {
  try {
    let user = (await pg.query(`select * from users where email = '${req.body.email}' and password = '${req.body.password}'`)).rows
    if (user.length == 1) {
      req.session.user = user[0].id
      return res.json({ loggedIn: true })
    }
    return res.status(404).json({ error: 404 })
  } catch (err) {
    console.log(err);
  }
})

router.post('/registro', async function (req, res, next) {
  const email_check = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const pass_check = /^(?=.*\d)[A-Za-z\d]{8,12}$/g;
  if (!email_check.test(req.body.email)) {
    return res.json({error: "el email no es valido"})
  }
  if (!pass_check.test(req.body.password)) {
    return res.json({error:"la contraseña debe tener entre 8 y 12 caracteres y al menos un numero"})
  }
  try {
    let a = (await pg.query(`INSERT INTO users (username, email, "password") values ($1,$2,$3) RETURNING id;`, [req.body.user, req.body.email, req.body.password ]))
    if (a != undefined) {
      req.session.user = a[0].id
      res.json({ created: 'user' })
    }else{
      res.json({ error: "problema de red, intente nuevamente" })

    }
  } catch (err) {
    console.log(err);
  }

})

module.exports = router;