import { exec } from 'child_process';

const FILES_TO_DOC = ['dataframe', 'groupedDataframe', 'row', 'modules/sql', 'modules/stat', 'modules/matrix'];

clean().then(buildMD);

function clean() {
    return new Promise((resolve, reject) => {
        console.log('Cleaning the doc folder.');
        exec('rm -rf doc/md && mkdir doc/md && mkdir doc/md/modules',
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

function buildMD() {
    return new Promise(() => {
        console.log('Building markdown doc:');
        FILES_TO_DOC.forEach(file =>
            exec(`documentation build src/${file}.js --github --format 'md' --output doc/api/${file}.md`,
                (err, stdout, stderr) => {
                    if (stderr) {
                        console.error(stderr);
                    } else {
                        console.log(`src/${file}.js ---> doc/md/${file}.md`);
                    }
                }
            )
        );
    });
}
