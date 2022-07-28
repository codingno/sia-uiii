import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent, isAdmin } from "./config/police";

const db = require("../../models");
const TeacherFeature = require("../../models/masterTeacherFeature")(
  db.sequelize,
  DataTypes
);

export default nextConnect()
  .use(isLogin)
  .post(isAdmin, async (req, res) => {
    let body = req.body;
    console.log(body);
    if (!body.aspects_id || !body.features)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      body.user_id = req.user.id;
      const data = await TeacherFeature.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.aspects_id) {
      try {
        const data = await TeacherFeature.findAll({
          where: { aspects_id: req.query.aspects_id },
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await TeacherFeature.findAll();
        if (data.length == 0)
          return res.status(404).json({ error: "Data not found", data });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  })
  .patch(isAdmin, async (req, res) => {
    const body = req.body;
    const id = body.id;
    if (!id) return res.status(400).json({ error: "Incomplete parameters" });
    delete body.id;
    try {
      const data = await TeacherFeature.update(body, {
        where: { id: id },
      });
      return res.status(200).json({ message: "success update data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .delete(isAdmin, async (req, res) => {
    const body = req.body;
    if (!body.id)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      const data = await TeacherFeature.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
