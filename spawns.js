var spawns = {

    run: function() {
        // console.log('spawns.js');
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');


        for(var name in Game.spawns) {
            var spawn = Game.spawns[name];

            //#region 续命
            // 如果spawn没有在孵化，能量大于100, 且周围有需要续命的creep
            if(!spawn.spawning && spawn.store.getUsedCapacity(RESOURCE_ENERGY) > 100) {

                var dyingCreeps = spawn.pos.findInRange(FIND_MY_CREEPS, 3, {
                    filter: (creep) => {
                        return (creep.memory.role == 'soldier' || creep.memory.role == 'claimer' || creep.memory.role == 'healer');
                    }
                });
                if(dyingCreeps.length > 0){
                    var spawn = spawn;
                    spawn.renewCreep(dyingCreeps[0]);
                }
            }
            //#endregion

            //#region 可视化
            if(spawn.spawning) { // 孵化过程可视化
                var spawningCreep = Game.creeps[spawn.spawning.name];
                spawn.room.visual.text(
                    '🛠️' + spawningCreep.memory.role + ' ' + spawningCreep.memory.type,
                    spawn.pos.x + 1, 
                    spawn.pos.y, 
                    {align: 'left', opacity: 0.8});
            }
            else{ // 未孵化时显示各个角色数量
                spawn.room.visual.text(
                    '📦' + harvesters.length,
                    spawn.pos.x + 1,
                    spawn.pos.y - 1,
                    {align: 'left', opacity: 0.8}
                );
                spawn.room.visual.text(
                    '⚒️' + builders.length,
                    spawn.pos.x + 1,
                    spawn.pos.y,
                    {align: 'left', opacity: 0.8}
                );
                spawn.room.visual.text(
                    '⚡' + upgraders.length,
                    spawn.pos.x + 1,
                    spawn.pos.y + 1,
                    {align: 'left', opacity: 0.8}
                );
                spawn.room.visual.text(
                    '🧐' + workers.length,
                    spawn.pos.x + 1,
                    spawn.pos.y + 2,
                    {align: 'left', opacity: 0.8}
                );
            }
            //#endregion
        }
    }
};

module.exports = spawns;