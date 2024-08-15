const configuration = require('configuration');
const config = new configuration.Config();

var workersBasic = {
        // 采矿
    /**@param {Creep} creep */
    workerMine: function(creep) {
        var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        var closestSource = creep.pos.findClosestByRange(FIND_SOURCES, {
            filter: (source) => {
                return source.energy > 0;
            }
        });
        // 判断最近的矿附近的creep数量
        var creepsNearSource = closestSource.pos.findInRange(FIND_MY_CREEPS, 1);
        if(creepsNearSource.length >= config.sourceCreepNumMax && creep.pos.findInRange(FIND_SOURCES, 1).length == 0){
            var closestSource = creep.pos.findClosestByRange(FIND_SOURCES, {filter: (source) => {
                return (source.id != closestSource.id && source.energy > 0);
            }});
        }
        if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
            if (droppedEnergy) { // 有掉落的能量
                creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.pickup(droppedEnergy);
            }
            creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = workersBasic;