/* eslint-disable */
var exec = require("child_process").exec;

exec("node -v", function (error, stdout) {
    if (error) {
        throw error;
    }

    if (parseFloat(stdout.slice(1)) < 4) {
        throw new Error("React Slingshot requires node 4.0 or greater.");
    }
});
