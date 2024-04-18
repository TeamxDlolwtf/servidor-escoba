
const server = require('./server/server');
const io = require('./server/socket');

server.listen(5000, () => {
    console.log(`Servidor Socket.io escuchando en el puerto 5000`);
});
