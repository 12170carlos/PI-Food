const { DataTypes, UUIDV4, TEXT} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Diet', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },{timestamps:false})
}