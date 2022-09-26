const { Sequelize, DataTypes } = require('sequelize');
const participant = require('../models/participant.model');
const interview = require('../models/interviews.model');

var sequelize = new Sequelize(
    "database",
    'scalar-admin',
    'root@admin',
    {
      storage: "./database/db.sqlite",
      dialect: "sqlite",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    }
  );

const dbConfig = {}

dbConfig.sequelize = sequelize;
dbConfig.participant = participant(sequelize , DataTypes);
dbConfig.interview = interview(sequelize , DataTypes);

const interview_participants = sequelize.define('interview_participants' , {} , {timestamps: false});

dbConfig.participant.belongsToMany(dbConfig.interview , {through: interview_participants});
dbConfig.interview.belongsToMany(dbConfig.participant , {through: interview_participants});
module.exports = dbConfig;
