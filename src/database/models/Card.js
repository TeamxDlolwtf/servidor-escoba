const {Schema, model, models, Types} = require('mongoose')
const { postImage }  = require('../../libs/cloudinary');
const Deck = require("./Deck");

// Schema for Card



const cardSchema = new Schema({
    value: {
        type: Number,
      
    },
    suit: {
        type: String,
        
    },
    img:{
        type: String,
        
    },
    deck:{
        type: Types.ObjectId,
        ref:"Deck"
    }
});

cardSchema.methods.setDeck = async function(deckID){
    const findDeck = await Deck.findById(this.deck_id)
     return await findDeck.addCard(this._id);
}


cardSchema.pre('save', async function (next){
    const card = this;
    try {
            const newUrl  =   await postImage(card.img,card._id);
            card.img = newUrl;
        next();
    } catch (error) {
        return next(error);
    }
})


// Model for Card
module.exports =  models?.Card || model('Card', cardSchema);