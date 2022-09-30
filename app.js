import * as frmDck from './Deck.js';

var Deck = frmDck.Deck;
var Aces = frmDck.Aces;
var DealerScore = 0;
var PlayerScore = 0;
var RunningGame = false;
var StoredPath;
var BetAmount = 0;

var Balance = function(){
        let decodedCookie = decodeURIComponent(document.cookie);
        if(decodedCookie != ""){
            let value = decodedCookie.split('=');
            if(Number(value[1] < 10)){
                return Number(2000);
            }
            return Number(value[1]);
        }
          return Number(2000);
}; // Returns the balance from cookies, else 2000

function UpdateBalance(newBalance){
    document.cookie = 'balance=' + newBalance;
    document.getElementById('balance').innerText = newBalance;
} // Updates the balance both in UI and cookies

function Bet(amount){
    if(amount <= Balance()){
        BetAmount = amount;
        document.getElementById('startScreen').style = 'display: none;';
        RunningGame = true;
    }
} // Takes a bet ammount from UI

// Init some values
var PlayerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    DrawCard('playerCards',hand);
    return hand;
}(); // Array that contains the cards the player holds
CheckBust(PlayerHand);
var DealerHand = function() {
    let hand = []
    for (let i = 0; i < 2; i++) {
        let pop = Deck.pop();
        hand.push(pop);        
    }
    return hand;
}(); // Array that contains the cards the dealer holds


// -Free-flow code
StoredPath = DealerHand[0].Path;
DealerHand[0].Path = '/cards/back.png'
UpdateBalance(Balance());
DrawCard('dealerCards',DealerHand);
// end init
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
} // Draws a card to UI
function DealerPlay(){
    DealerScore = CheckScore(DealerHand);
    while(DealerScore < 17){
        DealerHand.push(Deck.pop());
        DrawCard('dealerCards',DealerHand);
        DealerScore = CheckScore(DealerHand);
    }

    WinnerCheck();
} // Dealer takes a card until they lose or have above 17
function CheckBust(hand){
    let isBust = CheckScore(hand) > 21? true : false;
    return isBust
} // Cheks if a given hand would be over 21
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
} // Checks the score of a hand
function FuckAce(hand){
    for(let card of hand){
        if(Aces.includes(card)){
            Aces.splice(Aces.findIndex(x => x.Id == card.Id),1);
            card.Value = 1;
            return true;
        }};
} // Checks if ace rule applies
function WinnerCheck(){
    RunningGame = false
    FlipCard();
    PlayerScore = CheckScore(PlayerHand);
    DealerScore = CheckScore(DealerHand);
    if(!CheckBust(PlayerHand) && CheckBust(DealerHand)){
        EndGame('won');
        UpdateBalance(Balance()+BetAmount);
    }
    else if(!CheckBust(DealerHand) && CheckBust(PlayerHand)){
        EndGame('lost');
        UpdateBalance(Balance()-BetAmount);    
    }
    else if(!CheckBust(DealerHand) && DealerScore > PlayerScore){
        EndGame('lost');
        UpdateBalance(Balance()-BetAmount);
    }
    else if(!CheckBust(PlayerHand) && PlayerScore > DealerScore){
        EndGame('won');
        UpdateBalance(Balance()+BetAmount);
    }
    else if(!CheckBust(PlayerHand) && PlayerScore == DealerScore){
        EndGame('tied');
    }

} // Checks who the winner is
function EndGame(state){
    setTimeout(() => {

        document.getElementById('endScreen').classList = 'position-absolute text-center fs-2 top-50 start-50 translate-middle fade-in';
        document.getElementById('endScreen').style = 'backdrop-filter: blur(100px)';
        document.getElementById('eds').innerText = DealerScore;
        document.getElementById('eps').innerText = PlayerScore;
        document.getElementById('result').innerText = state;}, 1500);
} // Ends the game
function UpdateScore(id,score){
    document.getElementById(id).innerText = score;
} // Updates the score in UI
function FlipCard(){
    DealerHand[0].Path = StoredPath;
    DrawCard('dealerCards',DealerHand);
} // Flips the dealers first card
function Hit()
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
} // Gives the player a new card
function Stand(){
    if(RunningGame){
        FlipCard();
        DealerPlay();
        RunningGame = false;
    }
} // Locks the players hand and runs dealers play

// Exports
export {Hit,Stand,Bet,RunningGame};