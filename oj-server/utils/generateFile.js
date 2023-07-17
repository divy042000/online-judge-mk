const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: True});
}


const generateFile = async(format, content) => {
    const jobID = uuid();//16ed3c71-bf8d-4256-88c6-83e1cd21efa3
    const fileName = `${jobID}.${format}`;//cpp
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath, content);
    return filePath;
};

module.exports = {
    generateFile,
}