## API Reference

 ### [DataFrame](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html)


Dataframe conversion:
  [.toDict()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#toDict),
  [.toArray()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#toArray),
  [.toCollection()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#toCollection),
  [.toText()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#toText),
  [.toCSV()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#toCSV),
  [.toJSON()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#toJSON)

DataFrame exploration:
  [.show()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#show),
  [.dim()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#dim),
  [.count()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#count),
  [.listColumns()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#listColumns)

Columns manipulation:
  [.select()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#select),
  [.withColumn()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#withColumn),
  [.countValue()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#countValue),
  [.distinct()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#distinct),
  [.unique()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#unique),
  [.restructure()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#restructure),
  [.rename()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#rename),
  [.renameAll()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#renameAll),
  [.cast()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#cast),
  [.castAll()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#castAll),
  [.drop()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#drop),
  [.groupBy()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#groupBy),
  [.sortBy()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#sortBy),
  [.join()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#join),
  [.innerJoin()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#innerJoin),
  [.outerJoin()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#outerJoin),
  [.fullJoin()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#fullJoin),
  [.leftJoin()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#leftJoin),
  [.rightJoin()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#rightJoin)

Rows manipulation:
  [.transpose()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#transpose),
  [.push()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#push),
  [.replace()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#replace),
  [.chain()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#chain),
  [.map()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#map),
  [.filter()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#filter),
  [.where()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#where),
  [.find()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#find),
  [.reduce()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#reduce),
  [.reduceRight()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#reduceRight),
  [.dropDuplicates()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#dropDuplicates),
  [.shuffle()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#shuffle),
  [.sample()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#sample),
  [.union()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html#union)

### [Row](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html)
  [.get()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#get),
  [.set()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#set),
  [.select()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#select),
  [.delete()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#delete),
  [.has()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#has),
  [.toDict()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#todict),
  [.toArray()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/row.html#toarray)


### [GroupedDataFrame](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html)
  [.toCollection()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#toCollection),
  [.show()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#show),
  [.listGroups()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#listGroups),
  [.listHashs()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#listHashs),
  [.aggregate()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#aggregate),
  [.pivot()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#pivot),
  [.melt()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/groupedDataframe.html#melt),


###     [Stat](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html)  

[.min()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#min),
  [.max()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#max),
  [.sum()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#sum),
  [.mean()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#mean),
  [.average()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#average),
  [.var()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#var),
  [.sd()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#sd),
  [.stats()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/stat.html#stats)


### [Matrix](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/matrix.html)
  [.isCommutative()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/matrix.html#isCommutative),
  [.product()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/matrix.html#product),
  [.dot()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/matrix.html#dot),
  [.add()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/matrix.html#add)

### [SQL](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html)
 [.register()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#register),
  [.registerTable()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#registerTable),
  [.request()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#request),
  [.listTables()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#listTables),
  [.dropTable()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#dropTable),
  [.dropTables()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#dropTables),
  [.renameTable()](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/modules/sql.html#renameTable)
