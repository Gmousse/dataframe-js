import { Row } from '../index.js';

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function sigmoïd(x, d = false) {
    return d ? x * (1 - x) : 1 / (1 + Math.exp(-x));
}

export default class NeuralNetwork {
    constructor(dataframe) {
        this.df = dataframe;
        this.name = 'neuralnet';
    }

    init(labelColumn) {
        const inputs = this.df.columns.filter(column => column !== labelColumn);
        let synapse0 = new Row(inputs.map(weight => random(-1, 1)), inputs);
        // [.array]
        this.df.__rows__.forEach(layer0 => {
            const layer1 = sigmoïd(inputs.map(
                input => layer0.get(input) * synapse0.get(input)
            ).reduce((n, p) => n + p, 0));
            const delta = (layer0.get(labelColumn) - layer1) * sigmoïd(layer1, true);
            synapse0 = new Row(synapse0.toArray().map(weight => weight + (layer0.get(labelColumn) * delta)), inputs);
        })

        console.log(synapse0);
    }
}
