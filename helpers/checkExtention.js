function checkExtention(fileName) {
  const EXTENTIONS = ["txt", "js", "json", "html", "css"];
  const fileNameArr = fileName.split(".");

  const extention = fileNameArr[fileNameArr.length - 1];
  const result = EXTENTIONS.includes(extention);

  return { extention, result };
}

module.exports = checkExtention;
