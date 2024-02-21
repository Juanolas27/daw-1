var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

/* GET home page. */

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: "libros",
  password: 'david'
})

router.post("/anadir_usuario/:nombre/:apellido", async function(req, res, next) {
  await conexion.query(`insert into usuarios (nombre, apellido) values ("${req.params.nombre}", "${req.params.apellido}")`)
  res.json((await conexion.query("select * from usuarios"))[0])
})

router.delete("/borrar_usuario/:nombre/:apellido", async function(req, res, next) {
  await conexion.query(`delete from usuarios where nombre = "${req.params.nombre}" && apellido = "${req.params.apellido}"`)
  res.json((await conexion.query("select * from usuarios"))[0])

})
router.put("/actualizar_usuario/:nombre/:apellido", async function(req, res, next) {
  console.log(req.params)
  await conexion.execute(`update usuarios set nombre = "${req.params.nombre}" where apellido = "${req.params.apellido}"`)
  
  res.json((await conexion.query("select * from usuarios"))[0])
})
router.get("/obtener_usuario", async function(req, res, next) {
  res.json((await conexion.query("select * from usuarios"))[0])
})


module.exports = router;
