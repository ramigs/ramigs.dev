module.exports = function (eleventyConfig) {

    return {
        templateFormats : ["njk", "md"],
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "dist"
        }
    };
};