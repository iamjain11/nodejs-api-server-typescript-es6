"use strict";
var del = require("del");
let gulp = require("gulp");
let ts = require("gulp-typescript");
let exec = require("child_process").exec;

let tsProject = ts.createProject("tsconfig.json", {
    declaration: true
});

gulp.task("build", () => {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(tsProject())
        .pipe(gulp.dest("dist/"));
});

gulp.task("start_server", (cb) => {
    exec("node dist/index.js", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Clean
gulp.task("clean", () => {
    return del(["dist/"]);
});

// Default task
gulp.task("default", () => {
    return gulp.series(["clean", "build", "start_server"])();
});