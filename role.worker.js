const configuration = require('configuration');
const config = new configuration.Config();

const workersBasic = require('workers.basic');

var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
            creep.memory.building = false;  // 变为 非building状态
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
	        creep.memory.building = true;  // 变为 building状态
	        creep.say('✨ work');
	    }

	    if(creep.memory.building) {  // building状态的时候
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
			var restPoints = creep.room.find(FIND_FLAGS, { //找出休息点
                filter: (structure) => {
                    return (structure.name == 'RestPoint');
                }
            });
            if(closestDamagedStructure) {
                creep.memory.resting = false;
                creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.repair(closestDamagedStructure);
            }
			else{
                creep.memory.resting = true;
				creep.moveTo(restPoints[0], {visualizePathStyle: {stroke: '#ffffff'}});
			}
	    }
	    else {  // 非building状态的时候， 到最近的source旁边并采集
	        workersBasic.workerMine(creep);
	    }
	}
};

module.exports = roleWorker;