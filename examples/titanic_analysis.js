const DataFrame = require('dataframe-js').DataFrame;

const csvPath = 'http://forge.scilab.org/index.php/p/rdataset/source/file/368b19abcb4292c56e4f21079f750eb76b325907/csv/datasets/Titanic.csv';

// Here we load the data set.
DataFrame.fromCSV(csvPath).then(
    df => {
        // We get the result via a Promise, as a new DataFrame.
        df.show();
    }
);
