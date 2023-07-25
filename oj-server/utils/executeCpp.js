const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const outputPath = path.join(__dirname, 'output');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

// const executeCpp = (filepath, user_input) => {
//     const jobId = 'temp'; 
//     const outPath = path.join(outputPath, `${jobId}.out`)
//     const inputFilePath = path.join(outputPath, 'input.txt');
//     console.log(outPath)
//     console.log(user_input)
//     fs.writeFileSync(inputFilePath,user_input);
//     // return outPath;

//     return new Promise((resolve, reject) => {
//         if (fs.existsSync(outPath)) {
//             fs.unlinkSync(outPath);
//           }
//         exec(`g++ ${filepath} -o ${outPath}`, (err, stdout, stderr) => {
           
//             if(err){
//                 reject((err, stderr));
//             } else {
//                 exec(`cd ${outputPath} && ./${jobId}.out < input.txt`, (err, stdout, stderr) => {
//                     // console.log("Yesssssss")
//                     if(err){
//                         // console.log(err);
//                         reject((err, stderr));
//                     }
//                     else{
//                         // console.log("Yesssssss")
//                         resolve(stdout);
//                     }
//                 })
//             }
//         })
//     })
// }

const executeCpp = (filepath, user_input, timeoutMillis = 3000) => {
    const jobId = 'temp';
    const outPath = path.join(outputPath, `${jobId}.out`);
    const inputFilePath = path.join(outputPath, 'input.txt');
  
    fs.writeFileSync(inputFilePath, user_input);
  
    return new Promise((resolve, reject) => {
      if (fs.existsSync(outPath)) {
        fs.unlinkSync(outPath);
      }
  
      const compileCommand = `g++ ${filepath} -o ${outPath}`;
      const executeCommand = `timeout ${timeoutMillis / 1000}s ${outPath} < ${inputFilePath}`;
  
      exec(compileCommand, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          exec(executeCommand, (err, stdout, stderr) => {
            if (err) {
              if (err.code === 124) {
                console.log(err.message); 
                reject(new Error('Compilation timed out.'));
              } else {
                console.log(err.message);
                reject(err);
              }
            } else {
              resolve(stdout);
            }
          });
        }
      });
    });
  };
// const executePython = (filepath) => {
//     const jobId = path.basename(filepath).split(".")[0]; 
//     console.log(jobId);
//     return new Promise((resolve, reject) => {
//         exec(`python ${jobId}.py`, (err, stdout, stderr) => {
//             if(err){
//                 // console.log("Yess")
//                 reject((err, stderr));
//             }
//             resolve(stdout);
//         });
//     })

// }

const executePython = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const pythonProcess = spawn('python', [filepath]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
    })

    return new Promise((resolve, reject) => {
        pythonProcess.on('error', (err) => {
            reject(err);
        })

        pythonProcess.on('close', (code) => {
            if(code != 0){
                reject(new Error(`Python process exited with code ${code}`));
            }
            else{
                resolve(stdoutData);
            }
        })
    })
}

module.exports = {
    executeCpp, executePython
}