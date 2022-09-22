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
    console.log(shuffledArr);
    return shuffledArr;
}
