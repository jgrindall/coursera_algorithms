const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const myArgs = process.argv.slice(2);
const folder = myArgs[0].split("=")[1];
const file = "dist/" + folder + "/test/main.js";

const mocha = new Mocha();

mocha.addFile(file);

mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});
