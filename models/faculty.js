'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class Faculty extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Faculty.init({
  const Faculty = sequelize.define('faculty',{
    college_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    accreditation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'faculty',
  });
  return Faculty;
};