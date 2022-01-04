// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";

const db = require("../../models");
const Course = require("../../models/course")(db.sequelize, DataTypes);
const CourseGorup = require("../../models/masterCourseGroups")(db.sequelize, DataTypes);
const CourseType = require("../../models/masterCourseType")(db.sequelize, DataTypes);
const Curriculum = require("../../models/curriculum")(
  db.sequelize,
  DataTypes
);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
Course.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(Course, { foreignKey: "departement_id" });
Course.belongsTo(Curriculum, {
  foreignKey: "curriculum_id",
  as: "curriculum",
});
Curriculum.hasMany(Course, { foreignKey: "curriculum_id" });
Course.belongsTo(CourseType, {
  foreignKey: "course_type_id",
  as: "course_type",
});
CourseType.hasMany(Course, { foreignKey: "course_type_id" });
Course.belongsTo(CourseGorup, {
  foreignKey: "course_group_id",
  as: "course_group",
});
CourseGorup.hasMany(Course, { foreignKey: "course_group_id" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.name)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Course.create(body);
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
        const data = await Course.findOne({
          where: condition,
          include: [
            { model: Curriculum, as: "curriculum" },
            { model: Departement, as: "departement" },
            { model: CourseGorup, as: "course_group" },
            { model: CourseType, as: "course_type" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data }).end();
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await Course.findAll({
          where: condition,
          include: [
            { model: Curriculum, as: "curriculum" },
            { model: Departement, as: "departement" },
            { model: CourseGorup, as: "course_group" },
            { model: CourseType, as: "course_type" },
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
    delete body.id;
    try {
      const data = await Course.update(body, {
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
      const data = await Course.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
