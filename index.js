const express = require("express")
const morgan = require("morgan")

const router = require("./router");

const app = express();


app.use(morgan("tiny"));
app.use(express.json());
app.use('/api/files', router);


app.listen(3000, ()=>console.log("server running"))


// const argv = require("yargs").argv;

// const { createFile, getFiles, getFile } = require("./files");

// function invokeAction({ action, fileName, content }) {
//   switch (action) {
//     case "create":
//       createFile(fileName, content);
//       break;

//     case "get":
//       getFiles();
//       break;

//     case "readFile":
//       getFile(fileName);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);
