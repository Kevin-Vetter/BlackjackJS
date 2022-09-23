var Suits = ['D','H','C','S'];
var Faces = ['2','3','4','5','6','7','8','9','10','K','D','K','A',];
var Values = [2,3,4,5,6,7,8,9,10,10,10,10,11];
var Aces = ['AD','AH','AC','AS'];
class Card{
    constructor(suit, face, value) {
        this.Suit = suit;
        this.Face = face;
        this.Value = value;
        this.Path = this.GetPath();
    }
    GetPath(){
        return "/cards/" + this.Face + this.Suit + ".png";
    }
}

var Deck = function()
{   
    let deck = [];
    for(suit in Suits)
    {
        for(face in Faces){
            deck.push(new Card(Suits[suit],Faces[face],Values[face]))
        }
    }
    return deck
}();


function ShuffleRandom(arr){
    let rnd = Math.floor(Math.random() * 10) + 1;
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
