console.log("game.js loaded");


// Variable & Function Declarations
//==================================
  var time = 30;
  var correct = 0;
  var incorrect = 0;
  var misses = 0;
  var timer; // interval timer

  Chose to store questions as an array of objects.
  var questions = [
    { 
      name: "Question 1?",
      answer: "true"
    },
    {
      name: "Question 2?",
      answer: "false"
    },
    {
      name: "Question 3?",
      answer: "true"
    }
  ];

  // Checks question answers tabulating correct, incorrrect, and misses. Then displays to page.
  function checkAnswers(){
    
    //this stops out interval timer
    clearInterval(timer); 

    for(var i = 0; i < questions.length; i++){

      // Use jQuery to traverse dom getting value of input element with name of 'q'+i thats checked 
      var answer = $("input[name=q" + i + "]:checked").val();

      // answer will be undefined if no inputs checked
      if(answer === undefined){
        misses++;
      }       
      else if(answer === questions[i].answer){
        correct++;
      }else{
        incorrect++;
      } 
    } 


    $("#content").empty();
    $("#content").append("<h1>All Done!</h1>");
    
    $("#content").append("<h3>Correct: "+ correct + "</h3>"); 
    $("#content").append("<h3>Incorrect:"+ incorrect + "</h3>");
    $("#content").append("<h3>Misses:"+ misses + "</h3>");

  }

// Game Logic
//=================================

$(document).ready(function(){

  $("#start-button").on("click", function(){

    //test button click
    console.log("button clicked");
    
    //clears div content.
     $("#content").empty();

    // // Appends h1 tag for timer.
     $("#content").append("<h1>Time: <span id='time'>30</></h1>");

    //Interval Timer.
    // Every 1s (1000ms) callback function is executed.
    timer = setInterval(function(){
      time--;
      $("#time").html(time);

      //condition to check questions (timer is cleared inside checkAnsers())
      if(time < 1){ 
        
        checkAnswers();
      } 
    }, 1000);
    
    // Here we use a for loop and jQuery to dynamically generate our html for each question.
    for(var i = 0; i < questions.length; i++){
      $("#content").append("<p class='questions'>" + questions[i].name + "</p>");
      $("#content").append("<label class='radio-inline'><input type='radio' name=q" + i + " value='true'>True</label>");
      $("#content").append("<label class='radio-inline'><input type='radio' name=q" + i + " value='false'>False</label>");
    }                             

    // Dynamically generate 'Done' button.
    $("#content").append("<br><br><br><br><button id='done'>DONE</button>");

  });

  //jQuery on 'click' for 'Done' button. (see note below)
  $(document).on("click", "#done", function(){

    checkAnswers();
  });

  //This will not work because element was dynamically generated.
  // #done button did not exist when page loaded.
  /*
    $("#done").on("click", function(){
      console.log("done clicked")
    });
  */
});



/*  // Example Question/input html template
  
  // *Note name must be same for each question to group inputs, but unique for different questions.
  <p class="question">What is the answer to this question?</p>
  <label class="radio-inline"><input type="radio" name="q0" value="true">True</label>
  <label class="radio-inline"><input type="radio" name="q0" value="false">False</label>

