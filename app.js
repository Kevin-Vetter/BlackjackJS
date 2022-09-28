import * as frmDck from './Deck.js';

var Deck = frmDck.Deck;
var Aces = frmDck.Aces;
var DealerScore = 0;

// InitGame
var PlayerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    DrawCard('playerCards',hand);
    return hand;
}();
var DealerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    DrawCard('dealerCards',hand);
    return hand;
}();



function DrawCard(id, hand){
    hand.forEach(card => {
        let div = document.getElementById(id);
        let img = document.createElement('img');
        img.setAttribute('src', card.Path);
        div.appendChild(img);
    });
}

export function Hit()
{
    PlayerHand.push(Deck.pop());
    if(CheckBust(PlayerHand))
    {
        console.log('you have lost this game');
    }
    else if(PlayerHand.length >= 5)
    {
        console.log('you have won this game')
    }
}
export function Stand(){
    DealerPlay();
    console.log(DealerHand);
    console.log(PlayerHand);
}
function DealerPlay(){
    DealerScore = CheckScore(DealerHand);
    while(DealerScore < 17){
        DealerHand.push(Deck.pop());
        DealerScore = CheckScore(DealerHand);
    }
    console.log('Dealer score:' + DealerScore);
    WinnerCheck();
}
function CheckBust(hand){
    let isBust = CheckScore(hand) > 21? true : false;
    return isBust
}
function CheckScore(hand){
    let score = 0;
    hand.forEach(card => {
        score += card.Value;
        //console.log('score:' + score)
        if(score > 21){
            for(let i = 0; i < AceCount(hand); i++) {   
                score -= 10;
                console.log('ACE!')
                //console.log('score:' + score)
            }
        }
    });
    return score;
}
function AceCount(hand){
    let aces = 0;
    hand.forEach(card => {
        if(Aces.includes(card)){
            Aces.slice(Aces.findIndex(x => x.Id == card.Id),1);
            aces++;
        }});
    return aces;
};
function WinnerCheck(){
    let playerscore = CheckScore(PlayerHand);
    let dealerscore = CheckScore(DealerHand);
    if(!CheckBust(PlayerHand) && CheckBust(DealerHand)){
        console.log('Player Wins! DB');
    }
    else if(!CheckBust(DealerHand) && CheckBust(PlayerHand))
    console.log('Player Lost! PB');
    else if(!CheckBust(DealerHand) && dealerscore > playerscore)
        console.log('Player Lost! HD');
    else if(!CheckBust(PlayerHand) && playerscore > dealerscore)
    console.log('Player Wins! HP')

}
