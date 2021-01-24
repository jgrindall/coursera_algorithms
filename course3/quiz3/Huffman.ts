import * as _ from "lodash";

type Pair = [number, number];

export const getMinPair = (weights:number[]):Pair=>{
    let minIndex1 = -1, minValue1 = Infinity;
    for(let i = 0; i < weights.length; i++){
        if(weights[i] < minValue1){
            minIndex1 = i;
            minValue1 = weights[i];
        }
    }
    let minIndex2 = -1, minValue2 = Infinity;
    for(let i = 0; i < weights.length; i++){
        if(i !== minIndex1 && weights[i] < minValue2){
            minIndex2 = i;
            minValue2 = weights[i];
        }
    }
    return minIndex1 < minIndex2 ? [minIndex1, minIndex2] : [minIndex2, minIndex1];
};

export class Huffman{
    private alphabet:string[] = [];
    private weights:number[] = [];
    constructor(alphabet:string[], weights:number[]){
        this.alphabet = alphabet;
        this.weights = weights;
    }
    generate():string{
        if(this.alphabet.length === 1){
            return this.alphabet[0];
        }
        const indicesToMerge:Pair = getMinPair(this.weights);
        const newWeights:number[] = [];
        const newAlphabet:string[] = [];
        for(let i = 0; i < this.alphabet.length; i++){
            if(i !== indicesToMerge[0] && i !== indicesToMerge[1]){
                newWeights.push(this.weights[i]);
                newAlphabet.push(this.alphabet[i]);
            }
            else if(i === indicesToMerge[0]){
                newWeights.push(this.weights[indicesToMerge[0]] + this.weights[indicesToMerge[1]]);
                newAlphabet.push("-(" + this.alphabet[indicesToMerge[0]] + ")(" + this.alphabet[indicesToMerge[1]] + ")");
            }
        }
        return new Huffman(newAlphabet, newWeights).generate();
    }
}
