var fs = require('fs'),
    CharacterSet = require('CharacterSet');

function parseLines(lines, callback) {
  var data = lines.filter(function (line) {
    return line.charAt(0) !== '#' && line.trim().length !== 0;
  }).map(function (line) {
    var data = /([0-9A-F]{4,6})(?:(?:..)([0-9A-F]{4,6}))?\s+;\s+([^#]+)/i.exec(line),
        result = {
          codePoints: null,
          name: 'Unknown',
        };

    if (data[1] !== undefined && data[2] !== undefined) {
      result.codePoints = new CharacterSet([[parseInt(data[1], 16), parseInt(data[2], 16)]]);
    } else if (data[1] !== undefined) {
      result.codePoints = new CharacterSet([parseInt(data[1], 16)]);
    }

    if (data[3]) {
      result.name = data[3];
    }

    return result;
  });

  var result = {};

  data.forEach(function (item) {
    if (!result.hasOwnProperty(item.name)) {
      result[item.name] = new CharacterSet();
    }
    result[item.name] = result[item.name].union(item.codePoints);
  });

  callback(null, result);
}

module.exports = {
  parseFile: function (filename, callback) {
    fs.readFile(filename, function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        parseLines(data.toString().split(/\n/), callback);
      }
    });
  }
};
