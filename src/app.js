const express = require("express")
const {engine} = require("express-handlebars")
const myconnection = require("express-myconnection")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const personsRoutes = require('./routes/persons');
const app = express()

const PORT = process.env.PORT || 8000;

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
    host: 'db4free.net',
    user: 'testuser1234',
    password: '12345678',
    port: 3306,
    database: 'profesor'
})) 

app.use('/', personsRoutes);

app.get("/", (req, res)=>{
    res.render('persons/index')
})

console.clear()