export {};
const { LibraryOfBabel } = require('../src/library-of-babel');

let instanceA;
let instanceB;

const seedA = 69;
const seedB = 70;

const calculateHashInputA = 'some test string!'
const calculateHashInputB = 'some other test string!'

const seededRNGMin = 0;
const seededRNGMax = 1;

describe('LibraryOfBabel class', () => {
    beforeEach(() => {
        instanceA = new LibraryOfBabel(seedA);
      });
        
    it('should initialize with a default seed if no seed is provided', () => {
        const newInstance = new LibraryOfBabel();
        expect(newInstance.seed).toEqual(8888);
    });

    it('should initialize with the seed, if it is provided', () => {
        expect(instanceA.seed).toEqual(seedA);
    });

    it('should not initialize if the provided seed is not a number', () => {
        expect(() => new LibraryOfBabel('some string')).toThrow();
    });
});

describe('LibraryOfBabel validateAddress helper', () => {
    beforeEach(() => {
        instanceA = new LibraryOfBabel(seedA);
      });
        
    it('should not throw an error if the input string is of the correct format', () => {
        expect(() => instanceA.validateAddress('a:1:2:3:4')).not.toThrow();
    });
        
    it('should throw an error if the input string is of the incorrect format', () => {
        expect(() => instanceA.validateAddress('a:1:2:3:4s')).toThrow();
    });
});

describe('LibraryOfBabel calculateHash helper', () => {
    beforeEach(() => {
        instanceA = new LibraryOfBabel(seedA);
      });

    it('should accept a string as input', () => {
        expect(() => instanceA.calculateHash(calculateHashInputA)).not.toThrow();
    });

    it('should not accept a number as input', () => {
        expect(() => instanceA.calculateHash(1)).toThrow();
    });

    it('should not accept a boolean as input', () => {
        expect(() => instanceA.calculateHash(false)).toThrow();
    });

    it('should not accept an array as input', () => {
        expect(() => instanceA.calculateHash([])).toThrow();
    });

    it('should not accept an object as input', () => {
        expect(() => instanceA.calculateHash({})).toThrow();
    });

    it('should return the same value for the same input regardless of seed', () => {
        instanceB = new LibraryOfBabel(seedB);
        expect(instanceA.calculateHash(calculateHashInputA)).toEqual(instanceB.calculateHash(calculateHashInputA));
    });

    it('should return the same value for the same input when ran again', () => {
        expect(instanceA.calculateHash(calculateHashInputA)).toEqual(instanceA.calculateHash(calculateHashInputA));
    });

    it('should return different values for different inputs', () => {
        expect(instanceA.calculateHash(calculateHashInputA)).not.toEqual(instanceA.calculateHash(calculateHashInputB));
    });
    
});

describe('LibraryOfBabel seededRNG helper', () => {
    beforeEach(() => {
        instanceA = new LibraryOfBabel(seedA);
      });

    it('the generator function should accept a number as input for the seed', () => {
        expect(() => instanceA.seededRNGGenerator(1)).not.toThrow();
    });

    it('the generator function should not accept a string as input for the seed', () => {
        expect(() => instanceA.seededRNGGenerator('some string')).toThrow();
    });

    it('the generator function should not accept a boolean as input for the seed', () => {
        expect(() => instanceA.seededRNGGenerator(false)).toThrow();
    });

    it('the generator function should not accept an array as input for the seed', () => {
        expect(() => instanceA.seededRNGGenerator([])).toThrow();
    });

    it('the generator function should not accept an object as input for the seed', () => {
        expect(() => instanceA.seededRNGGenerator({})).toThrow();
    });

    it('should generate a sequence of unique values when called repeatedly with the same params', () => {
        const resultSequence = [...Array(10).keys()].map(k => instanceA.seededRNG(seededRNGMin, seededRNGMax));
        const areAllArrayValuesUnique = (array: Array<number>) : boolean => Array.isArray(array) && new Set(array).size === array.length;

        expect(areAllArrayValuesUnique(resultSequence)).toEqual(true);
    });

    it('should generate the same sequence of values for the same function params and same seed passed to the LibraryOfBabel class', () => {
        instanceB = new LibraryOfBabel(seedA);

        const resultSequenceA = [...Array(10).keys()].map(k => instanceA.seededRNG(seededRNGMin, seededRNGMax));
        const resultSequenceB = [...Array(10).keys()].map(k => instanceB.seededRNG(seededRNGMin, seededRNGMax));

        expect(resultSequenceA).toEqual(resultSequenceB);
    });

    it('should generate a different sequence of values for the same function params but different seed passed to the LibraryOfBabel class', () => {
        instanceB = new LibraryOfBabel(seedB);

        const resultSequenceA = [...Array(10).keys()].map(k => instanceA.seededRNG(seededRNGMin, seededRNGMax));
        const resultSequenceB = [...Array(10).keys()].map(k => instanceB.seededRNG(seededRNGMin, seededRNGMax));

        expect(resultSequenceA).not.toEqual(resultSequenceB);
    });
});