var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) { // 背包未满 采矿
	        var closestSource = creep.pos.findClosestByRange(FIND_SOURCES); // 找到最近的矿
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            var restPoints = creep.room.find(FIND_FLAGS, { //找出休息点
                filter: (structure) => {
                    return (structure.name == 'RestPoint');
                }
            });
            if(targets.length > 0) { // 需要维护的建筑数目 > 0
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
	}
};

module.exports = roleHarvester;
