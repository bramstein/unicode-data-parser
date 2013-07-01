## Unicode Data parser

This is a simple utility to parse the data files provided by the Unicode Consortium.

## Installation

    $ npm install unicode-data-parser

## Usage

You can either use the supplied binary which will output a JSON representation of the data, or include the parser directly into your code:

    $ unicode-data-parser LineBreak.txt

or:

    var parser = require('unicode-data-parser');

    parser.parseFile('LineBreak.txt', function (err, data) {
      // Do something with `data`
    });

## License

The Unicode Data parser utility is licensed under the new BSD license.
