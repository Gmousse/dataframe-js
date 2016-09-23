// In this example we will use dataframe-js to analyse a simple data set.
// The aim of this snippet is  (not really to explore data but) to play with the library in order to do simple things.
// You will find the code, explanations and results as comments.

// Here we import the lib.
// You can also: import { DataFrame } from 'dataframe-js';
const DataFrame = require('dataframe-js').DataFrame;

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

        // Ok, now we have the repartition of passengers by class + age + sex + survived.
        // But it could be easier to read if we rename the aggregation and sort rows by passengers.
        const cleanCountByGroup = countByGroup.rename('aggregation', 'passengers').sortBy('passengers', true);

        // And now show the result
        cleanCountByGroup.show(300);
        // | class     | age       | sex       | survived  | passengers     |
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
        // First we compute the total number of passengers by class + age + sex.
        const passengersByGroup = cleanDF.groupBy('class', 'age', 'sex')
            .aggregate(group => group.count())
            .rename('aggregation', 'totalPassengers');
        // Then we have to join with the cleanCountByGroup table.
        // And we compute a new Column, survival, to expose the percentage of survivors.
        // Then, we drop totalPassengers column which is now useless.
        const informationsByGroup = cleanCountByGroup.innerJoin(passengersByGroup, ['class', 'age', 'sex'])
            .withColumn('survival', (row) => row.get('passengers') / row.get('totalPassengers'))
            .drop('totalPassengers');

        informationsByGroup.show(100);
        // | class     | age       | sex       | survived  | passen... | survival  |
        // ------------------------------------------------------------------------
        // | 3rd class | adults    | man       | no        | 387       | 0.8376... |
        // | 3rd class | adults    | man       | yes       | 75        | 0.1623... |
        // | 3rd class | adults    | women     | no        | 89        | 0.5393... |
        // | 3rd class | adults    | women     | yes       | 76        | 0.4606... |
        // | 3rd class | child     | man       | no        | 35        | 0.7291... |
        // | 3rd class | child     | man       | yes       | 13        | 0.2708... |
        // | 3rd class | child     | women     | no        | 17        | 0.5483... |
        // | 3rd class | child     | women     | yes       | 14        | 0.4516... |
        // | 2nd class | adults    | man       | no        | 154       | 0.9166... |
        // | 2nd class | adults    | man       | yes       | 14        | 0.0833... |
        // | 2nd class | adults    | women     | yes       | 80        | 0.8602... |
        // | 2nd class | adults    | women     | no        | 13        | 0.1397... |
        // | 2nd class | child     | man       | yes       | 11        | 1         |
        // | 2nd class | child     | women     | yes       | 13        | 1         |
        // | 1st class | adults    | man       | no        | 118       | 0.6742... |
        // | 1st class | adults    | man       | yes       | 57        | 0.3257... |
        // | 1st class | adults    | women     | yes       | 140       | 0.9722... |
        // | 1st class | adults    | women     | no        | 4         | 0.0277... |
        // | 1st class | child     | man       | yes       | 5         | 1         |
        // | 1st class | child     | women     | yes       | 1         | 1         |

        // If we want to have an overview of the gender effects on survival we can use the DataFrame.stat module:
        informationsByGroup.groupBy('sex').aggregate(group => group.stat.mean('survival')).rename('aggregation', 'mean').show();
        informationsByGroup.groupBy('sex').aggregate(group => group.stat.sd('survival')).rename('aggregation', 'standard_deviation').show();
        // | sex       | mean      |
        // ------------------------
        // | man       | 0.6       |
        // | women     | 0.6       |

        // | sex       | standa... |
        // ------------------------
        // | man       | 0.3560... |
        // | women     | 0.3517... |

        // Gender effects seem not obvious. What about the age effects on survival ?
        const survivalMeanByAge = informationsByGroup.groupBy('age').aggregate(group => group.stat.mean('survival')).rename('aggregation', 'mean');
        const survivalSDByAge = informationsByGroup.groupBy('age').aggregate(group => group.stat.sd('survival')).rename('aggregation', 'standard_deviation');

        survivalMeanByAge.show();
        survivalSDByAge.show();
        // | age       | mean      |
        // ------------------------
        // | adults    | 0.5       |
        // | child     | 0.75      |

        // | age       | standa... |
        // ------------------------
        // | adults    | 0.3496... |
        // | child     | 0.2951... |

        // Ok that's better.
        // Now, our boss wants a csv export of the age effects, in an exotic format (excel, damn it):
        // |           | adults    | child     |
        // -------------------------------------
        // | mean    | 0.5       | 0.75      |
        // | sd     | 0.3496... | 0.2951... |

        // First we join our results.
        const ageEffect = survivalMeanByAge.innerJoin(survivalSDByAge, 'age');
        ageEffect.show();
        // We now remove age column (you will understand why in few lines) and transpose the table (with columnNames);
        const transposedAgeEffect = ageEffect.drop('age').transpose(true);
        // It's magical, and it looks like that:
        transposedAgeEffect.show();
        // Now we will use the previously removed age column as columnNames.
        // Then we reorganize columns order.
        const transposedAgeEffectWithColumnNames = transposedAgeEffect
            .renameAll([...ageEffect.toArray('age'), ''])
            .restructure(['', 'adults', 'child']); // you can also .select('', 'adults', 'child');
        // Which gives the good table:
        transposedAgeEffectWithColumnNames.show();

        // Now you have just to export it as a csv:
        transposedAgeEffectWithColumnNames.toCSV(true, 'yourReport.csv');
    }
).catch(err => {
    console.log(err);
});
