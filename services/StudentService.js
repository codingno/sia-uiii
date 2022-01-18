import { UUIDV4, DataTypes } from "sequelize";
import { isLogin, isStudent } from "./config/police";

const db = require("../../models");
const Student = require("../../models/student")(db.sequelize, DataTypes);
const Teacher = require("../../models/teacher")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
const MasterStudyType = require("../../models/masterStudyType")(
  db.sequelize,
  DataTypes
);
const MasterStudentStatus = require("../../models/masterStudentStatus")(
  db.sequelize,
  DataTypes
);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
Student.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
Student.hasOne(FinancialType, { foreignKey: "financial_type_id", as: "program" });
Teacher.hasMany(Student, { foreignKey: "teacher_id" });
Student.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(Student, { foreignKey: "departement_id" });
Departement.belongsTo(MasterStudyType, {
  foreignKey: "study_type_id",
  as: "study_type",
});
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Student.belongsTo(MasterStudentStatus, {
  foreignKey: "status",
  as: "student_status",
});
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Student, { foreignKey: "user_id" });

async function generateStudentNumber (user_id, callback){
    const student = await Student.findOne({
        where:{user_id: user_id},
        include: [{

        }],
    })
    if(student){
        if(!student.student_number)
            callback(student.student_number)
    }
}