const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

async function createFile(fileName, content) {
  const data = { fileName, content };

  const isValid = dataValidator(data);
  console.log();

  if (isValid.error) {
    console.log(
      chalk.red(`Please specify ${isValid.error.details[0].path[0]} parametr`)
    );
  }

  const { result, extention } = checkExtention(fileName);

  if (!result) {
    console.log(
      chalk.red(
        `Sorry this aplication does not support "${extention}" extention`
      )
    );
  }

  try {
    await fs.writeFile(
      path.join(__dirname, "./files", fileName),
      content,
      "utf-8"
    );
    console.log(chalk.green("File was successful created"));
  } catch (error) {
    console.log(error);
  }
}

async function getFiles() {
  const namesArr = await fs.readdir(path.join(__dirname, "./files"));

  if (namesArr.length === 0) {
    console.log(chalk.red("There is no files in this directory"));
    return;
  }

  console.log(namesArr);
}

async function getFile(name) {
  const namesArr = await fs.readdir(path.join(__dirname, "./files"));
  const filePath = path.join(__dirname, `./files/${name}`);
  const isConsist = namesArr.includes(name);
  const extname = path.extname(name);

  if (!isConsist) {
    console.log(
      chalk.red(`There is not file with '${name}' at this directory`)
    );
    return;
  }

  const fileData = await fs.readFile(filePath, "utf-8");

  return console.log({
    name: path.basename(name, extname),
    extention: extname.slice(1),
    content: fileData,
  });
}

module.exports = {
  createFile,
  getFiles,
  getFile,
};
