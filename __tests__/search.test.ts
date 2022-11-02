export {};
const { LibraryOfBabel } = require('../src');

const seedA = 69;
const seedB = 70;

const validSearchString = 'some string to search by';


describe('search', () => {
  let instanceA;
  let instanceB;

  beforeEach(() => {
    instanceA = new LibraryOfBabel(seedA);
  });

  it('should accept a string with the right format as input', () => {
      expect(() => instanceA.search(validSearchString, 'exact')).not.toThrow();
  });

  it('should not accept a number as input', () => {
    expect(() => instanceA.search(1, 'exact')).toThrow();
  }); 

  it('should not accept a boolean as input', () => {
    expect(() => instanceA.search(true, 'exact')).toThrow();
  });

  it('should not accept an array as input', () => {
    expect(() => instanceA.search([], 'exact')).toThrow();
  });

  it('should not accept an object as input', () => {
    expect(() => instanceA.search({}, 'exact')).toThrow();
  });

  it('should return a string', () => {
      expect(typeof instanceA.search(validSearchString, 'exact')).toEqual('string');
  });

  it('should return the same string from getPage for the same input for the same seed on two different instances', () => {
    instanceB = new LibraryOfBabel(seedA);
    const resultA = instanceA.search(validSearchString, 'exact');
    const resultB = instanceB.search(validSearchString, 'exact');

    expect(instanceA.getPage(resultA)).toEqual(instanceB.getPage(resultB));
  });

  it('should return the same string from getPage for the same input for the same seed when run again on the same instance', () => {
    const resultA = instanceA.search(validSearchString, 'exact');
    const resultB = instanceA.search(validSearchString, 'exact');
    expect(instanceA.getPage(resultA)).toEqual(instanceA.getPage(resultB));
  });

  it('should return different strings from getPage for different inputs for the same seed', () => {
    instanceB = new LibraryOfBabel(seedA);
    const resultA = instanceA.search(validSearchString, 'exact');
    const resultB = instanceB.search('Some second different input', 'exact');

    expect(instanceA.getPage(resultA)).not.toEqual(instanceB.getPage(resultB));

  });

  it('should return the same string from for the same input with a different seed', () => {
    instanceB = new LibraryOfBabel(seedB);
    const resultA = instanceA.search(validSearchString, 'exact');
    const resultB = instanceB.search(validSearchString, 'exact');

    expect(instanceA.getPage(resultA)).toEqual(instanceB.getPage(resultB));
  });

  it('should return different strings from getPage for different inputs with a different seed', () => {
    instanceB = new LibraryOfBabel(seedB);
    const resultA = instanceA.search(validSearchString, 'exact');
    const resultB = instanceB.search('Some second different input', 'exact');

    expect(instanceA.getPage(resultA)).not.toEqual(instanceB.getPage(resultB));
  });

});