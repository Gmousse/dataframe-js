// In this example we will use dataframe-js to analyse a simple data set.
// You will find the code, explanations and results as comments.

// Here we import the lib.
// You can also: import { DataFrame } from 'dataframe-js';
const DataFrame = require('../src/index.js').DataFrame;

// Here we load the titanic data set from the well known Rdatasets (http://vincentarelbundock.github.io/Rdatasets/datasets.html).
// We get the result via a Promise, as a new DataFrame. We rename it 'df'.
DataFrame.fromCSV('http://vincentarelbundock.github.io/Rdatasets/csv/COUNT/titanic.csv').then(
    df => {
        // Let's go to display quicly our table.
        df.show();
        // It looks like that, with one passenger by line.
        // |           | class     | age       | sex       | survived  |
        // ------------------------------------------------------------
        // | 1         | 1st class | adults    | man       | yes       |
        // | 2         | 1st class | adults    | man       | yes       |
        // | 3         | 1st class | adults    | man       | yes       |
        // | 4         | 1st class | adults    | man       | yes       |
        // | 5         | 1st class | adults    | man       | yes       |
        // | 6         | 1st class | adults    | man       | yes       |
        // | 7         | 1st class | adults    | man       | yes       |
        // | 8         | 1st class | adults    | man       | yes       |
        // | 9         | 1st class | adults    | man       | yes       |
        // | 10        | 1st class | adults    | man       | yes       |

        // Ok, in the csv, the first column was row index named as ''. We will rename this column.
        const cleanDF = df.rename('', 'id');

        // If we look at columnNames, the row index is replaced by the 'id' column name.
        console.log(cleanDF.listColumns());
        // [ 'id', 'Class', 'Sex', 'Age', 'Survived', 'Freq' ]

        // Now, our DataFrame is 'clean' with. Let's go to a quick analysis.
        console.log('Total passengers:', cleanDF.count()); // We have 1316 passengers in the Titanic.
        console.log('Survivors:', cleanDF.filter({survived: 'yes'}).count()); // We have 499 survivors.
        console.log('Died:', cleanDF.filter(row => row.get('survived') === 'no').count()); // and 817 died passengers.

        // Ok now we will count the number of passengers by class + age + sex + survived by using groupBy and aggregation.
        const countByGroup = cleanDF.groupBy('class', 'age', 'sex', 'survived').aggregate(group => group.count());
        // We can quicly get some statistics on our DataFrame by using the stat module.
        console.log('Some statistics on groups:', countByGroup.stat.stats('aggregation'));
        // { sum: 1316,
        //   mean: 65.8,
        //   min: 1,
        //   max: 387,
        //   var: 7998.063157894738,
        //   varpop: 7598.160000000001,
        //   sd: 89.43189116805446,
        //   sdpop: 87.1674251082364 }

        // Ok, now we have the repartition of passengers by class + age + sex + survived.
        // But it could be easier to read if we rename the aggregation and sort rows by count.
        const cleanCountByGroup = countByGroup.rename('aggregation', 'count').sortBy('count', true);

        // And now show the result
        cleanCountByGroup.show(300);
        // | class     | age       | sex       | survived  | count     |
        // ------------------------------------------------------------
        // | 3rd class | adults    | man       | no        | 387       |
        // | 2nd class | adults    | man       | no        | 154       |
        // | 1st class | adults    | women     | yes       | 140       |
        // | 1st class | adults    | man       | no        | 118       |
        // | 3rd class | adults    | women     | no        | 89        |
        // | 2nd class | adults    | women     | yes       | 80        |
        // | 3rd class | adults    | women     | yes       | 76        |
        // | 3rd class | adults    | man       | yes       | 75        |
        // | 1st class | adults    | man       | yes       | 57        |
        // | 3rd class | child     | man       | no        | 35        |

        // OK, if we just look at this table, we can see that rich people (1s Class), and more specifically women have the largest number of survivors.

        // To resume this fact, it could be interesting to compute the % of survival for each group of passengers.
        // We can do this by this way:
        // First we compute the number of survivors by class + age + sex.
        const countByPassengersType = cleanDF.groupBy('class', 'age', 'sex').aggregate(group => group.count());
        countByPassengersType.show()
        // Then we have to join with the cleanCountByGroup table.
        cleanCountByGroup.innerJoin(countByPassengersType, 'class', 'age', 'sex').show(100);
    }
).catch(err => {
    console.log(err);
});
