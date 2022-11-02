export class LibraryOfBabel {
    this: any;
    seed: number;
    pageLength: number;
    titleLength: number;
    seededRNG: (min: number, max:number) => number;
    an: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    digs: string = 'abcdefghijklmnopqrstuvwxyz, .aeiouy ';

    constructor (seed=8888, pageLength=3200, titleLength=25) {
        if (typeof seed !== 'number') {
            throw `Expecting an input of type: number, received: ${typeof seed}.`
        }

        this.seed = seed;
        this.pageLength = pageLength;
        this.titleLength = titleLength;
        this.seededRNG = this.seededRNGGenerator(seed);
    }

    /**
     * This function is the corrected form of modulo that can handle negative numbers.
     * See https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
     * @param {number}  numberA     The first number for the modulo calculation.
     * @param {number}  numberB     The second number for the modulo calculation.
     * @returns {number}        Returns the correct value of numberA % numberB.
     */
    modulo = (numberA: number, numberB: number) : number => {
        return ((numberA % numberB) + numberB) % numberB;
    }

    /**
     * This generator function takes a seed number as input and returns a function that fits the following description:
     * Generates a random number between the minimum and maximum provided.
     * @param {number}  [min=0]     Minimum value that can be generated.
     * @param {number}  [max=1]     Maximum value that can be generated.
     * @returns {number}        Randomly generated result between min and max.
     */
    seededRNGGenerator = (seed: number) => {
        if (typeof seed !== 'number') {
            throw `Expecting an input of type: number, received: ${typeof seed}.`
        }

        const newRNGFunction = (min = 0, max = 1) : number => {
            const rngMult = 9301 * seed;
            const rngAdd = 49297 * seed;
            const rngDenom = 233280;

            this.seed = (this.seed * rngMult + rngAdd) % rngDenom;
            const randomFactor = this.seed / rngDenom;
            return min + randomFactor * (max - min);
        }

        return newRNGFunction;
    }

    /**
     * Converts an input string into a numeric has represenatation.
     * @param {string}  string      Input string for conversion.
     * @returns {number}            Numeric hash representation.
     */
    calculateHash = (string: string) : number  => {
        if (typeof string !== 'string') {
            throw `Expecting input to be of type string, received ${typeof string}.`
        }

        let hash = 0;
        if (string.length == 0) return hash;

        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    /**
     * Throws an error if the string passed to it is not of the required format.
     * @param {string} address  Address to validate
     */
    validateAddress = (address: string) : void => {
        if (typeof address !== 'string') {
            throw `Expecting an input of type: string, received: ${typeof address}.`
        } else {
            if (!address.match(/^[\w\d]+:[\d]+:[\d]+:[\d]+:[\d]+$/g)) {
                throw `Input does not match the expected pattern: /^[\w\d]+:[\d]+:[\d]+:[\d]+:[\d]+$/g`
            }
        }
    }

    /**
     * Searches for a given string and returns the location details.
     * @param {string} searchString   The string to search for in the library.
     * @param {string} searchType  Can be 'exact' or 'partial'. Determines if the search results should be an exact match, or partial match.
     * @returns {string}            The address of the entry containing the result.
     */
    search = (searchString: string, searchType: 'exact'|'partial') : string => {
        searchString = searchString.toLowerCase();
        if (typeof searchString !== 'string') {
            throw `Expected a searchString of type 'string', received ${typeof searchString}`
        }

        if (searchType === 'exact') {
            searchString = searchString.padEnd(this.pageLength, ' ');
        } else if (searchType === 'partial') {
            searchString = searchString;
        } else {
            throw `Expected a searchType of 'exact' or 'partial', received ${searchType}`
        }

        // Randomly generate the location of the current book
        // 1 <= wall <= 4
        const wall = ''+parseInt('' + (Math.random() * 3 + 1));
        // 1 <= shelf <= 5
        const shelf = ''+parseInt('' + (Math.random() * 4 + 1));
        // 1 <= volume <= 32
        const volume = (''+parseInt('' + (Math.random() * 31 + 1))).padStart(2, '0');
        // 1 <= page <= 410
        const page = (''+parseInt('' + (Math.random() * 409 + 1))).padStart(3, '0');

        // Add the above together and calculate the hash
        const locHash = this.calculateHash((wall+shelf+volume+page));
        let hex = '';

        // The "depth" (character index on the page) at which the search result is found.
        // Random value between 0 and the total length of the page minus the length of the search string itself.
        // This ensures that the search result "fits" on the page.
        const depth = parseInt('' + (Math.random() * (this.pageLength - searchString.length)));

        // For every character in the page up until the index where we "find" the search result, put in random characters.
        for (let x = 0; x < depth; x++){
            searchString = this.digs[parseInt('' + (Math.random() * this.digs.length))] + searchString;
        }
    
        // We use the location hash to seed our RNG.
        this.seed = Math.abs(locHash);

        for (let i = 0; i < searchString.length; i++){
            const index = this.digs.indexOf(searchString[i]);
            // for each calculated value of the rng, it will be added to the index value and modded to len of an
            const rand = this.seededRNG(0, this.digs.length);
            const newIndex = this.modulo(index + parseInt('' + rand), this.an.length);
            const newChar = this.an[newIndex];
            //hex will be built from the indexes translated into an
            hex += newChar;
        }

        return hex+':'+wall+':'+shelf+':'+parseInt(volume)+':'+parseInt(page)
    }

    /**
     * Gets the contents of a page from the given address.
     * @param {string} address      The full address of a page in the library.
     * @returns {string}            The contents of the page.
     */
    getPage = (address: string) : string => {
        this.validateAddress(address);

        //for each char of hex, it will be turned into the index value in the an string
        const addressArray = address.split(':');
        const hex = addressArray[0];
        const wall = addressArray[1];
        const shelf = addressArray[2];
        const volume = addressArray[3];
        const page = addressArray[4];

        // Calculate the hash of the location8
        const locHash = this.calculateHash(wall + shelf + volume.padStart(2, '0') + page.padStart(3, '0'));

        // The hash is used to seed the RNG
        this.seed = Math.abs(locHash);

        let result = '';
        for (let i = 0; i < hex.length; i++){
        const index = this.an.indexOf(hex[i]);
        // for each calculated value of the rng, it will be subtracted from the index value and modded to len of digs
        const rand = this.seededRNG(0, this.an.length);
        const newIndex = this.modulo(index - parseInt('' + rand), this.digs.length);
        const newChar = this.digs[newIndex];
        // document will be built from the indexes translated into digs
        result += newChar;
        }

        // any leftover space will be filled with random numbers seeded by the hash of the result so far
        this.seed = Math.abs(this.calculateHash(result));
        while (result.length < this.pageLength){
        const index = parseInt('' + this.seededRNG(0, this.digs.length));
        result += this.digs[index];
        }

        return result.substring(result.length - this.pageLength);
    }

    /**
     * Generates the title for a book with a given address
     * @param {string} address  The address string for a given page
     * @returns {string}        The title of the book
     */
    getTitle = (address: string) : string => {
        this.validateAddress(address);

        const addressArray = address.split(':');
        const hex = addressArray[0];
        const wall = addressArray[1];
        const shelf = addressArray[2];
        const volume = addressArray[3];

        // We do +4 here instead of using the title from the address
        // This is because the title is for the whole book, so it shouldn't change with the page number
        const locHash = this.calculateHash(wall + shelf+ volume + 4);

        this.seed = Math.abs(locHash);
        let result = '';

        for (let i = 0; i < hex.length; i++){
        const index = this.an.indexOf(hex[i]);
        const rand = this.seededRNG(0, this.an.length);
        const newIndex = this.modulo(index - parseInt('' + rand), this.digs.length);
        const newChar = this.digs[newIndex];
        result += newChar;
        }

        this.seed = Math.abs(this.calculateHash(result));
        while (result.length < this.titleLength){
        const index = parseInt('' + this.seededRNG(0, this.digs.length));
        result += this.digs[index];
        }

        // return result.substring(result.length - this.titleLength);
        return result.substring(0, this.titleLength);
    }
}