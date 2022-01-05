// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";

const db = require("../../models");
const AcademicSchedule = require("../../models/academic_schedule")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(db.sequelize, DataTypes);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
const Course = require("../../models/course")(db.sequelize, DataTypes);
const Day = require("../../models/day")(
  db.sequelize,
  DataTypes
);
const Room = require("../../models/room")(
  db.sequelize,
  DataTypes
);
const Teacher = require("../../models/teacher")(
  db.sequelize,
  DataTypes
);
const UserInfo = require("../../models/userinfo")(
  db.sequelize,
  DataTypes
);
AcademicSchedule.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(AcademicSchedule, { foreignKey: "departement_id" });
Departement.belongsTo(Faculty, {
  foreignKey: "faculty_id",
  as: "faculty",
});
AcademicSchedule.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});
Course.hasMany(AcademicSchedule, { foreignKey: "course_id" });
AcademicSchedule.belongsTo(Day, {
  foreignKey: "day_id",
  as: "day",
});
Day.hasMany(AcademicSchedule, { foreignKey: "day_id" });
AcademicSchedule.belongsTo(Room, {
  foreignKey: "room_id",
  as: "room",
});
Room.hasMany(AcademicSchedule, { foreignKey: "room_id" });
AcademicSchedule.belongsTo(Teacher, {
  foreignKey: "teacher_id",
  as: "teacher",
});
Teacher.hasMany(AcademicSchedule, { foreignKey: "teacher_id" });
Teacher.hasOne(UserInfo, { foreignKey: "user_id", sourceKey:'user_id' });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.course_id || !body.departement_id || !body.teacher_id || !body.semester || !body.academic_year_id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await AcademicSchedule.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    let condition = {}
    if(!req.user.isAdmin && req.user.departement_id)
      condition.departement_id = req.user.departement_id
    if (req.query.id) {
      condition.id = req.query.id
      try {
        const data = await AcademicSchedule.findOne({
          where: condition,
          include: [
            { model: Course, as: "course" },
            { model: Departement, as: "departement" },
            { model: Room, as: "room" },
            { model: Teacher, as: "teacher",
							include: [
            		{ model: UserInfo, as: "user_info" },
							],
						},
            { model: Day, as: "day" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const preparedData = await AcademicSchedule.findAll({
          where: condition,
          include: [
            { model: Course, as: "course" },
            { model: Departement, as: "departement" },
            { model: Room, as: "room" },
            { model: Teacher, as: "teacher",
							include: [
            		{ model: UserInfo, as: "user_info" },
							],
						},
            { model: Day, as: "day" },
          ],
        });
        if (preparedData.length == 0)
          return res.status(404).json({ error: "Data not found", data });
				let data = JSON.parse(JSON.stringify(preparedData))
				data.map(item => {
					item.name = item.course.name
					item.credits = item.course.credits
					item.teacher_name = item.teacher.user_info.first_name + ' ' + item.teacher.user_info.middle_name + ' ' + item.teacher.user_info.last_name
					item.day_name = item.day.name
					item.room_name = item.room.name
				}) 
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
    delete body.id;
    try {
      const data = await AcademicSchedule.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await AcademicSchedule.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
