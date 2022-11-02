export {};
const { LibraryOfBabel } = require('../src');

describe('getAddressOptions', () => {
  let instance;

  beforeEach(() => {
    instance = new LibraryOfBabel(88888888);
  });

  it('should return the appropriate keys', () => {
    expect(Object.keys(instance.getAddressOptions()).sort()).toEqual([ 'pages', 'shelves', 'volumes', 'walls']);
  });

  it('should return arrays with sizes that match the class thresholds', () => {
    const { pages, shelves, volumes, walls } = instance.getAddressOptions();
    expect(pages.length).toEqual(instance.maxPages);
    expect(shelves.length).toEqual(instance.maxShelves);
    expect(volumes.length).toEqual(instance.maxVolumes);
    expect(walls.length).toEqual(instance.maxWalls);
  });

});