/* eslint-disable no-console */
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import webpack from "webpack";
import configuration from "../webpack.config.dev";
import open from "open";
import { chalkProcessing } from "../tools/chalkConfig";

let application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

let port = process.env.PORT || 9999; //eslint-disable-line no-process-env

const applicationCompiler = webpack(configuration);
application.use(require("webpack-dev-middleware")(applicationCompiler, {
    noInfo: true, publicPath: configuration.output.publicPath
}));

application.use(require("webpack-hot-middleware")(applicationCompiler));

application.use("/client", express.static(path.join(__dirname, "../client")));

application.get("*", (request, response) => {
    console.log("I'm here");
    let clientEntryPoint = path.join(__dirname, "../client/index.html");
    response.sendFile(clientEntryPoint);
});

application.listen(port, (error) => {
    if (!!error) {
        console.log(error.bold.red);
    }
    open(`http://localhost:${port}`);
    console.log(chalkProcessing(`Serving API AT http://localhost:${port}`));
});

export default application;