// This is an example of how to read a JSON Web Token from an API route
import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect"; 

const db = require("../../models");
const MasterStudentStatus = require("../../models/masterStudentStatus")(
  db.sequelize,
  DataTypes
);

// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
    .post((req, res) => {
      const body = req.body;
      if (!body.name || !body.description)
        return res.status(400).json({ message: "Incomplete parameters" });
      MasterStudentStatus.create(body)
        .then((data) => {
          return res.status(200).json({ data });
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })
    .get((req, res) => {
      if (req.query.id) {
        MasterStudentStatus.findOne({
          where: { id: req.query.id },
        })
          .then((data) => {
            if (!data)
              return res.status(404).json({ error: "Data not found" });
            return res.status(200).json({ data }).end();
          })
          .catch((error) => {
            return res.status(500).json({ error });
          });
      } else {
        MasterStudentStatus.findAll()
          .then((data) => {
            if (data.length == 0) return res.status(404).json({ error: "Data not found", data });
            return res.status(200).json({ data });
          })
          .catch((error) => {
            return res.status(500).json({ error });
          });
      }
    })
    .patch((req, res) => {
      const body = req.body;
      const id = body.id;
      if (!id)
        return res.status(400).json({ error: "Incomplete parameters" });
      delete body.id;
      MasterStudentStatus.update(body, {
        where: { id: id },
      })
        .then((data) => {
          return res
            .status(200)
            .json({ message: "success update class type" });
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })
    .delete((req, res) => {
      const body = req.body;
      if (!body.id)
        return res.status(400).json({ message: "Incomplete parameters" });
      MasterCourseGroup.delete({
        where: { id: body.id },
      })
        .then((data) => {
          return res.status(200).json({ message: 'success delete data' });
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })