const fs = require('node:fs');
const path = require('node:path');

// Function to get version from package.json
function getVersionFromNpm() {
  try {
    const inputFile = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    return packageJson['version'];
  } catch (error) {
    throw new Error('Error reading version from package.json:', error);
  }
}

// Function to convert version name to a numeric version
function getNumericVersionFromNpm() {
  try {
    const versionName = getVersionFromNpm();
    const parts = versionName.split('.');
    const [major, minor, hotfix] = parts.map(part => parseInt(part));
    return major * 100000 + minor * 1000 + hotfix;
  } catch (error) {
    throw new Error('Error converting version name to numeric version:', error);
  }
}

(async () => {
  try {
    let data = await fs.promises.readFile('./release.json', 'utf8');
    data = JSON.parse(data);

    const version = getVersionFromNpm();
    const numericVersion = getNumericVersionFromNpm();

    data.versionName = version;
    data.versionCode = numericVersion;

    // Replace the version in the apkUrl with the new version
    data.apkUrl = data.apkUrl.replace(/(?<=v|V)\d+\.\d+\.\d+/g, version);

    await fs.promises.writeFile(
      './release.json',
      JSON.stringify(data, null, 2),
    );

    console.log('DONE!!!');
    console.log('new release', data);
  } catch (error) {
    throw new Error('Error updating release.json');
  }
})();
