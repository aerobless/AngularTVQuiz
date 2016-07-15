module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            app: {
                files: [{
                    src: ["server/**/*.ts", "!src/.baseDir.ts", "!src/_all.d.ts", "!src/client/*"],
                    dest: "."
                }],
                options: {
                    module: "commonjs",
                    noLib: true,
                    target: "es6",
                    sourceMap: false
                }
            }
        },
        watch: {
            ts: {
                files: ["js/src/**/*.ts", "server/**/*.ts"],
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");

    grunt.registerTask("default", [
        "ts"
    ]);

};