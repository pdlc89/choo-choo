$(document).ready(function(){

 var rowCount = 0
 var train = "";
 var destination = "";
 var time = "";
 var rate = "";
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
function serverUpdate() {
         database.ref().push({
          train: train,
          destination: destination,
          time: time,
          rate: rate,

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
          .append($('<td>').text(scheduleArray[arrayVC].time))
          .append($('<td>').text(scheduleArray[arrayVC].rate));
          tr.attr("id", indexValue);
        $('tbody').append(tr)
        $("input").val("");
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
      $("#index").text(i);
      }
  };
//buttoon logic area
     $('#submit').on('click', function () {
        ++indexValue;
          retrieveData();
          var data = {};
          data.train = train;
          data.destination = destination;
          data.time = time;  
          data.rate = rate;
          scheduleArray.push(data);
          //
          //serverUpdate();
         
          console.log(scheduleArray);
          appendHTML();
      });

      $("#update").on("click", function(){
        retrieveData();
          var holder = $("#renew").val();
          console.log(holder);
          holder = parseInt(holder);
          var arrayValue = holder - 1;
          console.log("this is your: " + arrayValue);

          $("tbody > #" + holder).empty();

        $("#"+ holder)
          .append($('<td>').text(holder))
          .append($('<td>').text(train))
          .append($('<td>').text(destination))
          .append($('<td>').text(time))
          .append($('<td>').text(rate))
          .attr("id", holder);
          
          $("input").val("");



      });

      $("#delete").on("click", function(){
          var holder = $("#anul").val();
          console.log(holder);
          holder = parseInt(holder);
          var arrayValue = holder - 1;
          console.log("this is your: " + arrayValue);

        $("tbody > #" + holder).empty();

        indexNumber();

      });






});