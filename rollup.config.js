import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "./src/index.js",
    output: {
        file: "./build/dataframe.js",
        name: "dfjs",
        format: "umd"
    },
    plugins: [
        resolve(),
        commonjs({
            include: "node_modules/**"
        }),
        babel({
            exclude: "node_modules/**"
        })
    ]
};
