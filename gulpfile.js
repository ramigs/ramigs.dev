// Load plugins
const gulp = require("gulp");
const server = require("./gulp-tasks/browsersync.js");

// Import Tasks
const clean = require("./gulp-tasks/clean.js");
const eleventy = require("./gulp-tasks/eleventy.js");

// Watch files
function watchFiles() {
    gulp.watch(
        [
            "./.eleventy.js",
            "./.eleventyignore",
            "./src/*",
            "./src/_data/**/*",
            "./src/_includes/**/*",
            "./src/_includes/**/*",
            "./src/blogposts/**/*",
            "./src/pages/**/*",
            "./src/projects/**/*"
        ],
        eleventy.build
    );
}

const watch = gulp.parallel(watchFiles, server.init);

// Let's build
const build = gulp.series(
    clean.dist,
    gulp.parallel(eleventy.build)
);

// Build and watch during dev
const dev = gulp.series(
    build,
    watch
);

// Expose tasks to CLI
exports.build = build;
exports.dev = dev;
exports.default = build;