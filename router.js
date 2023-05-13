const express= require("express");

const router = express.Router();
const serviseFiles = require("./files")


router.get("/",serviseFiles.getFiles)


router.get("/:fileName",serviseFiles.getFile)


router.post("/",serviseFiles.createFile)




module.exports = router;
