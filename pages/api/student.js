// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import UserServices from "../../services/UserServices";
import { isLogin, isStudent } from "./config/police";

const db = require("../../models");
const Student = require("../../models/student")(db.sequelize, DataTypes);
const Teacher = require("../../models/teacher")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../../models/userinfo")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
const MasterStudyType = require("../../models/masterStudyType")(db.sequelize, DataTypes);
const MasterIdentityType = require("../../models/masterIdentityType")(db.sequelize, DataTypes);
const MasterStudentStatus = require("../../models/masterStudentStatus")(db.sequelize, DataTypes);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
Student.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
Teacher.hasMany(Student, { foreignKey: "teacher_id" });
Student.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(Student, { foreignKey: "departement_id" });
Departement.belongsTo(MasterStudyType, { foreignKey: "study_type_id", as: "study_type" });
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Student.belongsTo(MasterStudentStatus, { foreignKey: "status", as: "student_status" });
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Student, { foreignKey: "user_id" });
Student.belongsTo(UserInfo, { foreignKey: "user_id", as: "user_info", targetKey: 'user_id' });
UserInfo.hasMany(Student, { foreignKey: "user_id", sourceKey:'user_id' });
UserInfo.belongsTo(MasterIdentityType, { foreignKey: "identity_type_id", as: "identity_type" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
        try {
					const user_id = await UserServices.create(body)
          const data_student = {
            user_id: user_id,
            student_number: body.student_number,
            teacher_id: body.teacher_id,
            entry_year: body.entry_year,
            entry_semester: body.entry_semester,
            entry_status: body.entry_status,
            departement_id: body.departement_id,
            status: body.status 
          }
          const data = await Student.create(data_student);
          return res.status(200).json({ data });
        } catch (error) {
          return res.status(500).json({ error });
        }
  })
  .get(async (req, res) => {
		const options = req.query
    if (options.id || options.user_id) {
      try {
        const data = await Student.findOne({
          where: options,
          include: [
            { model: Teacher, as: "teacher" },
            { model: Departement, as: "departement",
							include: [
								{ model : Faculty, as: "faculty" },
								{ model : MasterStudyType, as: "study_type" },
							]
						},
            { model: User, as: "user" },
            { model: UserInfo, as: "user_info",
							include: [
								{ model : MasterIdentityType, as: "identity_type" },
							]
						},
						{ model : MasterStudentStatus, as: "student_status" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data }).end();
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await Student.findAll({
          include: [
            {
              model: Teacher,
              as: "teacher",
            },
            { model: Departement, as: "departement" },
            { model: User, as: "user" },
            { model: UserInfo, as: "user_info" },
          ],
        });
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  })
  .patch(async (req, res) => {
    const body = req.body;
    const id = body.id;
    if (!id) return res.status(400).json({ error: "Incomplete parameters" });
    // delete body.id;
    // UserServices.update(body, async function (err, data) {
    //   if(err) 
    //     res.status(500).json({err})
    //   else {
    //     try {
    //       const data = await Student.update(body, {
    //         where: { id: id },
    //       });
    //       return res.status(200).json({ message: "success update data" });
    //     } catch (error) {
    //       return res.status(500).json({ error });
    //     }
    //   }  
    // })
		try {
			await UserServices.update(body)
			const data = await Student.update(body, {
				where: { id: id },
			});
			return res.status(200).json({ message: "success update data" });
		} catch (error) {
      console.log(`🚀 ~ file: student.js ~ line 135 ~ .patch ~ error`, error)
			return res.status(500).json({ error });
		}
  })
  .delete(async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Student.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
