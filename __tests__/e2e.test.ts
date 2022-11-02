export {};
const { LibraryOfBabel } = require('../src');

let instanceA1;
let instanceA2;
let instanceB;
const seedA = 69;
const seedB = 70;

const searchString = 'Something to Search For'

describe('integration', () => {
    beforeEach(() => {
        instanceA1 = new LibraryOfBabel(seedA);
        instanceA2 = new LibraryOfBabel(seedA);
      });

    it('should be consistent across different instances of the same seed', () => {
        const searchResultAddress = instanceA1.search(searchString, 'exact');
        const searchResultContent = instanceA1.getPage(searchResultAddress);
        const searchResultContentOnOtherInstanceWithSameSeed = instanceA2.getPage(searchResultAddress);

        expect(searchResultContentOnOtherInstanceWithSameSeed).toEqual(searchResultContent);
    });

    it('should be consistent across different instances of the same seed', () => {
        const searchResultAddress = instanceA1.search(searchString, 'partial');
        const searchResultContent = instanceA1.getPage(searchResultAddress);
        const searchResultContentOnOtherInstanceWithSameSeed = instanceA2.getPage(searchResultAddress);

        expect(searchResultContentOnOtherInstanceWithSameSeed).toEqual(searchResultContent);
    });

    it('should be different across different instances having different seeds', () => {
        instanceB = new LibraryOfBabel(seedB);

        const searchResultAddress = instanceA1.search(searchString, 'partial');
        const searchResultContent = instanceA1.getPage(searchResultAddress);
        const searchResultContentOnOtherInstanceWithSameSeed = instanceB.getPage(searchResultAddress);

        expect(searchResultContentOnOtherInstanceWithSameSeed).not.toEqual(searchResultContent);
    });
});