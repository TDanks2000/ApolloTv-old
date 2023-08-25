const packageJson = require('../package.json');
const fs = require('node:fs/promises');
const path = require('node:path');

const dependencies = packageJson.dependencies;
const devDependencies = packageJson.devDependencies;

const dependencyNames = Object.keys(dependencies);
const devDependencyNames = Object.keys(devDependencies);

console.log('Dependencies:');
const dependenciesArray = [];
dependencyNames.forEach(dependency => {
  dependenciesArray.push(dependency);
});

console.log('\nDev Dependencies:');
const devDependenciesArray = [];
devDependencyNames.forEach(devDependency => {
  devDependenciesArray.push(devDependency);
});

const turnIntoYarnCommand = async (array, type = 'dep') => {
  if (type === 'dev')
    return `yarn add ${array.map(dep => dep + ' ').join('')} -D`;
  return `yarn add ${array.map(dep => dep + ' ').join('')}`;
};

(async () => {
  await fs.writeFile(
    './dependencies.json',
    await turnIntoYarnCommand(dependenciesArray),
  );
  await fs.writeFile(
    './devDependencies.json',
    await turnIntoYarnCommand(devDependenciesArray, 'dev'),
  );
})();
