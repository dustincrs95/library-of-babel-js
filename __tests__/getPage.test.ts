export {};
const { LibraryOfBabel } = require('../src');

const seedA = 69;
const seedB = 70;

const validAddressA = 'WFIOWJFAODI2412:1:2:3:4';
const validAddressB = 'AIJWIF2:1:2:3:7';
const invalidAddress = 'abc:1:2:3s:4';

describe('getPage', () => {
  let instance;

  beforeEach(() => {
    instance = new LibraryOfBabel(seedA);
  });

  it('should accept a string with the right format as input', () => {
    expect(instance.getPage(validAddressA)).toBeDefined();
  });

  it('should not accept a string with the incorrect format as input', () => {
    expect(() => instance.getPage(invalidAddress)).toThrow();
  });

  it('should not accept a number as input', () => {
    expect(() => instance.getPage(1)).toThrow();
  }); 

  it('should not accept a boolean as input', () => {
    expect(() => instance.getPage(true)).toThrow();
  });

  it('should not accept an array as input', () => {
    expect(() => instance.getPage([])).toThrow();
  });

  it('should not accept an object as input', () => {
    expect(() => instance.getPage({})).toThrow();
  });

  it('should return a string', () => {
    expect(typeof instance.getPage(validAddressA)).toBe('string');
  });

  it('should return the same string for the same input for the same seed on two different instances', () => {
    const secondInstance = new LibraryOfBabel(seedA);

    expect(instance.getPage(validAddressA)).toEqual(secondInstance.getPage(validAddressA));
  });

  it('should return the same string for the same input for the same seed when run again on the same instance', () => {
    expect(instance.getPage(validAddressA)).toEqual(instance.getPage(validAddressA));
  });

  it('should return different strings for different inputs for the same seed', () => {
    const secondInstance = new LibraryOfBabel(seedA);

    expect(instance.getPage(validAddressA)).not.toEqual(secondInstance.getPage(validAddressB));
  });

  it('should return different strings for the same input with a different seed', () => {
    const secondInstance = new LibraryOfBabel(seedB);

    expect(instance.getPage(validAddressA)).not.toEqual(secondInstance.getPage(validAddressA));
  });

  it('should return different strings for different inputs with a different seed', () => {
    const secondInstance = new LibraryOfBabel(seedB);

    expect(instance.getPage(validAddressA)).not.toEqual(secondInstance.getPage(validAddressB));
  });

});