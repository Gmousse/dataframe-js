import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

export default {
    input: "./src/index.js",
    output: {
        exports: "named",
        file:
            process.env.NODE_ENV === "production"
                ? "./dist/dataframe.min.js"
                : "./dist/dataframe.js",
        name: "dfjs",
        format: "iife"
    },
    plugins: [
        resolve(),
        commonjs({
            include: "node_modules/**"
        }),
        babel({
            exclude: "node_modules/**"
        })
    ].concat(process.env.NODE_ENV === "production" ? [uglify()] : [])
};
