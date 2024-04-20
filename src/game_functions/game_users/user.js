const Player = require('./player');

class User extends Player{
    constructor(id,name){
        super();
        this.socketId = id;
        this.name = name;
    }

    setName(name){
        this.name = name;
    }

}

module.exports = User