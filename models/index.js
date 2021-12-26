'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
console.log(`🚀 ~ file: index.js ~ line 7 ~ __filename`, __filename)
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelFolder = process.env.ROOT + '/models' 
console.log(`🚀 ~ file: index.js ~ line 20 ~ modelFolder`, modelFolder)
console.log(`🚀 ~ file: index.js ~ line 23 ~ __dirname`, __dirname)

// fs
//   .readdirSync(__dirname)
//   // .readdirSync(modelFolder)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     console.log({file});
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// 		const fileName = file.split('.')[0]
//     console.log(`🚀 ~ file: index.js ~ line 32 ~ fileName`, fileName)
//     // const model = require(path.resolve('./models', fileName))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
// 		console.log('create model ' + model.name);
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// sequelize.sync({ force: true })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
