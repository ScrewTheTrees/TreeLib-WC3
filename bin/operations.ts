import {buildConfig, getFilesInsideDir, incrementMajor, incrementMinor, logger} from "./Utils";
import {buildEntireMap} from "./Build";

const fs = require("fs");
const execFile = require("child_process").execFile;
const cwd = process.cwd();

const operation = process.argv[2];

const config = buildConfig;

switch (operation) {
    case "build":
        buildEntireMap();
        break;
    case "run":
        const filename = `${cwd}\\target\\${config.mapFolder}`;

        logger.debug(filename);

        execFile(config.gameExecutable, ["-loadfile", filename, ...config.launchArgs]);

        break;

    case "incrementMajor":
        incrementMajor();
        break;

    case "incrementMinor":
        incrementMinor();
        break;


    case "regenerateIndex":
        let dirs = getFilesInsideDir(config.indexDirectory, ".ts")
        let data = "";
        for (let dir of dirs) {
            dir = dir.replace(/\\/g, "/").replace(/\.ts/g, "");
            data += `export * from "${dir}"\n`;
        }

        fs.writeFileSync("./index.ts", data);
        break;
}


