import * as frmDck from './Deck.js';

var Deck = frmDck.Deck;
var Aces = frmDck.Aces;
var DealerScore = 0;
var PlayerScore = 0;
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
        if(score > 21){
            if(FuckAce(hand)){   
                score -= 10;
            }
        }
    });
    if(hand == PlayerHand)
        UpdateScore('playerScore',score);
    else
        UpdateScore('dealerScore',score);
    return score;
}
function FuckAce(hand){
    for(let card of hand){
        if(Aces.includes(card)){
            Aces.splice(Aces.findIndex(x => x.Id == card.Id),1);
            card.Value = 1;
            return true;
        }};
}
function WinnerCheck(){
    RunningGame = false
    PlayerScore = CheckScore(PlayerHand);
    DealerScore = CheckScore(DealerHand);
    if(!CheckBust(PlayerHand) && CheckBust(DealerHand)){
        EndGame('won');
    }
    else if(!CheckBust(DealerHand) && CheckBust(PlayerHand))
    EndGame('lost');
    else if(!CheckBust(DealerHand) && DealerScore > PlayerScore)
    EndGame('lost');
    else if(!CheckBust(PlayerHand) && PlayerScore > DealerScore)
    EndGame('won');
    else if(!CheckBust(PlayerHand) && PlayerScore == DealerScore)
    EndGame('tied');

}

function EndGame(state){
    setTimeout(() => {

        document.getElementById('endScreen').classList = 'position-absolute text-center fs-2 top-50 start-50 translate-middle fade-in';
        document.getElementById('endScreen').style = 'backdrop-filter: blur(100px)';
        document.getElementById('eds').innerText = DealerScore;
        document.getElementById('eps').innerText = PlayerScore;
        document.getElementById('result').innerText = state;}, 1500);
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
            WinnerCheck();
        }
        else if(PlayerHand.length >= 5)
        {
            WinnerCheck();
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