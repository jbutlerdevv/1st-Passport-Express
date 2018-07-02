const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const Sequelize = require('sequelize');
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./test.sqlite"
})

const db = {};

fs.readdirSync(__dirname)
.filter(file => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === '.js'
  )
}).forEach(file => {
  //Look up .import in sequelize docs
  var model = sequelize.import(path.join(__dirname, file))
  db[model.name] = model
});

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;