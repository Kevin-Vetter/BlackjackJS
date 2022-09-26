import * as impDeck from './Deck.js';

var Deck = impDeck.Deck;

// InitGame
var PlayerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    return hand;
}();

var DealerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    return hand;
}();



export function Hit()
{
    console.log(Deck.pop());
}







console.log(DealerHand);
console.log(PlayerHand);
console.log(impDeck);
console.log('fin');