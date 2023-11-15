
var colors = ['green','red','yellow', 'blue'];

var gamePattern = [];
var userPattern = [];

var level = 0;
var flag = 0;

//! Before starting the Game

document.addEventListener("keydown",()=>{
    if(flag==0){
        nextSeq();
        document.getElementById("heading").textContent = "Level " + level;
        flag=1;
    }
})

//! After starting the game

function nextSeq(){
    userPattern = [];
    level++;
    document.getElementById("heading").textContent = "Level " + level;

    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNum];
    gamePattern.push(randomColor);

    animate(randomColor);
    playSound(randomColor);
}

//! Executes everytime when clicked on a button

for(let i=0;i<4;i++){
    document.querySelectorAll(".col-item")[i].addEventListener("click",(e)=>{
        var userChosenColor  = e.target.getAttribute('id');
        userPattern.push(userChosenColor);

        checkAnswer(userPattern.length-1);

        playSound(userChosenColor);
        animate(userChosenColor);
        console.log(gamePattern);
    })
}

function checkAnswer(currentLvl){
        if(userPattern[currentLvl] == gamePattern[currentLvl]){
            if(userPattern.length == gamePattern.length){
                setTimeout(() => {
                    nextSeq();
                }, 1000);
            }
        }
        else{
            playSound("wrong");
            document.querySelector("body").classList.add("game-over");
            document.getElementById("heading").textContent = "Game Over, Press Any Key to Restart";

            setTimeout(() => {
                document.querySelector("body").classList.remove("game-over");
            }, 200);

            startOver();
        }
    }




function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}



function animate(color){
    document.getElementById(""+color).classList.add("pressed");
    setTimeout(()=>{
        document.getElementById(""+color).classList.remove("pressed");
    },500)
}

function startOver(){
    flag = 0;
    level = 0;
    gamePattern = [];
}