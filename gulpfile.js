// **** Load plugins ****
const gulp = require("gulp");
const server = require("./gulp-tasks/browsersync.js");

// **** Import Tasks ****
const img = require("./gulp-tasks/images.js");
const css = require("./gulp-tasks/styles.js");
const clean = require("./gulp-tasks/clean.js");
const eleventy = require("./gulp-tasks/eleventy.js");

// Watch files
function watchFiles() {
    gulp.watch("./src/assets/scss/**/*", css.build);
    gulp.watch("./src/assets/img/**/*", images);
    gulp.watch(
        [
            "./.eleventy.js",
            "./.eleventyignore",
            "./src/site/*",
            "./src/site/_data/**/*",
            "./src/site/_includes/**/*",
            "./src/site/posts/**/*",
            "./src/site/projects/**/*",
            "./src/site/pages/**/*"
        ],
        eleventy.build
    );
}

// **** Define Tasks ****

const watch = gulp.parallel(watchFiles, server.init);
const images = gulp.series(img.copy);

// Let's build
const build = gulp.series(
    clean.dist,
    gulp.parallel(css.build, eleventy.build, images)
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