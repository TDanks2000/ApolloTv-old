const fs = require('node:fs/promises');
const path = require('node:path');
const {version} = require('../package.json');
const {exec} = require('node:child_process');

const androidOutputPath = path.resolve(
  __dirname,
  '../android/app/build/outputs/apk/release',
);

const newOutputPath = path.resolve(__dirname, './builds');

// Function to check if a file exists
const checkForFile = async fileName => {
  try {
    await fs.access(path.resolve(androidOutputPath, fileName));
    return true;
  } catch (err) {
    console.error(`Error accessing file ${fileName}:`, err);
    return false;
  }
};

(async () => {
  if (await checkForFile('app-release.apk')) {
    try {
      await fs.mkdir(newOutputPath, {recursive: true});
      try {
        const oldPath = path.resolve(androidOutputPath, 'app-release.apk');
        const tempPath = path.resolve(newOutputPath, 'app-release.apk');
        const newPath = path.resolve(newOutputPath, `apollotv-v${version}.apk`);

        // Move the file to the new directory
        await fs.rename(oldPath, tempPath);

        // Rename the file with the version
        await fs.rename(tempPath, newPath);

        // Open the directory containing the new file
        await exec(`start ${newOutputPath}`);

        console.log('Release APK moved');
      } catch (error) {
        console.error('Error moving or renaming file:', error);
      }
    } catch (error) {
      console.error('Error creating directory:', error);
    }
  } else {
    console.log('No release APK found');
  }
})();
