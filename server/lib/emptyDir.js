const fs = require('fs');
const path = require('path');

// https://stackoverflow.com/a/49421028

function emptyDir(dirPath, ignore = []) {
  if (fs.existsSync(dirPath)) {
    try {
      const contents = fs.readdirSync(dirPath);
      for (const next of contents) {
        if (ignore.includes(next)) {
          continue;
        }

        const nextAbs = path.join(dirPath, next);
        if (fs.lstatSync(nextAbs).isFile()) {
          fs.unlinkSync(nextAbs);
        } else {
          fs.rmSync(nextAbs, {
            recursive: true,
            force: true,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
exports.emptyDir = emptyDir;
