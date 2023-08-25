const fs = require('node:fs/promises');
const path = require('node:path');
const {version} = require('../package.json');

const androidOutputPath = path.resolve(
  __dirname,
  '../android/app/build/outputs/apk/release',
);

const newOutputPath = path.resolve(__dirname, './builds');

const checkForFile = async fileName => {
  try {
    await fs.access(path.resolve(androidOutputPath, fileName));
    return true;
  } catch (err) {
    return false;
  }
};

(async () => {
  if (await checkForFile('app-release.apk')) {
    try {
      await fs.mkdir(newOutputPath, {recursive: true});
      try {
        await fs.rename(
          path.resolve(androidOutputPath, 'app-release.apk'),
          path.resolve(newOutputPath, 'app-release.apk'),
        );
        await fs.rename(
          path.resolve(newOutputPath, 'app-release.apk'),
          path.resolve(newOutputPath, `apollotv-v${version}.apk`),
        );

        console.log('Release APK moved');
      } catch (error) {
        console.log(error);
      }
    } catch (error) {}
  } else {
    console.log('No release APK found');
  }
})();
