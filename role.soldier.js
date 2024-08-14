var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var attackFlag = Game.flags['AttackFlag'];
        var healFlag = Game.flags['HealFlag'];
        
        if(creep.memory.attacking && creep.hits < creep.hitsMax){ // 受伤状态
            creep.memory.attacking = false;
            creep.say('🔄 heal');
        }

        if(!creep.memory.attacking && creep.hits == creep.hitsMax){ // 非受伤状态
            creep.memory.attacking = true;
            creep.say('🔫 attack');
        }

        if(creep.memory.attacking) { // 攻击状态
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
            else{
                creep.moveTo(attackFlag, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else { // 非攻击状态
            creep.moveTo(healFlag, {visualizePathStyle: {stroke: '#00ff00'}});
        }
    }
};

module.exports = roleSoldier;