

const express = require('express');
const passport = require('passport');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const bodyParser = require('body-parser');

const models = require('./models')
const homeRoute = require('./routes/home')
const homeController = require('./controllers/home');

var app = express(); //instance of express

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars'); //sets 'handlebars' as view engine

const port = process.env.PORT || 8080;

require('./services/passport')
app.use(bodyParser.json()); //parse in JSON format
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', homeRoute)

app.use(function(req, res, next) {
  res.status(404).send('This is not the page you are looking for.')
})

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("server started")
  })
})