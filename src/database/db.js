const mongoose = require('mongoose');
const {DB_URI} = process.env

async function connectDB() {
    try {
      await mongoose.connect(DB_URI, {
        autoIndex: true, // Habilitar creación automática de índices
        autoCreate: false, // Deshabilitar creación automática de colecciones
        socketTimeoutMS: 30000, // Tiempo de espera para matar un socket inactivo (30 segundos)
        serverSelectionTimeoutMS: 5000, // Tiempo de espera para seleccionar un servidor (5 segundos)
        maxPoolSize: 10, // Máximo número de sockets abiertos
        minPoolSize: 0, // Mínimo número de sockets abiertos
        // Más opciones pueden ser agregadas según las necesidades específicas
      });
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error.message);
      // Puedes implementar aquí lógica para manejar el error, como intentar reconectar
    }
  }
  
  // Manejar eventos de conexión y errores
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database');
  });
  
  mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error.message);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from database');
  });
  
  // Manejar reconexión automática
  mongoose.connection.on('reconnectFailed', () => {
    console.error('Mongoose failed to reconnect to database');
    // Puedes implementar aquí lógica para manejar la reconexión fallida, como cerrar la aplicación o registrar el evento
  });
  
  // Configurar reconexión automática
  
  module.exports = { connectDB };