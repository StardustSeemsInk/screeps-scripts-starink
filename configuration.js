module.exports.Config = class {
  constructor() {
    this.basicRoomCreepsRolesCount = {
      'worker': 5,
      'builder': 2,
      'harvester': 2,
      'soldier': 1,
      'shooter': 0,
      'claimer': 0,
      'healer': 1,
    };

    this.basicRoomCreepsCount = {
      'SW': 1,
      'MW': 7,
      'LW': 3,
      'MS': 1,
      'MSH': 0,
      'C': 0,
      'H': 1,
    };

    this.basicRoomCreepsBody = {
      'SW': [MOVE, CARRY, WORK],
      'MW': [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK],
      'LW': [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK],
      'MS': [TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE],
      'MSH': [MOVE, ATTACK, RANGED_ATTACK],
      'C': [CLAIM, MOVE],
      'H': [MOVE, HEAL],
    };

    this.defaultRole = 'harvester';

    this.mostImportantRole = 'upgrader';

    this.sourceCreepNumMax = 3;

    this.ifRenew = true;
  }
};



