import * as frmDck from './Deck.js';

var Deck = frmDck.Deck;
var Aces = frmDck.Aces;
var DealerScore = 0;
var RunningGame = true;
var StoredPath;
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
CheckBust(PlayerHand);
var DealerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    return hand;
}();
StoredPath = DealerHand[0].Path;
DealerHand[0].Path = '/cards/back.png'

DrawCard('dealerCards',DealerHand);

function DrawCard(id, hand){
let div = document.getElementById(id);
div.innerHTML = '';
    hand.forEach(card => {
        let img = document.createElement('img');
        img.setAttribute('src', card.Path);
        img.height = 225;
        img.width = 150;
        img.setAttribute('style', 'border: medium solid black; border-radius:5px 5px 5px 5px;');
        div.appendChild(img);
    });
}
function DealerPlay(){
    DealerScore = CheckScore(DealerHand);
    while(DealerScore < 17){
        DealerHand.push(Deck.pop());
        DrawCard('dealerCards',DealerHand);
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
    let aces = AceCount(hand);
    hand.forEach(card => {
        score += card.Value;
        for(let i = 0; i < aces; i++) {   
            if(score > 21){
                score -= 10;
                Aces.splice(Aces.findIndex(x => x.Id == card.Id),1);
                card.Value = 1
                aces--;
            }
        }
    });
    if(hand == PlayerHand)
        UpdateScore('playerScore',score);
    else
        UpdateScore('dealerScore',score);
    return score;
}
function AceCount(hand){
    let aces = 0;
    hand.forEach(card => {
        if(Aces.includes(card)){
            aces++;
        }});
    return aces;
}
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
    else if(!CheckBust(PlayerHand) && playerscore == dealerscore)
        console.log('Tied!');

}
function UpdateScore(id,score){
    document.getElementById(id).innerText = score;
}
function FlipCard(){
    DealerHand[0].Path = StoredPath;
    DrawCard('dealerCards',DealerHand);
}

export function Hit()
{
    if(RunningGame){
        PlayerHand.push(Deck.pop());
        DrawCard('playerCards',PlayerHand);
        if(CheckBust(PlayerHand))
        {
            console.log('you have lost this game');
            RunningGame = false;
        }
        else if(PlayerHand.length >= 5)
        {
            console.log('you have won this game')
            RunningGame = false;
        }
    }
}
export function Stand(){
    if(RunningGame){
        FlipCard();
        DealerPlay();
        console.log(DealerHand);
        console.log(PlayerHand);
        RunningGame = false;
    }
}

export {RunningGame};