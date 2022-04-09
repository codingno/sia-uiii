import nextConnect from "next-connect";
import { isLogin, isPublic } from "../config/police";

const bcrypt = require("bcrypt");
const db = require("../../../models");
const UserSecret = db.user_secret;

export default nextConnect()
  .use(isPublic)
  .post(async (req, res) => {
    if (
      !req.body.new_password ||
      !req.body.confirm_password ||
      !req.body.old_password
    )
      res
        .status(400)
        .json({
          message:
            "Please input old password, new password, and confirm password",
        });
    if (req.body.new_password !== req.body.confirm_password)
      res
        .status(400)
        .json({ message: "New password and confirm password not matched" });
    else {
      try {
        const user_secret = UserSecret.findOne({
          where: { user_id: req.query.id },
        });
        if (!user_secret)
          return res.status(400).json({ message: "User id not valid" });
        const allowed = await bcrypt.compare(
          req.body.old_password,
          user_secret.pass
        );
        if (allowed) {
          const hashed = await bcrypt.hash(req.body.new_password, 10);
          const update_user_secret = UserSecret.update(
            { pass: hashed },
            { where: { reset_pass_token: req.query.token } }
          );
          if (update_user_secret) {
            res.status(200).json({ message: "Success reset password" });
          } else {
            res.status(400).json({ message: "Failed reset password" });
          }
        } else res.status(400).json({ message: "Your password not matched" });
      } catch (err) {
        console.log({ err });
        res.status(500).json({ message: "System error" });
      }
    }
  });
