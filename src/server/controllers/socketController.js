const UsersList = require('../../game_functions/game_users/userList');
const ListRoom = require('../../game_functions/game_rooms/roomsInstances');

const ServerListUsers = new UsersList();

function handleGetListUsers(io,socket){
    socket.on('getUsersLists',()=>{
        socket.emit('updateListUsers', ServerListUsers.users);
        console.log('entro al handle envio: ',ServerListUsers.users);
    })
}

function handleCreateUser(io, socket) {
    socket.on('createUser',(userData) => {
        const {socketId,name} = userData
        ServerListUsers.addUser(
            socketId,
            name
        )
        console.log(`user ${socket.id} ha cambiado su nombre a : ${name}`);
        io.emit('updateListUsers', ServerListUsers.users);
    })
}




function handleDisconnect(io, socket) {
    socket.on('disconnect',(reason)=>{
        console.log(`${socket.id} se ha desconectado, razón: ${reason}`);
        ServerListUsers.remUser(socket.id);
        const isOwner = ListRoom.getRoomById(socket.id);
        console.log(isOwner);
        if(isOwner){
            ListRoom.deleteRoom(socket.id);
            io.emit('updateListRooms',ListRoom.rooms);
        } 

        io.emit('updateListUsers',ServerListUsers.users);
    })
}



// Rooms

function handleCreateRoom(io,socket){
    socket.on('createRoom', ({mode=1,socketID}) => {
        const isOwner = ListRoom.getRoomById(socket.id);
        if(!isOwner){
            const user = ServerListUsers.getUserById(socketID);
            ListRoom.createRoom(mode,user);
            io.emit('updateListRooms',ListRoom.rooms);
        }
    });
}

function handleGetRooms(io,socket){
    socket.on('getListRooms', () => {
        socket.emit('updateListRooms',ListRoom.rooms);
    })
}


function handleDeleteRoom(io,socket){
    socket.on('deleteRoom',() => {
        ListRoom.deleteRoom(socket.id);
        io.emit('updateListRooms',ListRoom.rooms);
    })
}

function handleJoinRoom(io,socket){
    socket.on('joinRoom', (OwnerId) => {
        const findRoom = ListRoom.getRoomById(OwnerId);
        const findUser = ServerListUsers.getUserById(socket.id);
        // ...findUser = socketId , name
        if(socket.id !== OwnerId){
            findRoom.users.addUser(findUser.socketId,findUser.name);
            io.emit('updateListRooms',ListRoom.rooms);
        }
    } )
}

function handlePartRoom(io,socket){
     socket.on('partRoom',(OwnerId) => {
        const findRoom = ListRoom.getRoomById(OwnerId);
        findRoom.users.remUser(socket.id);
        const isOwner = ListRoom.getRoomById(socket.id);
        if(isOwner) ListRoom.deleteRoom(socket.id);
        io.emit('updateListRooms',ListRoom.rooms);
     });
}

function handleSendParty(io,socket){
    socket.on('sendParty',(targetId) => {
        const findRoomOwner = ListRoom.getRoomById(socket.id);
        const findTarget = ServerListUsers.getUserById(targetId);
        const findOwner = ServerListUsers.getUserById(socket.id);
        if(findRoomOwner && findTarget){
            console.log(`${findOwner.name} esta invitando a ${findTarget.name}`)
            io.to(targetId).emit("sendInvite",findOwner);
        }
    });
}

function handleKickParty(io,socket){
    socket.on('kick',(targetId) =>{
        const findRoomOwner = ListRoom.getRoomById(socket.id);
        if(findRoomOwner){
            console.log(findRoomOwner);
            findRoomOwner.users.remUser(targetId);
            io.to(targetId).emit('kick');
            io.emit('updateListRooms',ListRoom.rooms);
        }
    })
}

module.exports = {
    handleCreateUser,
    handleDeleteRoom,
    handleDisconnect,
    handleCreateRoom,
    handleGetRooms,
    handleGetListUsers,
    handleJoinRoom,
    handlePartRoom,
    handleKickParty,
    handleSendParty
};

