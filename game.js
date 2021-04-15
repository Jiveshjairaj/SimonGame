var buttonColors = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startToggle = false;

// on click
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

// keypress
$(document).keypress(function(event){
    var x = event.key;
    if(!startToggle)
    {
        nextSequence();
        startToggle=true;
    }
});

// sequencepattern
function nextSequence()
{
   userClickedPattern=[];
    level++;
   $("h1").text("LEVEL"+level);
    var randomNumber = Math.floor(Math.random()*4);
   // console.log(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

 }
 
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
       {
         console.log("Success");
            if (userClickedPattern.length === gamePattern.length){
                 setTimeout(function () {
                nextSequence();
                }, 1000);
        }
    }
     else {
         var sound = new Audio("sounds/wrong.mp3");
         sound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
         }, 200);
        $("h1").text("Game Over, press any key to restart");
        startOver();
     }
}

function startOver()
{
    level = 0;
    gamePattern=[];
    startToggle= false;
}

function playsound(name)
{
   var audio = new Audio("sounds/"+name+".mp3");
   audio.play();
}

// animation
function animatePress(currentColour)
{
   $("#"+currentColour).addClass("pressed"); 
   setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
    }, 100);
}