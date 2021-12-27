import { UUIDV4, DataTypes } from "sequelize";
import { v4 as uuidv4, parse as uuidParse } from "uuid";
const db = require("../models");
const User = require("../models/user")(db.sequelize, DataTypes);
const UserInfo = require("../models/userinfo")(db.sequelize, DataTypes);
const UserSecret = require("../models/usersecret")(db.sequelize, DataTypes);

import bcrypt from 'bcrypt'

export default {
  create: async function (data) {
    return new Promise(async (resolve, reject) => {
      const data_user = {
        id: uuidv4(),
        name:
          data.first_name +
          (data.middle_name ? " " + data.middle_name : "") +
          (data.last_name ? " " + data.last_name : ""),
        email: data.email || null,
        email_verified: new Date(),
        image: data.image || null,
      };
      try {
        const user = await User.create(data_user);
        console.log(`🚀 ~ file: UserServices.js ~ line 24 ~ user`, user);
        const data_user_info = {
          user_id: user.id,
          first_name: data.first_name || null,
          middle_name: data.middle_name || null,
          last_name: data.last_name | null,
          place_of_birth: data.place_of_birth,
          date_of_birth: new Date(data.date_of_birth),
          gender: data.gender || 1,
          identity_id: data.identity_id || null,
          identity_type_id: data.identity_type_id || null,
        };
        const user_info = await UserInfo.create(data_user_info);
        console.log(
          `🚀 ~ file: UserServices.js ~ line 37 ~ user_info`,
          user_info
        );
        const hashed = data.pass ? await bcrypt.hash(data.pass, 10) : await bcrypt.hash('123456', 10)
        const data_user_secret = {
          user_id: user.id,
          pass: hashed,
          username: data.username || data.first_name + data.middle_name + data.last_name,
          email: data.email,
          email_token: data.email_token || '',
          email_token_expired: data.email_token_expired || new Date(),
          reset_pass_token: data.reset_pass_token || '',
          reset_pass_expired: new Date(data.reset_pass_expired) || new Date(),
        };
        const user_secret = await UserSecret.create(data_user_secret);
        console.log(
          `🚀 ~ file: UserServices.js ~ line 49 ~ user_secret`,
          user_secret
        );
        // callback(null, user.id);
        resolve(user.id);
      } catch (error) {
        reject(error);
        // callback(error);
      }
    });
  },
  update: async function (data, callback) {
    const user_id = data.user.id;
    const data_user = data.user;
    delete data_user.id;
    try {
      const user = await User.update(data_user, { where: { id: user_id } });
      const data_user_info = data.user_info;
      delete data_user_info.id;
      delete data_user_info.user_id;
      const user_info = await UserInfo.update(data_user_info);
      callback(null, user_id);
    } catch (error) {
      callback(error);
    }
  },
};
