import nc from "next-connect";

import db from "../models";
const { Op } = require("sequelize");
import police from "../pages/api/config/police";

const handler = (tableName, getOptions, role, readOnly ) => nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})
  .use(police[role])
  .get(async (req, res) => {
	  delete getOptions.where
		let options = getOptions
		if(req.query) {
			Object.keys(req.query).map(item => {
				if(req.query[item].startsWith('lte'))
					options.where = { ...options.where, [item] : { [Op.lte] : new Date(req.query[item].split('lte')[1])} }
				else if(req.query[item].startsWith('gte'))
					options.where = { ...options.where, [item] : { [Op.gte] : new Date(req.query[item].split('gte')[1])} }
				else options.where = { ...options.where, [item] : req.query[item]}
				return
			})
		}
		try {
			const data = await db[tableName].findAll(options)
    	res.send(data);
		} catch (error) {
			res.status(500).send(error)	
		}
  })
  .post(async (req, res) => {
	if(readOnly)
		return res.status(403).send("You don't have permission to access this features")
		try {
			if(!req.body)
				throw new Error("Missing parameters!")
			const data = await db[tableName].create(req.body)	
    	res.send(data);
		} catch (error) {
      console.log(`🚀 ~ file: specification.js ~ line 34 ~ .post ~ error`, error)
			res.status(500).send(error)	
		}
  })
  .patch(async (req, res) => {
	if(readOnly)
		return res.status(403).send("You don't have permission to access this features")
		try {
			if(!req.body || !req.body.id)
				throw new Error("Missing parameters!")
			const data = await db[tableName].update(req.body, {
				where : {
					id : req.body.id,
				}
			})	
    	res.send(data);
		} catch (error) {
      console.log(`🚀 ~ file: component.js ~ line 40 ~ .patch ~ error`, error)
			res.status(500).send(error)	
		}
  });

export default handler;