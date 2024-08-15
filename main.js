const basic = require('basic');
const roles = require('roles');
const flags = require('flags');
const spawns = require('spawns');
const towers = require('towers');

// init
basic.init();
// main loop
module.exports.loop = function () {

    basic.run();

    basic.generate();

    roles.run();

    flags.run();

    spawns.run();

    towers.run();
}
