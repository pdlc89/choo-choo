$(document).ready(function(){

 var rowCount = 0
 var train = "";
 var destination = "";
 var time = "";
 var rate = "";
 var ETA = "";
 var timeToNow= "";
 var indexValue = 0;
 var scheduleArray= [];
 var config = {
    apiKey: "AIzaSyBc1vpsODNRDj_ThM4d60goiTdCqIYkfMQ",
    authDomain: "inclassassingment.firebaseapp.com",
    databaseURL: "https://inclassassingment.firebaseio.com",
    projectId: "inclassassingment",
    storageBucket: "inclassassingment.appspot.com",
    messagingSenderId: "606129301949"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//functions Area
function fireBaseUpdate() {
   database.ref().push({
    train: train,
    destination: destination,
    time: time,
    ETA: ETA,

    database: firebase.database.ServerValue.TIMESTAMP
  });
}
 function appendHTML() {
  var arrayVH = parseInt(indexValue);
  var arrayVC = arrayVH - 1;
 var tr = $('<tr>')
  .append($('<td id="index">').text(indexValue))
  .append($('<td>').text(scheduleArray[arrayVC].train))
  .append($('<td>').text(scheduleArray[arrayVC].destination))
  .append($('<td>').text(scheduleArray[arrayVC].rate))
  .append($('<td>').text(scheduleArray[arrayVC].nextArrival))
  .append($('<td>').text(scheduleArray[arrayVC].timeToNow));
  tr.attr("id", indexValue);
  $('tbody').append(tr)
  
 }
 function retrieveData() {
  train = $("#train").val();
  destination = $("#destination").val();
  time = $("#time").val();
  rate = $("#rate").val();
 }
 function indexNumber() {
  for (var i = 0; i < scheduleArray.length; i++) {
    //$("#index").empty();
    $("#index").text('' + i);
  };
 };
 function timefunction() {
    var format = "hh:mm";
    var period = moment(time, format);
    var periodElm = moment().diff(period, "minutes");
    rate = parseInt(rate);
    
    periodElm = parseInt(periodElm);
    var mathElm =  Math.floor(periodElm/rate);
    
    var nextArrival = Math.floor((mathElm + 1) * rate);
    var h = nextArrival / 60 | 0;
    var m = nextArrival % 60 | 0;
    var timeDiff = moment.utc().hours(h).minutes(m).format("hh:mm");

    
    var adjTime = moment(time,'hh:mm')
    adjTime.add(nextArrival, "m");
    ETA = adjTime.format("HH:mm");
    var testElm = moment([ETA]).from();
   

 }

//buttoon logic area
  $('#submit').on('click', function () {
    ++indexValue;
    retrieveData();
    timefunction();
    var data = {};
    data.train = train;
    data.destination = destination;
    data.rate = rate;  
    data.nextArrival = ETA;
    data.timeToNow = timeToNow;
    scheduleArray.push(data);
      fireBaseUpdate();
      appendHTML();
      $("input").val("");

  });

  $("#update").on("click", function(){

    retrieveData();
    var holder = $("#renew").val();
    
    holder = parseInt(holder);
    var arrayValue = holder - 1;
    

    $("tbody > #" + holder).remove();

    $("#"+ holder)
    .append($('<td>').text(holder))
    .append($('<td>').text(train))
    .append($('<td>').text(destination))
    .append($('<td>').text(time))
    .append($('<td>').text(ETA))
    .attr("id", holder);
    
    var updateValue = arrayValue;
    var removeElm = 1;
    scheduleArray.splice(updateValue,removeElm);

    var data = {};
    data.train = train;
    data.destination = destination;
    data.rate = rate;  
    data.nextArrival = ETA;
    data.timeToNow = timeToNow;
    scheduleArray.push(data);

    appendHTML();

   
    $("input").val("");
    fireBaseUpdate()
  });
//deletes the row and changes the index value
  $("#delete").on("click", function(){
    var holder = $("#anul").val();
    
    holder = parseInt(holder);
    var arrayValue = holder - 1;
    

    $("tbody > #" + holder).remove();

    var updateValue = arrayValue;
    var removeElm = 1;
    scheduleArray.splice(updateValue,removeElm);

    indexNumber();

    $("input").val("");

  });

  

});