import * as frmDeck from './Deck.js';

var DealerScore = 0;
var PlayerScore = 0;
var Deck = frmDeck.Deck;
var Aces = frmDeck.Aces;

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
    PlayerScore = CheckScore(PlayerHand);
    console.log(PlayerScore);
    PlayerHand.push(Deck.pop());
    PlayerScore = CheckScore(PlayerHand);
    console.log(PlayerHand)
    CheckBust(PlayerHand);
    console.log(PlayerScore);
}
export function Stand(){
    DealerPlay();
    console.log(DealerHand);
}
function DealerPlay(){
    DealerScore = CheckScore(DealerHand);
    while(DealerScore <= 17){
        DealerHand.push(Deck.pop());
        DealerScore = CheckScore(DealerHand);
    }
    console.log(DealerScore);
}
function CheckBust(hand){
    let isBust = CheckScore(hand) > 21? true : false;
    return isBust
}
function CheckScore(hand){
    let score = 0;
    hand.forEach(card => {
        score += card.Value;
    });
    console.log('score:' + score)
    if(score > 21 && CheckAces(hand)){
        score -= 10;
        console.log('ACE!')
    }
    return score;
}
function CheckAces(hand){
    console.log('holup');
    return hand.some(item => Aces.includes(item));
}


console.log(DealerHand);
console.log(PlayerHand);
console.log(frmDeck);
//console.log(Deck);
console.log('fin');