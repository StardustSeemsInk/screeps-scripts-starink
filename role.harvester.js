const configuration = require('configuration');
const config = new configuration.Config();

const workersBasic = require('workers.basic');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getCapacity == 0) { // 背包空 采矿
            creep.memory.harvesting = true;
        }
        else if(creep.store.getFreeCapacity() == 0) { // 背包满
            creep.memory.harvesting = false;
        }

        
        if(!creep.memory.harvesting) {
            var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS); //找到最近的spawn
            var targets = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            // 为targets按EXTENSION > SPAWN > TOWER的顺序排序
            targets.sort((a, b) => {
                if(a.structureType == STRUCTURE_EXTENSION && b.structureType != STRUCTURE_EXTENSION) {
                    return -1;
                }
                else if(a.structureType != STRUCTURE_EXTENSION && b.structureType == STRUCTURE_EXTENSION) {
                    return 1;
                }
                else if(a.structureType == STRUCTURE_SPAWN && b.structureType == STRUCTURE_TOWER) {
                    return -1;
                }
                else if(a.structureType == STRUCTURE_TOWER && b.structureType == STRUCTURE_SPAWN) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            console.log(targets);
            var restPoints = creep.room.find(FIND_FLAGS, { //找出休息点
                filter: (structure) => {
                    return (structure.name == 'RestPoint');
                }
            });
            if(spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 100) { // spawn 能量未满200
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.memory.resting = false;
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(targets.length > 0) { // 需要维护的建筑数目 > 0
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.memory.resting = false;
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.memory.resting = true;
                creep.moveTo(restPoints[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            workersBasic.workerMine(creep);
        }
	}
};

module.exports = roleHarvester;
