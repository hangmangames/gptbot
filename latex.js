const { exec } = require('child_process');
const config = require('./config');

const compileLatex = () => {
    return new Promise((resolve, reject) => {
        exec(`pdflatex -output-directory=${config.latex.pdfOutputPath.replace('plan.pdf', '')} ${config.latex.texFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            resolve(config.latex.pdfOutputPath);
        });
    });
};

module.exports = { compileLatex };



