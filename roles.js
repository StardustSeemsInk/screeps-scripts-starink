var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWorker = require('role.worker');

var roleSoldier = require('role.soldier');
var roleClaimer = require('role.claimer');
var roleHealer = require('role.healer');

var roles = {

    run: function() {
        // console.log('workers.js');

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
            if(creep.memory.role == 'soldier') {
                roleSoldier.run(creep);
            }
            if(creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
            if(creep.memory.role == 'healer') {
                roleHealer.run(creep);
            }
        }
    }
};

module.exports = roles;