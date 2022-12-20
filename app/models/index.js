const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    operatorsAliases : false,

    pool : {
        max: dbConfig.pool.max,	
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle      
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.member = require('./member.model.js')(sequelize, Sequelize);
db.board = require('./board.model.js')(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
  });

module.exports = db;
