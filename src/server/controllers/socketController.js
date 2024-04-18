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

        io.emit('updateListUsers',ServerListUsers.users);
    })
}



// Rooms

function handleCreateRoom(io,socket){
    socket.on('createRoom', ({mode=1,socketID}) => {
        const user = ServerListUsers.getUserById(socketID);
        ListRoom.createRoom(mode,user);
        io.emit('updateListRooms',ListRoom.rooms);
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
        findRoom.users.addUser(findUser.socketId,findUser.name);
        io.emit('updateListRooms',ListRoom.rooms);
    } )
}

function handlePartRoom(io,socket){
     socket.on('partRoom',(OwnerId) => {
        const findRoom = ListRoom.getRoomById(OwnerId);
        findRoom.users.remUser(socket.id);
        io.emit('updateListRooms',ListRoom.rooms);
     });
}


module.exports = {
    handleCreateUser,
    handleDeleteRoom,
    handleDisconnect,
    handleCreateRoom,
    handleGetRooms,
    handleGetListUsers,
    handleJoinRoom,
    handlePartRoom
};

