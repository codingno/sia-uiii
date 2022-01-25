import { UUIDV4, DataTypes } from "sequelize";
import nextConnect from "next-connect";
import { isLogin, isStudent } from "./config/police";

const db = require("../../models");
const Portfolio = require("../../models/dataPortfolio")(db.sequelize, DataTypes);
const PortfolioType = require("../../models/masterPortfolio")(db.sequelize, DataTypes);
const UserInfo = require("../../models/userinfo")(db.sequelize, DataTypes);
Portfolio.belongsTo(UserInfo, { foreignKey: "user_id", targetKey: "user_id", as: "user_info" });
// console.log(`🚀 ~ file: user.js ~ line 8 ~ db`, db.sequelize)

export default nextConnect()
  // .use(isLogin)
  .post(async (req, res) => {
    let body = req.body;
    if (!body.portfolio_id || !body.url)
      return res.status(400).json({ message: "Incomplete parameters" });
    try {
      body.user_id = req.user.id
      const data = await Portfolio.create(body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    if (req.query.id) {
      try {
        const data = await Portfolio.findOne({
          where: { id: req.query.id },
          include: { model: UserInfo, as: "user_info" },
        });
        if (!data) return res.status(404).json({ error: "Data not found" });
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const data = await Portfolio.findAll({
          include: {
            model: UserInfo,
            as: "user_info",
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
      const data = await Portfolio.update(body, {
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
      const data = await Portfolio.destroy({
        where: { id: body.id },
      });
      return res.status(200).json({ message: "success delete data" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
