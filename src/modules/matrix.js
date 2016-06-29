import { Row } from '../index.js';
import { WrongMatrixStructureError } from '../errors.js';
import { transpose, arrayEqual, iter } from '../reusables.js';

export default class Matrix {

    constructor(dataframe) {
        this.df = dataframe;
        this.name = 'matrix';
    }

    hasSameStruct(df) {
        return arrayEqual(this.df.dim(), df.dim(), true);
    }

    hasTransposedStruct(df) {
        return this.df.dim()[1] === df.dim()[0];
    }

    add(df) {
        if (!this.hasSameStruct(df)) {
            throw new WrongMatrixStructureError(this.df.dim(), df.dim());
        }
        const columns = [...Array(this.df.dim()[1]).keys()];
        return this.df.__newInstance__([...iter(
            Object.keys(this.df.__rows__),
            key => {
                const a = this.df.__rows__[key].toArray();
                const b = df.__rows__[key].toArray();
                return columns.map(column => a[column] + b[column]);
            }
        )], this.df.columns);
    }

    product(number) {
        return this.df.map(row => row.toArray().map(column => column * number));
    }

    dot(df) {
        if (!this.hasTransposedStruct()(df)) {
            throw new WrongMatrixStructureError(this.df.dim()[1], df.dim()[0]);
        }
        const columns = [...Array(this.df.dim()[1]).keys()];
        return this.df.__newInstance__([...iter(
            Object.keys(this.df.__rows__),
            key => {
                const a = this.df.__rows__[key].toArray();
                const b = df.__rows__[key].toArray();
                return columns.map(column => a[column] + b[column]);
            }
        )], this.df.columns);
    }

    transpose() {
        const newColumns = [...Array(this.df.count()).keys()];
        return this.df.__newInstance__(transpose(transpose(Object.values(this.df.toDict()))).map(
            row => new Row(row, newColumns)
        ), newColumns);
    }

}
