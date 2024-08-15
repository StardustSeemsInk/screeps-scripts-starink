const configuration = require('configuration');
const config = new configuration.Config();

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
            if(creep.memory.renewing && creep.ticksToLive > 200) {
                creep.memory.renewing = false;
            }
            if(creep.ticksToLive < 60 && creep.memory.role != 'soldier' && creep.memory.role != 'claimer' && creep.memory.role != 'healer' && config.ifRenew) {
                creep.memory.renewing = true;
                creep.say('🔄 renew');
                if(config.ifRenew) {
                    if(creep.transfer(creep.pos.findClosestByRange(FIND_MY_SPAWNS), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.pos.findClosestByRange(FIND_MY_SPAWNS));
                    }
                }
                else{
                    creep.moveTo(creep.pos.findClosestByRange(FIND_MY_SPAWNS));

                }
            }
            if(creep.memory.role == 'harvester' && !creep.memory.renewing) {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader' && !creep.memory.renewing) {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder' && !creep.memory.renewing) {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'worker' && !creep.memory.renewing) {
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