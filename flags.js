const flagRest = require('flag.rest');

var flags = {
    run: function() {
        // console.log('flags.js');
        
        for(var name in Game.flags) {
            var flag = Game.flags[name];
            if(flag.name == 'RestPoint') {
                flagRest.run(flag);
            }
        }
    }
};

module.exports = flags;