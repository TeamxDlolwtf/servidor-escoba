const Card = require('../models/Card');
const {connectDB} = require('../db');


const  getAllCards = async () => {
    try {
        const cards = await Card.find({}).populate('deck',{name:1});
        console.log('este es el resultado del populate: ', cards);
        if(cards) return cards 
        throw TypeError('Ocurrio un error interno')
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllCards
}