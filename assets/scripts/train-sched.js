

/* global moment firebase */
 
  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAiRUFveVYRzoTlqvEU2eRtujEMTCxGj5w",
    authDomain: "train-92517.firebaseapp.com",
    databaseURL: "https://train-92517.firebaseio.com",
    projectId: "train-92517",
    storageBucket: "",
    messagingSenderId: "812298848333"
  };

  firebase.initializeApp(config);


  //create a variable to reference the database  
    const database = firebase.database();
    
  //Initial Values
    var trainName = "";
    var destination = "";
    var frequency = "";
    var nextArrival = "";
    var timeLeft = "";
    var key;


//   -----------------------------------------------------------
 // Capture Button click
 $("#submit").on ("click", function(event) {
     //keep the page from refreshing
     event.preventDefault();


     trainName = $("#inputTrainName").val().trim();
     destination = $("#inputDestination").val().trim();
     frequency = $("#inputFrequency").val().trim();
     nextArrival = $("#inputNextArrival").val().trim();
     timeLeft = $("#inputTimeLeft").val().trim();


     console.log(trainName);
     console.log(destination);
     console.log(frequency);
     console.log(nextArrival);
     console.log(timeLeft);

  //    database.ref().push({
  //     trainName: trainName,
  //     destination: destination,
  //     frequency: frequency,
  //     nextArrival: nextArrival,
  //     timeLeft: timeLeft
  // });

  var newTrain = {
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    timeLeft: timeLeft
  
  };
  
  database.ref().push(newTrain);
  
     console.log(database);
     $("#inputTrainName").val("");
     $("#inputDestination").val("");
     $("#inputFrequency").val("");
     $("#inputNextArrival").val("");
     $("#inputTimeLeft").val("");

  
 });


 // this is the Firebase 
 database.ref().on("child_added", function(snapshot) {  

  console.log(snapshot.val());
  console.log(snapshot.key);
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().frequency);
  console.log(snapshot.val().nextArrival);
  console.log(snapshot.val().timeLeft);

  key=snapshot.key;
  //Move snapshot value to newtrainSnapshot
  // var convertedDate = moment(snapshot.val().nextAririval, "MM/DD/YYYY");
  
 // console.log(convertedDate);
  newTrainSnapshot=snapshot.val();
  
  var newRow= $("<tr>")
  var td0 = $("<td>").text(newTrainSnapshot.trainName);
  var td1 =$("<td>").text(newTrainSnapshot.destination);
  var td2 =$("<td>").text(newTrainSnapshot.frequency);
  var td3 =$("<td>").text(newTrainSnapshot.nextArrival);
  var td4 =$("<td>").text(newTrainSnapshot.timeLeft);

  $("#tbody").append(newRow).append(td0).append(td1).append(td2).append(td3).append(td4);

  console.log($("#tbody"));        
  console.log($("<tr>").text(newTrainSnapshot.trainName));
  console.log($("<td>").text(newTrainSnapshot.destination));
  console.log($("<td>").text(newTrainSnapshot.frequency));
  console.log($("<td>").text(newTrainSnapshot.nextArrival));


  



// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


