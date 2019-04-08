const { exec } = require('child_process');

const build = done => {
  exec(
    `npx webpack --progress --bail --colors --mode development`,
    (err, stdout) => {
      if (stdout) { console.log(stdout); }
      done(err);
    }
  );
};

module.exports = build;