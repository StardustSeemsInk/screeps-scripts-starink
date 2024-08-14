var flagRest = {

    /** @param {Flag} flag **/
    run: function(flag) {
        var restCreeps = flag.pos.findInRange(FIND_MY_CREEPS, 2);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        // 可视化周边creep数量
        flag.room.visual.text(
            '👷' + restCreeps.length,
            flag.pos.x + 1,
            flag.pos.y,
            {align: 'left', opacity: 0.8}
        );
        if(restCreeps){
            for(var i = 0; i < restCreeps.length; i++){
                // 检查creep是否处于休息状态
                if(restCreeps[i].memory.resting){
                    // 更换creep的角色
                    if(upgraders.length < 3){
                        restCreeps[i].memory.role = 'upgrader';
                        restCreeps[i].say('🔄 upgrader');
                    }
                    else{
                        if(restCreeps[i].memory.role == 'harvester'){
                            if(workers.length < 5){
                                restCreeps[i].memory.role = 'worker';
                                restCreeps[i].say('🔄 worker');
                            }
                            else{
                                restCreeps[i].memory.role = 'builder';
                                restCreeps[i].say('🔄 builder');
                            }
                        }
                        else if(restCreeps[i].memory.role == 'builder'){
                            restCreeps[i].memory.role = 'harvester';
                            restCreeps[i].say('🔄 harvester');
                        }
                        else if(restCreeps[i].memory.role == 'worker'){
                            restCreeps[i].memory.role = 'builder';
                            restCreeps[i].say('🔄 builder');
                        }
                    }


                }
            }
        }

        var closestCreep = flag.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => {
                return (creep.memory.role == 'worker');
            }
        });
        if(workers.length > 5){
            if(closestCreep){
                closestCreep.memory.role = 'builder';
            }
        }
    }
}

module.exports = flagRest;