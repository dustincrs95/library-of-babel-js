export {};
const { LibraryOfBabel } = require('../src/library-of-babel');

const seedA = 69;
const seedB = 70;

const validAddressA = 'abc:1:2:3:4';
const validAddressB = 'abc:1:2:3:7'; // Different page of book in validAddressA
const validAddressC = 'abc:1:2:4:7'; // Different book entirely from validAddressA
const invalidAddress = 'abc:1:2:3s:4';

describe('getTitle', () => {
  let instance;

  beforeEach(() => {
    instance = new LibraryOfBabel(seedA);
  });

  it('should accept a string with the right format as input', () => {
    expect(instance.getTitle(validAddressA)).toBeDefined();
  });

  it('should not accept a string with the incorrect format as input', () => {
    expect(() => instance.getTitle(invalidAddress)).toThrow();
  });

  it('should not accept a number as input', () => {
    expect(() => instance.getTitle(1)).toThrow();
  }); 

  it('should not accept a boolean as input', () => {
    expect(() => instance.getTitle(true)).toThrow();
  });

  it('should not accept an array as input', () => {
    expect(() => instance.getTitle([])).toThrow();
  });

  it('should not accept an object as input', () => {
    expect(() => instance.getTitle({})).toThrow();
  });

  it('should return a string', () => {
    expect(typeof instance.getTitle(validAddressA)).toBe('string');
  });

  it('should return the same string for the same input for the same seed on two different instances', () => {
    const secondInstance = new LibraryOfBabel(seedA);

    expect(instance.getTitle(validAddressA)).toEqual(secondInstance.getTitle(validAddressA));
  });

  it('should return the same string for the same input for the same seed when run again on the same instance', () => {
    expect(instance.getTitle(validAddressA)).toEqual(instance.getTitle(validAddressA));
  });

  it('should return the same string (title) for different inputs for the same seed if the book is the same', () => {
    const secondInstance = new LibraryOfBabel(seedA);

    expect(instance.getTitle(validAddressA)).toEqual(secondInstance.getTitle(validAddressB));
  });

  it('should return different strings for different inputs for the same seed if the book is different', () => {
    const secondInstance = new LibraryOfBabel(seedA);

    expect(instance.getTitle(validAddressA)).not.toEqual(secondInstance.getTitle(validAddressC));
  });

  it('should return different strings for the same input with a different seed', () => {
    const secondInstance = new LibraryOfBabel(seedB);

    expect(instance.getTitle(validAddressA)).not.toEqual(secondInstance.getTitle(validAddressA));
  });

  it('should return different strings for different inputs with a different seed', () => {
    const secondInstance = new LibraryOfBabel(seedB);

    expect(instance.getTitle(validAddressA)).not.toEqual(secondInstance.getTitle(validAddressB));
  });

});