module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "chai", "karma-typescript"],

    files: [
      { pattern: "src/**/*.ts" },
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    karmaTypescriptConfig: {
      compilerOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: "commonjs",
        sourceMap: true,
        target: "es6",
        types: ["chai", "jasmine"],
      },
      include: ["src"]
    },

    reporters: ["dots", "karma-typescript"],

    browsers: ["Chrome"],

    singleRun: true
  });
};
