var towers = {

    run: function() {
        for(var room in Game.rooms){
            var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            });
            for(var i = 0; i < towers.length; i++){
                var tower = towers[i];
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                var closestInjuredCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: (creep) => {
                        return (creep.hits < creep.hitsMax);
                    }
                });
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
                else if(closestInjuredCreep){
                    tower.heal(closestInjuredCreep);
                }
                else if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = towers;
