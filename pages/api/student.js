// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";

const db = require("../../models");
const Student = require("../../models/student")(db.sequelize, DataTypes);
const Teacher = require("../../models/teacher")(db.sequelize, DataTypes);
const User = require("../../models/user")(db.sequelize, DataTypes);
const Departement = require("../../models/departement")(
  db.sequelize,
  DataTypes
);
Student.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
Teacher.hasMany(Student, { foreignKey: "teacher_id" });
Student.belongsTo(Departement, {
  foreignKey: "departement_id",
  as: "departement",
});
Departement.hasMany(Student, { foreignKey: "departement_id" });
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Student, { foreignKey: "user_id" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .post(async (req, res) => {
    const body = req.body;
    if (!body.user_id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Student.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      try {
        const data = await Student.findOne({
          where: { id: req.query.id },
          include: [
            { model: Teacher, as: "teacher" },
            { model: Departement, as: "departement" },
            { model: User, as: "user" },
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
      const data = await Student.update(body, {
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
      const data = await Student.delete({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
