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

    hasSameTransposedStruct(df) {
        return arrayEqual(this.df.dim(), df.dim().reverse(), true);
    }

    add(df) {
        if (!this.hasSameStruct(df)) {
            throw new WrongMatrixStructureError(this.df.dim(), df.dim());
        }
        const columns = [...Array(this.df.dim()[1]).keys()];
        return this.df.__newInstance__([...iter(
            Object.keys(this.df.__rows__),
            rowKey => {
                const a = this.df.__rows__[rowKey].toArray();
                const b = df.__rows__[rowKey].toArray();
                return columns.map(column => a[column] + b[column]);
            }
        )], this.df.columns);
    }

    product(number) {
        return this.df.map(row => row.toArray().map(column => column * number));
    }

    dot(df) {
        if (!this.hasSameTransposedStruct(df)) {
            throw new WrongMatrixStructureError(this.df.dim(), df.dim().reverse());
        }
        const transposedDF = df.matrix.transpose();
        const columns = [...Array(this.df.dim()[0]).keys()];
        return this.df.__newInstance__([...iter(
            Object.keys(this.df.__rows__),
            rowKey => {
                const a = this.df.__rows__[rowKey].toArray();
                return [...iter(
                    columns,
                    column => {
                        const b = transposedDF.__rows__[column].toArray();
                        return Object.keys(b).reduce((p, n) => p + b[n] * a[n], 0);
                    }
                )];
            }
        )], columns);
    }

    transpose() {
        const newColumns = [...Array(this.df.count()).keys()];
        return this.df.__newInstance__(transpose(transpose(Object.values(this.df.toDict()))).map(
            row => new Row(row, newColumns)
        ), newColumns);
    }

}
