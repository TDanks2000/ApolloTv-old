(async () => {
  try {
    await require('./updateRelease');
  } catch (error) {
    console.log(`there was an error updating the release.json`);
    process.exit(0);
  }

  try {
    await require('./moveBuild');
  } catch (error) {
    console.log(`there was an error moving the build`);
    process.exit(0);
  }

  try {
    await require('./release');
  } catch (error) {
    console.log(`there was an error creating a release on github`);
    process.exit(0);
  }
})();
