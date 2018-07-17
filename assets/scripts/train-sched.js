/* global moment firebase */


//Initialize Fifebase

<script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDXdKKjmL5stz2Uiwpuk1KXF-qjR6ePMlE",
    authDomain: "newclass-3a213.firebaseapp.com",
    databaseURL: "https://newclass-3a213.firebaseio.com",
    projectId: "newclass-3a213",
    storageBucket: "newclass-3a213.appspot.com",
    messagingSenderId: "479660177875"
  };

  firebase.initializeApp(config);

  //create a variable to reference the database  
    var database = firebase.database.ref();
    
  //Initial Values
    var trainName = "";
    var destination = "";
    var frequency = "";
    var nextArrival = "";
    var timeLeft = "";


//   -----------------------------------------------------------
 // Capture Button click
 $("submit").on ("click", function(event) {
     //keep the page from refreshing
     event.preventDefault();

     trainName = $("inputTrainName").val().trim();
     destination = $("inputDestination").val().trim();
     frequency = $("inputFrequency").val().trim();
     nextArrival = $("inputNextArrival").val().trim();
     timeLeft = $("inputTimeLeft").val().trim();



 });

 
<script src="https://code.jquery.com/jquery.js"></script>


 