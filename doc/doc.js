const exec = require("child_process").exec;

const FILES_TO_DOC = [
    "dataframe",
    "groupedDataframe",
    "row",
    "modules/sql/index",
    "modules/stat",
    "modules/matrix"
];

clean().then(buildMD);

function clean() {
    return new Promise((resolve, reject) => {
        console.log("Cleaning the doc folder.");
        exec(
            "shx rm -rf doc/md && shx mkdir doc/md && mkdir doc/md/modules",
            (err, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr);
                    reject(stderr);
                }
                console.log("doc/ cleaned.\n");
                resolve();
            }
        );
    });
}

function buildMD() {
    return new Promise(() => {
        console.log("Building markdown doc:");
        FILES_TO_DOC.forEach(file => {
            const output = file.endsWith("/index")
                ? file.replace("/index", "")
                : file;
            exec(
                `documentation build src/${file}.js --github --shallow --format 'md' --output doc/api/${output}.md`,
                (err, stdout, stderr) => {
                    if (stderr) {
                        console.error(stderr);
                    } else {
                        console.log(`src/${file}.js ---> doc/md/${file}.md`);
                    }
                }
            );
        });
    });
}
