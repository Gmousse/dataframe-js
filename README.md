# dataframe-js

![](https://travis-ci.org/Gmousse/dataframe-js.svg?branch=develop)
![](https://coveralls.io/repos/github/Gmousse/dataframe-js/badge.svg?branch=master)

**Official Documentation**: <https://gmousse.gitbooks.io/dataframe-js/>

**Current Version**: [1.3.2](https://gmousse.gitbooks.io/dataframe-js/content/CHANGELOG.html)

A ton of new features is available in 1.3.0 !! Look at the [1.3.0](https://gmousse.gitbooks.io/dataframe-js/content/CHANGELOG.html) changelog !!

**Compatibility**:

-   Browsers (IE > 8, Edge, Firefox, Chrome...)
-   NodeJS 0.10, 0.11, 0.12, 4.x.x, 5.x.x, 6.x.x, 8.x.x

**License**: MIT

## Presentation

DataFrame-js provides an immutable data structure for javascript and datascience, the DataFrame, which allows to work on rows and columns with a sql and functional programming inspired api.

With the DataFrame, you can easily do a ton of complex stuff such as join, groupby, exploration tasks, machine learning...

It's mainly designed to work on server-side (with node) but it also works in the browser (without file system related features).

Example:

```javascript
import DataFrame from "dataframe-js";
import { data, columns } from "./titanic_data.js";
const df = new DataFrame(data, columns);
const filteredDf = df
    .filter(row => row.get("survived") === "yes")
    .select("class", "age", "sex");
filteredDf.show(3);
```

```
| class       | age        | sex        |
----------------------------------------
| 1st class   | adults     | man        |
| 1st class   | adults     | man        |
| 1st class   | adults     | woman      |
```

## Installation

via git: `npm install git+https://github.com/Gmousse/dataframe-js.git`

via npm: `npm install dataframe-js`

via yarn: `yarn add dataframe-js`

in the browser:

-   not minified: `<script src="https://cdn.rawgit.com/Gmousse/dataframe-js/master/dist/dataframe.js"></script>`
-   minified (production): `<script src="https://cdn.rawgit.com/Gmousse/dataframe-js/master/dist/dataframe-min.js"></script>`

## Usage

[Basic Usage](https://gmousse.gitbooks.io/dataframe-js/content/doc/BASIC_USAGE.html)

[Advanced Usage](https://gmousse.gitbooks.io/dataframe-js/content/doc/ADVANCED_USAGE.html)

[API Reference](https://gmousse.gitbooks.io/dataframe-js/content/doc/api/dataframe.html)

## Contribution

[How to contribute ?](https://gmousse.gitbooks.io/dataframe-js/content/CONTRIBUTING.html)
