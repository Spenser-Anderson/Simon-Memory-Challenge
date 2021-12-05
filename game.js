var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level = 0

var redSound = new Audio(src="/sounds/red.mp3");
var blueSound = new Audio(src="/sounds/blue.mp3");
var greenSound = new Audio(src="/sounds/green.mp3");
var yellowSound = new Audio(src="/sounds/yellow.mp3");


function nextSequence(){
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomButtonColor = buttonColors[randomNumber];

    $("h1").text("Level " + level)

    gamePattern.push(randomButtonColor);
    
    $("#"+randomButtonColor).animate({opacity:0.2}).animate({opacity:1});

    // var audio = new Audio(src='/sounds/'+randomButtonColor+".mp3");
    // audio.play(); 
    // by creating a playSound function with "name" as an input I can user one function to 
    // play sounds for both instances. 

    playSound(randomButtonColor);
    level ++;
    return gamePattern;
}

$(".btn").on("click", function(){
    var userChosenColor = (this).id;
    // var userChosenColor = $(this).attr("id"); //Appears to work the same as the line above. 
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userChosenColor);
    console.log(userClickedPattern);
    checkAnswers(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio(src='/sounds/'+ name + ".mp3");
    audio.play();
 
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed")
    }, 100)
}



$(document).keypress(function (){
    if (level < 1) {
    nextSequence();
    }

});


function checkAnswers(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
       
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function (){
            nextSequence();
        }, 1000);

        } 
    }
        else {
            console.log("wrong");
            var wrong = new Audio(src="/sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over")
            setTimeout(function () {
            $("body").removeClass("game-over")
            }, 200);
            
            $("h1").text("Game Over, Press Any Key to Restart")
            startOver();

        }
    }


    function startOver(){
        level = 0
        gamePattern = [];

    } 