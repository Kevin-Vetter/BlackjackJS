var Suits = ['D','H','C','S'];
var Faces = ['2','3','4','5','6','7','8','9','10','J','D','K','A',];
var Values = [2,3,4,5,6,7,8,9,10,10,10,10,11];
class Card{
    constructor(suit, face, value) {
        this.Id = face + suit;
        this.Value = value;
        this.Path = this.GetPath();
    }
    GetPath(){
        return "/cards/" + this.Id + ".png";
    }
}

var Deck = function()
{   
    let deck = [];
    for(let suit in Suits)
    {
        for(let face in Faces){
            deck.push(new Card(Suits[suit],Faces[face],Values[face]))
        }
    }

    deck = ShuffleRandom(deck);
    return deck;
}();
var Aces = function (){
    let aces = []
    Deck.forEach(card => {
        if(card.Value == 11){
            aces.push(card);
        }
    });
    return aces;
}();

function ShuffleRandom(arr){
    let rnd = Math.floor(Math.random() * 100) +1;
    for (let i=0; i < rnd; i++){
        arr = Shuffle(arr);
    }
    return arr;
}
function Shuffle(arr){
    let shuffledArr = [];
    let length = arr.length;
    for (let i = 0; i < length; i++)
    {        
        let temp = Math.floor(Math.random() * arr.length);
        let removed = arr.splice(temp, 1);
        shuffledArr.push(removed[0]);
    }
    return shuffledArr;
}

export {Deck, Aces};