const {Schema,model,models,Types} =  require('mongoose')

const deckSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});


models.exports = models?.Deck || model('Deck', deckSchema);