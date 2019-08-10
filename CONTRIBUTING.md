# How to contribute

## Getting Started

To start, just make sure you have a GitHub account and read the [code of conduct](https://gmousse.gitbooks.io/dataframe-js/content/CODE_OF_CONDUCT.md).

You can contribute by different ways:

-   create an issue to report a bug, ask questions, suggest a new feature.
-   publish a Pull request in order to submit code changes.
-   contribute to an existing issue or an existing pull request.

## Creating an issue

You can create an issue (https://github.com/Gmousse/dataframe-js/issues) in order to:

-   report a bug.
-   suggest a new feature.
-   ask few questions about the usage.

Just use a predefined template.

**Issues will be closed in case of inactivity after 15 days.**

## Creating pull request

Before creating any kind of pull request, create an [issue](#creating-an-issue) in order to:

-   describe the bug you want to fix
-   describe the feature you want to submit

Just make sure you are following these rules:

-   don't target the master branch
-   respect the style guide (`.prettierrc` and `.eslintrc`).
-   make sure the unit tests are ok.
-   don't make breaking changes.
-   add documentation on new public methods or functions.

You can refer to the [development guide](#development-guide).

**Pull requests will be deleted in case of inactivity after 30 days.**

## Development guide

The project is developped in es2017 and it is transpiled by using babel (for commonjs) then by rollup (for browsers).

To work on the project you must have:

-   nodejs > 8.x.x + npm or yarn or docker + docker-compose.
-   an idle, such as [vscode](https://code.visualstudio.com/) for example.
-   the dependencies installed.

### Install the dependencies

You can install the app and dev dependencies with different ways:

-   via npm, `npm install`.
-   via yarn, `yarn install`.
-   via docker-compose, `docker-compose run --rm test npm install`.

### Launch the unit test

You can launch the unit tests powered by [ava](https://github.com/avajs/ava) with a watcher in order to follow your code changes:

-   via npm, `npm run test:watch`.
-   via yarn, `yarn run test:watch`.
-   via docker-compose, `docker-compose up test`.

If the unit tests are not ok, the continuous integration will failed on your PR.

### Format your code

The project use [prettier](https://github.com/prettier/prettier) in order to format the source code.

The easier way is to have prettier integrated in your idle (e.g. [The vscode intergration](https://github.com/prettier/prettier-vscode)).

If you can't, you can trigger prettier after your code session:

-   via npm, `npm run prettier`.
-   via yarn, `yarn run prettier`.
-   via docker-compose, `docker-compose run --rm test npm run prettier` (but just care about file permissions...).

### Check the linter

The project use [eslint](https://eslint.org/) in order to check the sanity of your code.

The easier way is to have eslint integrated in your idle.

You can also trigger manually the linter:

-   via npm, `npm run lint`.
-   via yarn, `yarn run lint`.
-   via docker-compose, `docker-compose run --rm test npm run lint`.

If the unit tests is not ok, the continuous integration will failed on your PR.
