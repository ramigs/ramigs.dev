// **** Load plugins ****
const gulp = require("gulp");
const server = require("./gulp-tasks/browsersync.js");

// **** Import Tasks ****
const css = require("./gulp-tasks/styles.js");
const js = require("./gulp-tasks/scripts.js");
const img = require("./gulp-tasks/images.js");
const icns = require("./gulp-tasks/icons.js");
const clean = require("./gulp-tasks/clean.js");
const eleventy = require("./gulp-tasks/eleventy.js");

// Watch files
function watchFiles() {
    gulp.watch("./src/assets/scss/**/*", css.build);
    gulp.watch("./src/assets/img/**/*", images);
    gulp.watch("./src/assets/js/**/*", scripts);
    gulp.watch(
        [
            "./.eleventy.js",
            "./.eleventyignore",
            "./src/site/**/*",
        ],
        eleventy.build
    );
}

// **** Define Tasks ****
const watch = gulp.parallel(watchFiles, server.init);
const images = gulp.series(img.copy);
const icons= gulp.series(icns.icons);
const scripts = gulp.series(js.lint, js.build);

// Let's build
const build = gulp.series(
    clean.dist,
    gulp.parallel(css.build, images, icons, eleventy.build, scripts)
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