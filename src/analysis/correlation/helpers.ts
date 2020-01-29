
type Permutation = Array<number>;

type Permutations = Array<Permutation>;

export const createAllBinaryPermutationsForSequenceLength = (
    length: number
): Permutations => {

    const permutations: Permutations = [];

    const startValue = Math.pow(2, length) - 1;
    for (let i = startValue; i >= 0; i--) {
        const binaryValue = i.toString(2).padStart(length, '0');
        const components = binaryValue.split('');
        const numberPermutation = components.map<number>(n => parseInt(n, 10));
        permutations.push(numberPermutation);
    }

    return permutations;
};