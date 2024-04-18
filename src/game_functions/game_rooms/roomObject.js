/*
    this.owner -> socket.id
    this.mode ->  1- 1v1 ; 2-   
                
*/
const UsersList = require('../game_users/userList')


class Room{
    constructor(mode,ownerId){
        this.owner = ownerId;
        this.mode=mode;
        this.users = new UsersList();
    }
    
}


module.exports = Room;