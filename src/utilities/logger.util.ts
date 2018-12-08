/**
 * @author Vivek Jain at Dec 8th 2018.
 */

import * as fs from "fs";
import * as path from "path";
import { configure, getLogger, Logger } from "log4js";
import { config } from "../config/config";

const appRoot = path.join(__dirname, "../../");
const logDir = path.join(appRoot, "logs");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

configure({
    appenders: {
        file_appender: {
            type: "file",
            filename: `${appRoot}/logs/app.log`,
            maxLogSize: 10458760
        },
        out: { type: "stdout" }
    },
    categories: {
        default: { appenders: ["file_appender", "out"], level: config.LOG_LEVEL }
    }
});

export class APILogger {
    public initLogger(name: string): Logger {
        return getLogger(name);
    }
}