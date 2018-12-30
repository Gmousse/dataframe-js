import babel from "rollup-plugin-babel";

export default {
    input: "./src/index.js",
    output: {
        file: "./build/dataframe.js",
        name: "dfjs",
        format: "umd"
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        })
    ]
};
