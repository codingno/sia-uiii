// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";

const db = require("../../models");
const Departement = require("../../models/departement")(db.sequelize, DataTypes);
const Faculty = require("../../models/faculty")(db.sequelize, DataTypes);
Departement.belongsTo(Faculty, { foreignKey: "faculty_id", as: "faculty" });
Faculty.hasMany(Departement, { foreignKey: "faculty_id" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  .use(isLogin)
  .post(async (req, res) => {
    const body = req.body;
    if (!body.name || !body.faculty_id || !body.code)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await Departement.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      try {
        const data = await Departement.findOne({
          where: { id: req.query.id },
          include: { model: Faculty, as: "faculty" },
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data }).end();
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await Departement.findAll({
          include: {
            model: Faculty,
            as: "faculty",
          },
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
      const data = await Departement.update(body, {
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
      const data = await Departement.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
