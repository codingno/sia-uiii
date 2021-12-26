import { UUIDV4, DataTypes } from "sequelize";
import { v4 as uuidv4, parse as uuidParse } from "uuid";
const db = require("../models");
const User = require("../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../models/userinfo")(db.sequelize, DataTypes);
const UserSecret = require("../models/usersecret")(db.sequelize, DataTypes);

export default UserService = {
  create: async function (data, callback) {
    const data_user = {
      id: uuidv4(),
      name:
        data.first_name + data.middle_name
          ? " " + data.middle_name
          : "" + data.last_name
          ? " " + data.last_name
          : "",
      email: data.email || null,
      email_verified: new Date(data.email_verified) || null,
      image: image || null,
    };
    try {
      const user = await User.create(data_user);
      const data_user_info = {
        user_id: user.id,
        first_name: data.first_name || null,
        middle_name: data.middle_name || null,
        last_name: data.last_name | null,
        place_of_birth: data.place_of_birth,
        date_of_birth: new Date(data.date_of_birth),
        gender: data.gender || null,
        identity_id: data.identity_id || null,
        identity_type_id: data.identity_type_id || null,
      };
      const user_info = await UserInfo.create(data_user_info);
      const hashed = data.pass ? await bcrypt.hash(data.pass, 10) : null;
      const data_user_secret = {
        user_id: user.id,
        pass: hashed,
        username: data.username || null,
        email: data.email,
        email_token: data.email_token || null,
        email_token_expired: data.email_token_expired || null,
        reset_pass_token: data.reset_pass_token || null,
        reset_pass_expired: new Date(data.reset_pass_expired) || null,
      };
      const user_secret = await UserSecret.create(data_user_secret);
      callback(null, user.id);
    } catch (error) {
      callback(error);
    }
  },
  update: async function (data, callback) {
    const user_id = data.user.id
    const data_user = data.user
    delete data_user.id
    try {
      const user = await User.update(data_user, {where: {id: user_id}});
      const data_user_info = data.user_info
      delete data_user_info.id
      delete data_user_info.user_id
      const user_info = await UserInfo.update(data_user_info);
      callback(null, user_id);
    } catch (error) {
      callback(error);
    }
  },
};
