var playing = false;
var score;
var attemptsLeft;
var step;
var action; //used for setInterval
var fruits =['apple', 'banana', 'strawberry', 'watermelon', 'grapes', 'lemon', 'orange', 'pineapple'];
$(function(){
    
//click on start reset button
    
$("#startreset").click(function(){

//we are playing
  if(playing == true){

     //reload page
      location.reload();
     }else{

     //we are not playing
    playing = true;  //game initiated

    //set score to 0
    score = 0;  //set score to 0
    $("#scorevalue").html(score);

    //show attempts left
    $("#attemptsLeft").show();
         attemptsLeft = 3;
         addHearts();

    //hide game over box
    $("#gameOver").hide();

    //change button text to reset game
    $("#startreset").html("Reset Game");


    //start sending fruits
    startAction();
     }
});  
    
    //slice a fruit

    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score
    //    document.getElementById("slicesound").play();
        $("#slicesound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 500);
});

//functions
    
//fill attemptLeft box with hearts    

function addHearts(){
    $("#attemptsLeft").empty();
    for(i = 0; i < attemptsLeft; i++){
           $("#attemptsLeft").append('<img src="images/heart.png" class="life">'); 
        }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate random step
    step = 1+ Math.round(5*Math.random()); //change step
    
    //Move fruit down by one step every 10ms
        action = setInterval(function(){
            
            //move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
        //check if any attempts left
            if(attemptsLeft > 1 ){
              //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate random step
    step = 1+ Math.round(5*Math.random()); //change step 
                
                //reduce attempts by 1
                attemptsLeft --;
                
                //populate attemptsLeft box
                addHearts();
                
               }else{ //game over
                   playing = false; //we are not playing anymore
                   $("#startreset").html("Start Game"); //change button to Start Game
                   $("#gameOver").show();
                   $("#gameOver").html('<p>Game Over</p><p>Your score is '+ score +'</p>');
                   $("#attemptsLeft").hide();
                   stopAction();
               }
           }
    }, 10);
}

// generate a random fruit

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(7*Math.random())] +'.png');
    
}
    
//stop dropping fruit
    
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});
