var playing = false;
var score;
var y = 60;
var x = y;
var correct;

document.getElementById("startreset").onclick = function() {
//start/reset button is clicked.

    //if we are playing
    if (playing == true) {
        //button is a reset; page reloads.
        location.reload();
    } else {
    //if not playing
    playing = true;
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown box
        document.getElementById("timerem").style.display = "block";
        document.getElementById("timeremval").innerHTML = x;
        document.getElementById("gameover").style.display = "none";
        //change button text to 'reset game'
        document.getElementById("startreset").innerHTML = "Reset Game";
        //reduce time by 1 each second
        startCountdown();
        
        //generate new questions and answers
        
        generateQA();
        //no=gameover
    }
}

for(g=1;g<5;g++) {
    document.getElementById("choice"+g).onclick = function() {
        if(playing==true) {
            if(this.innerHTML == correct) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("incorrect");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                hide("correct");
                show("incorrect");
                setTimeout(function(){
                    hide("incorrect");
                }, 1000);

            }
        }
    }
}
//answer box is clicked
    //if we are playing
        //check if answer is correct
            //yes
                //increase score by 1
                //show 'correct' box for 1 sec
                //generate new questions and answers
            //no
                //show 'try again' box for a sec
    //if we are not playing
        //no action

function startCountdown() {
        var counter = document.getElementById("timeremval");
        var myCounter = setInterval(function(){x--;counter.innerHTML = x;
                                              if(x == 0) {
                                                  clearInterval(myCounter);
                                                  document.getElementById("gameover").style.display = "block";
                                                  document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>";
                                                  document.getElementById("timerem").style.display = "none";
                                                  document.getElementById("correct").style.display = "none";
                                                  document.getElementById("incorrect").style.display = "none";
                                                  playing = false;
                                                  document.getElementById("startreset").innerHTML = "Start Game";
                                                  x = y;
                                                }
                                              },1000);
}
function generateQA() {
    var firstQ = 1+Math.round(9*Math.random());
    var secQ = 1+Math.round(9*Math.random());
    correct = firstQ*secQ;
    
    document.getElementById("question").innerHTML = firstQ + "x" + secQ;
    
    var correctPos = 1+Math.round(3*Math.random());
    document.getElementById("choice"+correctPos).innerHTML = correct;
    
    var allAns = [correct];
    
    for(i=1;i<5; i++) {
        if (i !== correctPos) {
            var wrongAns;
            do {
                wrongAns = 1+Math.round(9*Math.random()) * 1+Math.round(9*Math.random());
            }
            while(allAns.indexOf(wrongAns)>-1) {
                document.getElementById("choice"+i).innerHTML = wrongAns;
                allAns.push(wrongAns);
            }
        }
    }
}
function hide(element_id) {
    document.getElementById(element_id).style.display = "none";
}
function show(element_id) {
    document.getElementById(element_id).style.display = "block";
}