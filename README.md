# The Library of Babel (.ts)

[![GitHub stars](https://img.shields.io/github/stars/hiddenbiscuit/library-of-babel-js)](https://github.com/hiddenbiscuit/library-of-babel-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/hiddenbiscuit/library-of-babel-js)](https://github.com/hiddenbiscuit/library-of-babel-js/network)
[![npm (scoped)](https://img.shields.io/npm/v/@hiddenbiscuit/library-of-babel)](https://github.com/hiddenbiscuit/library-of-babel-js)

**Disclaimer: This was a project I started for my personal entertainment and education. I have taken steps to make sure that it functions as expected, but I am not all-knowing. Use at your own risk!**

This is a TS package I wrote whilst studying, and trying to replicate, the algorithm behind the [Library of Babel](https://libraryofbabel.info/) website. The original creator, [librarianofbabel](https://github.com/librarianofbabel), explains the approach and I followed [this implementation](https://github.com/cakenggt/Library-Of-Pybel/tree/gh-pages) very closely.

# Install

```
npm i --save @nitsudgo/library-of-babel
```

# Usage

## Before you begin
If you aren't familiar with how the Library of Babel works (from the short story), then this whole repo may not make much sense. I highly suggest you [give it a read](https://maskofreason.files.wordpress.com/2011/02/the-library-of-babel-by-jorge-luis-borges.pdf). The documentation will assume you have some knowledge of the concepts.

## Instancing
This package exports a `LibraryOfBabel` class. First, you must import the package and create a new instance. Here, you may pass in any number to use as a seed. If no seed is given, a default value of `8888` will be used.

*Instances that have different seeds will **not** have reproducible results between them.*

```ts
const { LibraryOfBabel } = require('library-of-babel');

// If constructor is left blank, a default seed of 8888 is used
const LoB = new LibraryOfBabel(69);
```

## `search`
The search function will look for either a partial or exact match of a given string in the library and return the `address` of the page that the search result is in.
``` ts
const searchString = 'some string to search for';

// Exact search looks for PRECISELY the string you have given
const exactSearchResult = LoB.search(searchString, 'exact');

// Partial search simply finds a page where your string appears in the content, regardless of where in the content it is located
const partialSearchResult = LoB.search(searchString, 'partial');
```

## `getPage`
The getPage function accepts an `address` and returns the content of that particular page.
``` ts
const pageContent = LoB.getPage(exactSearchResult);
```

## `getTitle`
The getTitle function accepts an `address` and returns the title of the volume (book). Different pages *within the same volume* will give the same result.
``` ts
const pageTitle = LoB.getTitle(exactSearchResult);
```

# Development
To play with the code, simply `clone` this Git repo to your machine, `cd` into the project directory root, and run the following:
```
npm i
```

### Tests
I've included some test suites in the `/__tests__` directory. To run them, simply enter the following command in the terminal.
```
npm run test
```

### Contributing
To contribute, simply checkout to your own branch, push your commits to that branch, and then raise a pull request!

I hope you enjoy the package!