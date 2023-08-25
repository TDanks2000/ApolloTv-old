const fs = require('node:fs');
const {version} = require('../package.json');

(async () => {
  let data = await fs.promises.readFile('./release.json');
  data = JSON.parse(data);

  const major = version.split('.')[0];
  const minor = version.split('.')[1];
  const hotfix = version.split('.')[2];

  const numericVersion = `${major * 100000}${minor * 1000}${hotfix}`;

  data.versionName = version;
  data.versionCode = numericVersion;

  data.apkUrl = data.apkUrl.replace(/(?<=v|V)\d+\.\d+\.\d+/g, version);

  await fs.promises.writeFile('./release.json', JSON.stringify(data, null, 2));

  console.log('DONE!!!');
  console.log('new release', data);
})();
