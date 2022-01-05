import { useSession, getSession } from "next-auth/react"
module.exports = {
	isLogin : async (req, res, next) => {
    console.log(`🚀 ~ file: police.js ~ line 4 ~ isLogin: ~ req, res, next`, req, res, next)
		const session  = await getSession({req});
    console.log(`🚀 ~ file: police.js ~ line 5 ~ isLogin: ~ session`, session)
		req.user = session.user
		if(req.user)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isAdmin : (req, res, next) => {
		if(req.user && req.user.isAdmin)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isManager : (req, res, next) => {
		if(req.user && req.user.role_id <= 2)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isCourseCreator : (req, res, next) => {
		if(req.user && req.user.role_id <= 3)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isTeacher : (req, res, next) => {
		if(req.user && req.user.isTeacher)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isNonEditTeacher : (req, res, next) => {
		if(req.user && req.user.role_id <= 5)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isStudent : (req, res, next) => {
		if(req.user && req.user.isStudent)
			next()
		else 
			res.status(403).send("You don't have permission to access this features")
	},
	isPublic : (req, res, next) => {
			next()
	},
}