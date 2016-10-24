// More info on Webpack"s Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from "webpack";
import config from "../webpack.config.production";
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from "./chalkConfig";

process.env.NODE_ENV = "production"; //eslint-disable-line no-process-env

console.log(chalkProcessing("Generating minified bundle. This will take a moment..."));

webpack(config).run((error, stats) => {
    if (error) { // so a fatal error occurred. Stop here.
        console.log(chalkError(error));
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map((jsonStatsErrors) => console.log(chalkError(jsonStatsErrors)));
    }

    if (jsonStats.hasWarnings) {
        console.log(chalkWarning("Webpack generated the following warnings: "));
        jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    // if we got this far, the build succeeded.
    console.log(chalkSuccess("The application is compiled in production mode to /dist."));

    return 0;
});
