const { parallel } = require('gulp');
const electronPackager = require('electron-packager');

const helpers = require('./../../config/helpers');

function buildOptionOf(platform, arch = 'x64') {
  const name = 'Electron-starter';
  return {
    platform,
    arch,
    name,
    dir: helpers.root(),
    out: helpers.root('package'),
    overwrite: true,
    appBundleId: 'com.electron.starter',
    win32metadata: {
      CompanyName: 'kazhs',
      FileDescription: name,
      OriginalFilename: name,
      ProductName: name,
      InternalName: name
    }
  };
}

const _packageMac = done => electronPackager(buildOptionOf('darwin'))
  .then(() => done(), err => done(err));

const package = parallel(_packageMac);
package.displayName = 'package';
package.description = 'Create App package';

module.exports = { package };
