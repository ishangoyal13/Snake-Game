let  inputDir = {x:0,y:0};
const gameMusic = new Audio('../assests/music.mp3');
const gameOver = new Audio('../assests/gameover.mp3');
let speed=6;
let score=0;
let lastPaintTime=0;
let snakeArr = [
    {x:13,y:15}
];
food = {x:6 ,y:15};

//functions

function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //bump into yourself
    for(let index=1;index<snakeArr.length;index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    //bump into walls
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    
    return false;
}

function gameEngine(){

    if(isCollide(snakeArr)){
        inputDir = {x:0,y:0};
        gameMusic.pause();
        gameOver.play();
        alert("Game Over! Press any key to play again");
        snakeArr = [{x:13,y:15}];
        gameMusic.play();
        score = 0;
        document.getElementById('score').innerHTML="Score: "+score;
        speed=6;
    }

    //jab snake ne food kha liya
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        for(let i=1;i<=10;i++){  //for increasing snake speed after every 5pts
            if(score==(5*i)){
                speed+=1;
            }
        }
        document.getElementById('score').innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=1;
        let b=17;
        food = {   //random location of food
            x:Math.round(a + (b-a)*Math.random()),
            y:Math.round(a + (b-a)*Math.random())
        }
    }

    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1} //game starts
    gameMusic.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        default:
            break;
    }
})

