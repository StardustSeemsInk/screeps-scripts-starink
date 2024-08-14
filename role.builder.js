var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
            creep.memory.building = false;  // 变为 非building状态
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
	        creep.memory.building = true;  // 变为 building状态
	        creep.say('🚧 build');
	    }

		var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
	    if(creep.memory.building) {  // building状态的时候
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // 寻找建筑位
			var restPoints = creep.room.find(FIND_FLAGS, { //找出休息点
                filter: (structure) => {
                    return (structure.name == 'RestPoint');
                }
            });
            if(targets.length) {  // targets.length > 0  || 建筑位 > 0
				creep.memory.resting = false;
				var target = targets[0];
				for (let i = 0; i < targets.length; i++) {
					if (targets[i].structureType == STRUCTURE_EXTENSION) {
						target = targets[i];
						break;
					}
				}
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}}); // 绘制路径
                }
            }
			else if (droppedEnergy) {
				creep.memory.resting = false;
				creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffaa00'}});
				creep.pickup(droppedEnergy);
			}
			else{
				creep.moveTo(restPoints[0], {visualizePathStyle: {stroke: '#ffffff'}});
				creep.memory.resting = true;
			}
	    }
	    else {  // 非building状态的时候， 到source旁边并采集
	        var closestSource = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
				if (droppedEnergy) {
					creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffaa00'}});
					creep.pickup(droppedEnergy);
				}
                creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;

