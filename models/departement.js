'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class Departement extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // Departement.init({
  const Departement = sequelize.define('departement',{
    faculty_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    label: DataTypes.STRING,
    study_type_id: DataTypes.INTEGER,
		status: {
			type: DataTypes.ENUM,
        values: [
          'ACTIVE',
          'NON ACTIVE',
        ],
        defaultValue: 'ACTIVE',
		},
    course_credits: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'departement',
  });
  return Departement;
};