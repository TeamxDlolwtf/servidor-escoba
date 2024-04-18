const Room = require('./roomObject');

class RoomInstances{
    constructor(){
        if(!RoomInstances.instance){
            this.rooms = [];
            RoomInstances.instance = this;
        }
        return RoomInstances.instance;
    }

    createRoom(mode,user){
        const {socketId,name} = user;
        const newRoom = new Room(mode,socketId);
        newRoom.users.addUser(socketId,name);
        this.rooms.push(newRoom)
        console.log(`${name} ha creado una nueva room`);
    }
                          
    deleteRoom(ownerId){
        this.rooms = this.rooms.filter((room) => room.owner !== ownerId);
    }

    getRoomById(ownerId){
        return this.rooms.find((room) => room.owner === ownerId);
    }
    
}

const ListRoom = new RoomInstances()

module.exports = ListRoom;
