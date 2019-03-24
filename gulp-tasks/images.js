const fs = require("fs");
const glob = require("glob");
const path = require("path");

// Copy Images
function copyImages(done) {
    // src and dist
    let sourceDir = "./src/assets/img/";
    let distDir = "./dist/img/";
  
    // glob all files
    let files = glob.sync(`${sourceDir}/**/*`, { nodir: true });
  
    // copy each file to dist dir
    files.forEach(function(file) {
      let srcFile = file;
      let distFile = srcFile.replace(sourceDir, distDir);
      let distDirname = path.dirname(distFile);
  
      if (!fs.existsSync(distDirname)) {
        fs.mkdirSync(distDirname, { recursive: true });
      }
  
      if (!fs.existsSync(distFile)) {
        fs.copyFile(srcFile, distFile, err => {
          if (err) throw err;
        });
      }
    });
    done();
  }

// exports (Common JS)
module.exports = {
    copy: copyImages
};