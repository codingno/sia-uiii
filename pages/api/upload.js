const multer = require('multer');
const path = require('path');
import nextConnect from "next-connect";

// const upload = multer({ dest: 'uploads/images' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
		const folderTarget = req.body.folderTarget || 'files'
		const pathTarget = 'uploads/'	+ folderTarget + '/' + file.fieldname	
    console.log({pathTarget, file});
    cb(null, pathTarget)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "." +file.originalname.split('.').pop())
  }
})

const upload = multer({ storage: storage })

export default nextConnect()
  .post(upload.single('attachment'),(req, res) => {
    console.log(req.file);
    const file = req.file.path;
    if (!file) {
      res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    res.send(file);
		// res.ok({message:"ok"})
  })