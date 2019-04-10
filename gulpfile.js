const { task } = require('gulp');

const { build } = require('./gulp/tasks/build');
const { package } = require('./gulp/tasks/package');
const { start } = require('./gulp/tasks/start');

task(build);
task(package);
task(start);
