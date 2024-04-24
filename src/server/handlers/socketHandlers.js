const socketController = require('../controllers/socketController');

function configureSocketHandlers(io) {
    io.on('connection', (socket) => {
        console.log(`Nuevo cliente conectado ${socket.id}`);

        // actualizar a ej: socket.on('event', ()=> handleCreateUser(io,socket))
        socketController.handleCreateUser(io, socket);
        socketController.handleDisconnect(io, socket);
        socketController.handleGetListUsers(io, socket);
        socketController.handleGetRooms(io, socket);
        socketController.handleCreateRoom(io, socket);
        socketController.handleDeleteRoom(io, socket);
        socketController.handleJoinRoom(io, socket);
        socketController.handlePartRoom(io, socket);
        socketController.handleKickParty(io,socket);
        socketController.handleSendParty(io,socket);
    });
}

module.exports = configureSocketHandlers;
