const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize , DataTypes) => {
    const participant = sequelize.define('Participant' , {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } , {timestamps: false});
    return participant;
};
