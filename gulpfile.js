// Load plugins
const gulp = require("gulp");

// Import Tasks
const clean = require("./gulp-tasks/clean.js");
const eleventy = require("./gulp-tasks/eleventy.js")

// Tasks

const build = gulp.series(
    clean.dist,
    gulp.parallel(eleventy.build)
);

exports.default = build;