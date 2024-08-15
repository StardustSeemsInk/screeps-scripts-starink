var sources = {

    /**@param {Room} room */
    init: function(room) {
        var sources = room.find(FIND_SOURCES);
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            console.log(source.id);
            if (!room.memory.sources) room.memory.sources = {};
            room.memory.sources[source.id] = this.getSourceWorkersLimitation(source);
        }
    },

    getSourceWorkersLimitation: function (source) {
        var center = source.pos;

        var terrain = source.room.getTerrain();
    
        var top = terrain.get(center.x, center.y - 1);
        var right = terrain.get(center.x + 1, center.y);
        var bottom = terrain.get(center.x, center.y + 1);
        var left = terrain.get(center.x - 1, center.y);
        var leftTop = terrain.get(center.x - 1, center.y - 1);
        var rightTop = terrain.get(center.x + 1, center.y - 1);
        var rightBottom = terrain.get(center.x + 1, center.y + 1);
        var leftBottom = terrain.get(center.x - 1, center.y + 1);
    
        var round = [
            top,
            right,
            bottom,
            left,
            leftTop,
            rightTop,
            rightBottom,
            leftBottom,
        ];
    
        var count = 0;
    
        for (var i = 0; i < round.length; i++) {
            switch (round[i]) {
                case TERRAIN_MASK_WALL:
                    count++;
                    break;
                case TERRAIN_MASK_SWAMP:
                    count++;
                    break;
            }
        }
    
        return 8 - count;
    }
};

module.exports = sources;