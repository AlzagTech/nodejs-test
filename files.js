const fs = require("fs").promises;
const path = require("path");
// const chalk = require("chalk");

const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

async function createFile(req,res) {
  console.log('func')
  try {

    const isValid = dataValidator(req.body);
  
    if (isValid.error) {
      res.status(400).json({message:`Please specify ${isValid.error.details[0].path[0]} parametr`})
      return
    }
    const { result, extention } = checkExtention(req.body.fileName);
  
    if (!result) {
      res.status(400).json({message:`Sorry this aplication does not support "${extention}" extention`})
      return
    }

    await fs.writeFile(
      path.join(__dirname, "./files", req.body.fileName),
      req.body.content,
      "utf-8"
    );
    res.json({message:"File was successful created"})
    
  } catch (error) {
    const {status = 500, massage = "Server error"} = error;
    return res.status(status).json({massage})
  }
 

}

async function getFiles(req,res) {
  try {
    const namesArr = await fs.readdir(path.join(__dirname, "./files"));

    if (!namesArr.length) {
     res.status(400).json({message:"Not files in this directory"})
     return
    }
    res.json(namesArr)
  } catch (error) {
    const {status = 500, massage = "Server error"} = error;
    return res.status(status).json({massage})
    
  }

}

async function getFile(req,res) {
  try {
    const {fileName} = req.params;
    const namesArr = await fs.readdir(path.join(__dirname, "./files"));
  const filePath = path.join(__dirname, `./files/${fileName}`);
  const isConsist = namesArr.includes(fileName);
  const extname = path.extname(fileName);

  if (!isConsist) {
    res.status(400).json({message:`There is not file with '${fileName}' at this directory`})
    return;
  }
  const fileData = await fs.readFile(filePath, "utf-8");
  res.json({
    name: path.basename(fileName, extname),
    extention: extname.slice(1),
    content: fileData,
  })
  } catch (error) {
    const {status = 500, massage = "Server error"} = error;
    return res.status(status).json({massage}) 
  }
  


}

module.exports = {
  createFile,
  getFiles,
  getFile,
};
