const {Octokit} = require('octokit');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config({
  path: path.resolve(__dirname, './.env'),
});

const {version} = require('../package.json');

const newOutputPath = path.resolve(__dirname, './builds');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// For the future
// "stable" || "beta" || "dev"
const releaseType = process.env.TYPE;

if (
  releaseType === 'beta' &&
  JSON.parse(fs.readFileSync(path.join(__dirname, './data.json'))).isBeta !==
    true
) {
  process.exit(0);
}

const repoName =
  releaseType === 'stable' ? 'ApolloTv' : `ApolloTv-${releaseType}`;
const targetBranch = releaseType === 'stable' ? `master` : 'main';
const tag = `v${version}-alpha`;
const fileToUpload = path.resolve(newOutputPath, `apollotv-v${version}.apk`);

let releaseNotes = '';

switch (releaseType) {
  case 'stable':
    releaseNotes = fs.readFileSync(
      path.join(__dirname, '../releasenotes.md'),
      'utf-8',
    );
    break;

  case 'beta':
    releaseNotes = fs.readFileSync(
      path.join(__dirname, '../releasenotes.beta.txt'),
      'utf-8',
    );
    break;

  case 'dev':
    releaseNotes = process.env.MESSAGE;
    break;
}

(async () => {
  try {
    const response = await octokit.rest.repos.createRelease({
      owner: 'ApolloTv-team',
      repo: repoName,
      tag_name: tag,
      target_commitish: targetBranch,
      name: version,
      body: releaseNotes,
      draft: false,
      prerelease: false,
      generate_release_notes: releaseType === 'stable' ? true : false,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const id = response.data.id;

    await octokit.rest.repos.uploadReleaseAsset({
      owner: 'ApolloTv-team',
      repo: repoName,
      release_id: id,
      name: `apollotv-v${version}.apk`,
      data: fs.readFileSync(fileToUpload),
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  } catch (error) {
    throw new Error('Error creating release:', error);
  }
})();
