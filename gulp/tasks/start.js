const { series, watch } = require('gulp');
const { server } = require('electron-connect');

const helpers = require('./../../config/helpers');

const { build, _buildMain, _buildRenderer } = require('./build');

/**
 * Start Electron for Dev
 */
const serve = () => {
  process.env.WATCH = true;

  const electronServer = server.create({ path: helpers.root() });
  electronServer.start();

  /**
   * Watch compiled Renderer process
   */
  const reload = next => {
    electronServer.reload();
    next();
  };
  watch(
    helpers.root('src', 'renderer', '**', '*'),
    series(_buildRenderer, reload)
  );

  /**
   * Watch compiled Main process
   */
  const restart = next => next(electronServer.restart());
  watch(
    [
      helpers.root('src', 'main', '**', '*'),
      helpers.root('index.html'),
    ],
    series(_buildMain, restart)
  );
};

const start = series(
  build,
  serve
);
start.displayName = 'start';
start.description = 'Build and watch electron APP';

module.exports = start;
