console.log("Hello World!");

let suits = [1,2,3,4,5,6,7,8,9,10,11,12,13];


let rnd = Math.floor(Math.random() * 10) + 1;
for (let i=0; i < Math.floor(Math.random() * 10) + 1; i++){
    suits = Shuffle(suits);
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
    console.log(shuffledArr);
    return shuffledArr;
}
