
class Player{
    constructor(){
        this.score = 0;
        this.hand = []; // cartas
        this.amount = [];
    }


    addHand(cards){
        this.hand = cards;
    }

    addamount(cards){
        this.amount.push(cards);
    }

}


module.exports = Player; 