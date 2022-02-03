const { DataTypes, UUIDV4, TEXT } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {//title
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {//resumen del plato
      type: TEXT,
      allowNull: false,
    },
    score: {//puntuacion
      type:DataTypes.INTEGER,
    },
    healthScore: {//nivel de comida saludable
      type:DataTypes.INTEGER,
    },
    steps: {//paso a paso
      type:DataTypes.TEXT,
    },
    image: {
      type:DataTypes.STRING,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }

  });
};
