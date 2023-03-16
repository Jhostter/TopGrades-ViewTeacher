const express = require("express")
const {engine} = require("express-handlebars")
const myconnection = require("express-myconnection")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const studentsRoutes = require('./routes/students');
const teachersRoutes = require('./routes/grades');
const app = express()

const PORT = process.env.PORT || 7000;

app.listen(PORT, ()=>{
    console.log("Se esta Escuchando en el puerto", PORT)
})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set("views", __dirname + "/views")

app.engine(".hbs", engine({
    extname: '.hbs'
}))

app.set("view engine", "hbs")

app.use(myconnection(mysql, {
    connectionLimit: 100,
    host: 'db4free.net',
    user: 'timberlake',
    password: '123654hola',
    port: 3306,
    database: 'appgrade'
})) 

app.use('/', studentsRoutes);
app.use('/', teachersRoutes);

app.get("/", (req, res)=>{
    res.redirect('/students')
})

console.clear()