

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
// Capture  sumbit Button click 
$("#submit").on("click", function (event) {
  //keep the page from refreshing
  event.preventDefault();

  trainName = $("#inputTrainName").val().trim();
  destination = $("#inputDestination").val().trim();
  frequency = $("#inputFrequency").val().trim();


      console.log(trainName);
      console.log(destination);
      console.log(frequency);
    
  //New Train object for firebase.
  var newTrain = {
    trainName: trainName,
    destination: destination,
    frequency: frequency,
  };

  // Push the initial row to firebase
  database.ref().push(newTrain);
  console.log(database);


  //clear Input form values
  $("#inputTrainName").val("");
  $("#inputDestination").val("");
  $("#inputFrequency").val("");



});


// Adds new records to firebase 
database.ref().on("child_added", function (snapshot) {

      console.log(snapshot.val());
      console.log(snapshot.key);
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().frequency);

  //Grab Key so that it can be used to delete record
  key = snapshot.key;

  // grab current time to use to calulate diff in time arrival
  var currentTime = moment().format("HH:mm a");

//place time on table
  $("#local-time").text("Current Local Time: " + currentTime);
      console.log(currentTime);

//add frequency time
  newTrainSnapshot = snapshot.val();
  nextArrival = moment(currentTime, "HH:mm").add(newTrainSnapshot.frequency, "minutes").format("HH:mm");

//Calulate mins left
  var convertedDate = moment(nextArrival, "HH:mm a").format("LT");
  var cTime = moment(nextArrival, "hh:mm a");
  timeLeft = -1 * (moment(moment()).diff(cTime, "minutes"));

      console.log(convertedDate);
      console.log(cTime);
      console.log(timeLeft);

  //create data row for the table
  var newRow = $("<tr>")
  var td0 = $("<td>").text(newTrainSnapshot.trainName);
  var td1 = $("<td>").text(newTrainSnapshot.destination);
  var td2 = $("<td>").text(newTrainSnapshot.frequency);
  var td3 = $("<td>").text(nextArrival);
  var td4 = $("<td>").text(timeLeft);

  var button = $("<button>");
  button.addClass("del-btn");
  button.attr("data-key", key);
  button.text("Delete");

  newRow.append(td0).append(td1).append(td2).append(td3).append(td4).append(button);
  $("#tbody").append(newRow)

      console.log($("#tbody"));
      console.log($("<tr>").text(newTrainSnapshot.trainName));
      console.log($("<td>").text(newTrainSnapshot.destination));
      console.log($("<td>").text(newTrainSnapshot.frequency));
      console.log($("<td>").text(newTrainSnapshot.nextArrival));

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

//on click for delete button
$(document).on("click", ".del-btn", function () {
  //keep the page from refreshing
  event.preventDefault();

  //get the Key from the butoom
  var deleteKey = $(this).attr("data-key");
  console.log(deleteKey);

  //delete data row from parent
  database.ref().child(deleteKey).remove();

  //delete the row from the table
  $(this).parent().remove();

});
