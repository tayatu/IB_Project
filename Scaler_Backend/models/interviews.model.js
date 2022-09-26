module.exports = (sequelize , DataTypes) => {
    const interview = sequelize.define('Interview' , {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_time: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        end_time: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    } , {timestamps: false});
    
    return interview;
};