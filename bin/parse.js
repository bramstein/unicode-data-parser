import parser from '../lib/parse.js';

parser.parseFile(process.argv[2], function (err, data) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(data);
    process.exit(0);
  }
});
