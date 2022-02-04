const multer = require("multer");
const path = require("path");
import nextConnect from "next-connect";

// const upload = multer({ dest: 'uploads/images' })
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
		const folderTarget = req.body.folderTarget || 'files'
		// const pathTarget = 'uploads/'	+ folderTarget + '/' + file.fieldname	
		const pathTarget = `public/${file.fieldname}/${folderTarget}`
    cb(null, pathTarget)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix + "." +file.originalname.split('.').pop())
    cb(null, file.fieldname + '-' + uniqueSuffix + "-" +file.originalname)
  }
})

const upload = multer({ storage: storage })

export default nextConnect()
	.use(upload.single('uploads'))
  .post((req, res) => {
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
