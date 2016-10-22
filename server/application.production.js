/* eslint-disable no-console */
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import open from "open";
import { chalkProcessing } from "../tools/chalkConfig";

let application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

let port = process.env.PORT || 8888; //eslint-disable-line no-process-env

application.use(express.static(path.join(__dirname, "../dist")));

application.get("*", (request, response) => {
    let clientEntryPoint = path.join(__dirname, "../dist/index.html");
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