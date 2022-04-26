module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "chai", "karma-typescript"],

    files: [
      // Exclude .d.ts files, which cause Karma to fail with errors such as:
      //     No source found for (...)/src/checkbox-sk/checkbox-sk_test.d.ts
      { pattern: "src/**/!(*.d).ts" },
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
