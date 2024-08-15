var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var claimFlag = Game.flags['ClaimFlag'];
        var controller = creep.room.controller;
        console.log(controller);

        if(creep.memory.claiming && creep.room.name != claimFlag.pos.roomName){ // 占领状态 && 不在claimFlag房间
            creep.memory.claiming = false;
            creep.say('🔄 claim');
        }

        if(!creep.memory.claiming && creep.room.name == claimFlag.pos.roomName){ // 非占领状态 && 在claimFlag房间
            creep.memory.claiming = true;
            creep.say('🔫 attack');
        }

        if(creep.memory.claiming) { // 占领状态
            if(creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else { // 非占领状态
            creep.moveTo(claimFlag, {visualizePathStyle: {stroke: '#ff0000'}});
        }

    }
};

module.exports = roleClaimer;