const express = require("express")
const {engine} = require("express-handlebars")
const myconnection = require("express-myconnection")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const personsRoutes = require('./routes/persons');
const app = express()

app.set('port', 8000)

app.listen(app.get('port'), ()=>{
    console.log("Se esta Escuchando en el puerto", app.get('port'))
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
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'profesor'
}))

app.use('/', personsRoutes);

app.get("/", (req, res)=>{
    res.render('home')
})

console.clear()