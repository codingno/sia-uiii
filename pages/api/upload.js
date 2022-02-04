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
    const folderTarget = req.body.folderTarget || "files";
    const pathTarget = "uploads/" + folderTarget + "/" + file.fieldname;
    console.log({ pathTarget, file });
    cb(null, pathTarget);
  },
  filename: function (req, file, cb) {
    console.log("🚀 ~ file: upload.js ~ line 15 ~ file", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });
let uploadFile = upload.single("file");
export default nextConnect((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err };
  error.message = err.message;
  res.status(err.statusCode).json({
    error,
    message: error.message,
    stack: error.stack,
  });
})
  .use(uploadFile)
  .post(async (req, res) => {
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
  });
