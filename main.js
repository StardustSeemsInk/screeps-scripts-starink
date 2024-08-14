// creep自杀 释放内存 + 保证至少2个
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWorker = require('role.worker');

module.exports.loop = function () {

    for(var name in Memory.creeps) { // 释放内存
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    //console.log('Harvesters: ' + harvesters.length);
    var controller_level = Game.spawns['Spawn1'].room.controller.level; // 查看控制器等级
    //console.log('controller:' + Game.spawns['Spawn1'].room.controller.level)


    // harvester少于3的时候生产harvester
    if(harvesters.length < 3) { 
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});  // 指定role属性
    }

    // harvester等于2的时候生产 upgrader
    if(harvesters.length == 3 && upgraders.length < 3) { 
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});  // 指定role属性
    }
    
    // 生产builder
    if(controller_level >= 2 && builders.length < 3){
        var nameBuilder = 'Builder' + Game.time;
        console.log('Spawing new builder:' + nameBuilder);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], nameBuilder, 
            {memory:{role: 'builder'}});
        // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], nameBuilder, 
        //     {memory:{role: 'builder'}});
    }

    // 生产worker
    if(controller_level >= 2 && workers.length < 2){
        var nameWorker = 'Worker' + Game.time;
        console.log('Spawing new worker:' + nameWorker);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], nameWorker, 
            {memory:{role: 'worker'}});
    }

    if(Game.spawns['Spawn1'].spawning) { // 孵化过程可视化
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

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
    }
}
