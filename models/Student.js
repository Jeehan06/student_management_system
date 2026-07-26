const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Student;