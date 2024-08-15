const configuration = require('configuration');
const config = new configuration.Config();

const sources = require('sources');

var basic = {

    init: function() {
        // console.log('basic.js');
        // 初始化房间内的资源
        for(var name in Game.rooms) {
            var room = Game.rooms[name];
            sources.init(room);
        }
    },


    run: function() {
        // console.log('basic.js');

        for(var name in Memory.creeps) { // 释放内存
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    // 根据配置文件生成creep
    generate: function() {
        // 生成creep
        for(var name in Game.spawns) {
            var spawn = Game.spawns[name];
            
            var smallworker = _.filter(Game.creeps, (creep) => creep.memory.type == 'SW');
            var mediumworker = _.filter(Game.creeps, (creep) => creep.memory.type == 'MW');
            var largeworker = _.filter(Game.creeps, (creep) => creep.memory.type == 'LW');
            var soldier = _.filter(Game.creeps, (creep) => creep.memory.type == 'MS');
            var shooter = _.filter(Game.creeps, (creep) => creep.memory.type == 'MSH');
            var claimer = _.filter(Game.creeps, (creep) => creep.memory.type == 'C');
            var healer = _.filter(Game.creeps, (creep) => creep.memory.type == 'H');

            var existingCreepsCount = {
                'SW': smallworker.length,
                'MW': mediumworker.length,
                'LW': largeworker.length,
                'MS': soldier.length,
                'MSH': shooter.length,
                'C': claimer.length,
                'H': healer.length,
            };

            for(let type in config.basicRoomCreepsCount) {
                let body = config.basicRoomCreepsBody[type];
                let role = config.defaultRole;
                switch(type) {
                    case 'MS':
                        role = 'soldier';
                        break;
                    case 'MSH':
                        role = 'shooter';
                        break;
                    case 'C':
                        role = 'claimer';
                        break;
                    case 'H':
                        role = 'healer';
                        break;
                    default:
                        role = config.defaultRole;
                        break;
                }
                if(existingCreepsCount[type] < config.basicRoomCreepsCount[type]) {
                    let newName = type + Game.time;
                    console.log('Spawning new ' + type + ': ' + newName);
                    spawn.spawnCreep(body, newName, {memory: {role: role, type: type}});
                    break;
                }
            }
        }
    }
};

module.exports = basic;