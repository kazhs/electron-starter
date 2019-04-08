const gulp = require('gulp');
const { server } = require('electron-connect');

const helpers = require('./../../config/helpers');

const build = require('./build');

/**
 * Start Electron for Dev
 */
const serve = () => {
  process.env.WATCH = true;

  const electronServer = server.create({ path: helpers.root() });
  electronServer.start();

  /**
   * Watch compiled Electron
   */
  const restart = next => next(electronServer.restart());
  gulp.watch(
    [
      helpers.root('src', 'main', '**', '*'),
      helpers.root('index.html'),
    ],
    gulp.series(build, restart)
  );
};

const start = gulp.series(
  build,
  serve
);
start.displayName = 'start';
start.description = 'Build and watch electron APP';

module.exports = start;