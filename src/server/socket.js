const socketIo = require('socket.io');
const configureSocketHandlers = require('./handlers/socketHandlers');
const server = require('./server');

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE']
    }
});

configureSocketHandlers(io);

module.exports = io;

