const fork = require('child_process').fork;

const myArgs = process.argv.slice(2);
const folder = myArgs[0].split("=")[1];
const child = fork('./dist/' + folder + '/app');