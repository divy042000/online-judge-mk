const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const outputPath = path.join(__dirname, 'output');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0]; 
    const outPath = path.join(outputPath, `${jobId}.out`)
    console.log(outPath)
    // return outPath;
    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`, (err, stdout, stderr) => {
            if(err){
                // console.log("Yess")
                reject((err, stderr));
            }
            if(stderr){
                // console.log("No")
                reject(stderr);
            }
            resolve(stdout);
        });
    })

}

module.exports = {
    executeCpp
}