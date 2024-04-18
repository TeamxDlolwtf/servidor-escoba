const User = require('./user');

class UsersList{
    constructor(){
        this.users = [];
    }
   
    addUser(socketId, name){
        const newUser = new User(socketId,name);
        this.users.push(newUser);
    }

    remUser(socketId){
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }

    getUserById(socketId){
        return this.users.find((user) => user.socketId === socketId);
    }
}


module.exports = UsersList