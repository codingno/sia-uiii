// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isPublic } from "./config/police";

const db = require("../../models");
const AcademicKrs = require("../../models/academic_krs")(db.sequelize, DataTypes);
const Student = require("../../models/student")(db.sequelize, DataTypes);
const AcademicSchedule = require("../../models/academic_schedule")(db.sequelize, DataTypes);
AcademicKrs.belongsTo(AcademicSchedule, {
  foreignKey: "schedule_id",
  as: "schedule",
});
AcademicSchedule.hasMany(AcademicKrs, { foreignKey: "schedule_id" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.name)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      body.student_number = req.user.student_number
      const data = await AcademicKrs.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    let condition = {}
    if (req.query.id) {
      condition.id = req.query.id
      try {
        const data = await AcademicKrs.findOne({
          where: condition,
          include: [
            { model: AcademicSchedule, as: "schedule" },
          ],
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data }).end();
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await AcademicKrs.findAll({
          where: condition,
          include: [
            { model: AcademicSchedule, as: "schedule" },
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
      const data = await AcademicKrs.update(body, {
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
      const data = await AcademicKrs.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
