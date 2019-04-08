const { exec } = require('child_process');
const { parallel } = require('gulp');

const _buildRenderer = done => {
  exec(
    `npx webpack --progress --bail --colors --mode development --type renderer`,
    (err, stdout) => {
      if (stdout) { console.log(stdout); }
      done(err);
    }
  );
};

const _buildMain = done => {
  exec(
    `npx webpack --progress --bail --colors --mode development --type main`,
    (err, stdout) => {
      if (stdout) { console.log(stdout); }
      done(err);
    }
  );
};

const build = parallel(_buildRenderer, _buildMain);
build.displayName = 'build';
build.description = 'Build typescript';

module.exports = {
  _buildRenderer,
  _buildMain,
  build
};
