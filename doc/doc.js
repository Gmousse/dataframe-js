import { exec } from 'child_process';

const FILES_TO_DOC = ['dataframe', 'groupedDataframe', 'row', 'modules/sql', 'modules/stat', 'modules/matrix'];

clean().then(buildHTML).then(buildMD);

function clean() {
    return new Promise((resolve, reject) => {
        console.log('Cleaning the doc folder.');
        exec('rm -rf doc/html-api && rm -rf doc/md-api && mkdir doc/html-api && mkdir doc/md-api && mkdir doc/md-api/modules',
            (err, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr);
                    reject(stderr);
                }
                console.log('doc/ cleaned.\n');
                resolve();
            }
        );
    });
}

function buildHTML() {
    return new Promise((resolve) => {
        console.log('Building html doc:');
        exec('documentation build src/ --github --output doc/html-api --format "html"', (err, stdout, stderr) => {
            if (stderr) {
                console.error(stderr);
            } else {
                console.log('src/*.js ---> doc/html-api\n');
            }
            resolve();
        });
    });
}

function buildMD() {
    return new Promise(() => {
        console.log('Building markdown doc:');
        FILES_TO_DOC.forEach(file =>
            exec(`documentation build src/${file}.js --github --format 'md' --output doc/md-api/${file}.md`,
                (err, stdout, stderr) => {
                    if (stderr) {
                        console.error(stderr);
                    } else {
                        console.log(`src/${file}.js ---> doc/md-api/${file}.md`);
                    }
                }
            )
        );
    });
}
