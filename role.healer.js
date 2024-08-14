var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var healFlag = Game.flags['HealFlag'];
        var healTarget = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => {
                return (creep.hits < creep.hitsMax);
            }
        });
        
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(creep.ticksToLive < 100){
            if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }

        if(healTarget) {
            if(creep.heal(healTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(healTarget, {visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
        else{
            if(creep.ticksToLive > 600){
                creep.moveTo(healFlag, {visualizePathStyle: {stroke: '#ff0000'}});
            }
            else{
                if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }


    }
};

module.exports = roleHealer;