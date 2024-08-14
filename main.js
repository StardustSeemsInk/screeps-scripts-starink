// creep自杀 释放内存 + 保证至少2个
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWorker = require('role.worker');

var roleSoldier = require('role.soldier');

var flagRest = require('flag.rest');

module.exports.loop = function () {

    for(var name in Memory.creeps) { // 释放内存
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var controller_level = Game.spawns['Spawn1'].room.controller.level; // 查看控制器等级

    var smallWorkers = _.filter(Game.creeps, (creep) => creep.memory.type == 'SW');
    var mediumWorkers = _.filter(Game.creeps, (creep) => creep.memory.type == 'MW');
    var largeWorkers = _.filter(Game.creeps, (creep) => creep.memory.type == 'LW');

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');

    var role2spawn = 'harvester'; // 默认生成harvester
    if(harvesters.length < 2) { // 保证至少2个
        var role2spawn = 'harvester';
    }
    else if(upgraders.length < 2) {
        var role2spawn = 'upgrader';
    }
    else if(builders.length < 2) {
        var role2spawn = 'builder';
    }
    else if(workers.length < 2) {
        var role2spawn = 'worker';
    }

    // spawn
    // small workers
    if(smallWorkers.length < 1) { 
        var newName = 'SW' + Game.time;
        console.log('Spawning new small worker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: role2spawn, type: 'SW'}});  // 指定role属性
    }

    // mid workers
    if(controller_level >= 2 && mediumWorkers.length < 6) {
        var newName = 'MW' + Game.time;
        console.log('Spawning new medium worker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: role2spawn, type: 'MW'}});  // 指定role属性
    }

    // large workers
    if(largeWorkers.length < 2) {
        var newName = 'LW' + Game.time;
        console.log('Spawning new large worker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: role2spawn, type: 'LW'}});  // 指定role属性
    }

    // mid soldiers
    if(workers.length >= 5 && soldiers.length < 2) {
        var newName = 'MS' + Game.time;
        console.log('Spawning new medium soldier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'soldier', type: 'MS'}});  // 指定role属性
    }

    //console.log('Harvesters: ' + harvesters.length);
    //console.log('controller:' + Game.spawns['Spawn1'].room.controller.level)

    if(Game.spawns['Spawn1'].spawning) { // 孵化过程可视化
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role + ' ' + spawningCreep.memory.type,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else{ // 未孵化时显示各个角色数量
        Game.spawns['Spawn1'].room.visual.text(
            '📦' + harvesters.length,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y - 1,
            {align: 'left', opacity: 0.8}
        );
        Game.spawns['Spawn1'].room.visual.text(
            '⚒️' + builders.length,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
        );
        Game.spawns['Spawn1'].room.visual.text(
            '⚡' + upgraders.length,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y + 1,
            {align: 'left', opacity: 0.8}
        );
        Game.spawns['Spawn1'].room.visual.text(
            '🧐' + workers.length,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y + 2,
            {align: 'left', opacity: 0.8}
        );
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
        if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
    }

    for(var name in Game.flags) {
        var flag = Game.flags[name];
        if(flag.name == 'RestPoint') {
            flagRest.run(flag);
        }
    }
}
