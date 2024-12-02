const { exec } = require('child_process');
const config = require('./config');

const compileLatex = (texFilePath, pdfOutputPath) => {
    return new Promise((resolve, reject) => {
        exec(`pdflatex -output-directory=${pdfOutputPath.replace('plan.pdf', '')} ${texFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            resolve(pdfOutputPath);
        });
    });
};

module.exports = { compileLatex };