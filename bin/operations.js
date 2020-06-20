const fs = require("fs");
const fsx = require("fs-extra");
const execFile = require("child_process").execFile;
const cwd = process.cwd();

// Parse configuration
let config = {};
try {
    config = JSON.parse(fs.readFileSync("config.json"));
} catch (e) {
    return console.error(e);
}
let version = {};
try {
    if (fs.existsSync("build.json")) {
        version = JSON.parse(fs.readFileSync("build.json"))
    } else {
        version.major = 1;
        version.minor = 0;
        version.build = 0;
    }
} catch (e) {
    return console.error(e);
}

const operation = process.argv[2];

switch (operation) {
    case "build":
        version.build += 1;
        fs.writeFileSync("build.json", JSON.stringify(version));

        const tsLua = ".\\target\\tstl_output.lua";
        if (!fs.existsSync(tsLua)) {
            return console.error(`Could not find "${tsLua}"`);
        }

        console.log(`Building "${cwd}\\maps\\${config.mapFolder}"...`);
        fsx.copy(`.\\maps\\${config.mapFolder}`, `.\\target/${config.mapFolder}`, function (err) {
            if (err) {
                console.error(err);
            } else {
                const mapLua = `.\\target\\${config.mapFolder}\\war3map.lua`;

                if (!fs.existsSync(mapLua)) {
                    return console.error(`Could not find "${mapLua}"`);
                }

                try {
                    const tsLuaContents = fs.readFileSync(tsLua);
                    fs.appendFileSync(mapLua, "\nlocal mapVersion = {}");
                    fs.appendFileSync(mapLua, "\nmapVersion.major = " + version.major);
                    fs.appendFileSync(mapLua, "\nmapVersion.minor = " + version.minor);
                    fs.appendFileSync(mapLua, "\nmapVersion.build = " + version.build);
                    let date = new Date();
                    fs.appendFileSync(mapLua, `\nmapVersion.date = "${date.getFullYear()}-${date.getMonth()}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}"`);
                    fs.appendFileSync(mapLua, tsLuaContents);
                } catch (err) {
                    return console.error(err);
                }
                console.log(`Completed!`);
            }
        });

        break;

    case "run":
        const filename = `${cwd}\\target\\${config.mapFolder}`;

        console.log(filename);

        execFile(config.gameExecutable, ["-loadfile", filename, ...config.launchArgs]);

        break;

    case "incrementMajor":
        version.major += 1;
        version.minor = 0;
        version.build = 0;
        fs.writeFileSync("build.json", JSON.stringify(version));
        break;

    case "incrementMinor":
        version.minor += 1;
        version.build = 0;
        fs.writeFileSync("build.json", JSON.stringify(version));
        break;
}