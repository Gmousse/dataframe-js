import { DataFrame } from './src/index.js';
import NeuralNetwork from './src/modules/neuralNetwork.js';


const df = new DataFrame(
    [
        [1, 0, 1, 1],
        [0, 0, 1, 1],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
    ], ['c1', 'c2', 'c3', 'label'], NeuralNetwork
)

df.neuralnet.init('label')
