$(document).ready(function(){

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
    var arrayVH = scheduleArray.length;
    var elm = $("td > #").index(this);
    console.log("index of: " + elm)
  //var arrayVH = parseInt(indexValue);
  var arrayVC = arrayVH - 1;
            
        var tr = $('<tr>')
          .append($('<td id="index">').text(arrayVH))
          .append($('<td>').text(scheduleArray[arrayVC].train))
          .append($('<td>').text(scheduleArray[arrayVC].destination))
          .append($('<td>').text(scheduleArray[arrayVC].time))
          .append($('<td>').text(scheduleArray[arrayVC].rate));
          tr.attr("id", indexValue);
        $('tbody').append(tr)
        $("input").val("");
         var train = "";
         var destination = "";
         var time = "";
         var rate = "";
 }
 function retrieveData() {
        train = $("#train").val();
        destination = $("#destination").val();
        time = $("#time").val();
        rate = $("#rate").val();

          
          var data = {};
          data.train = train;
          data.destination = destination;
          data.time = time;  
          data.rate = rate;
          scheduleArray.push(data);

 }

//buttoon logic area
     $('#submit').on('click', function () {
        ++indexValue;
        retrieveData();
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
          
          $("tbody > #" + holder).remove();

          var updateValue = arrayValue;
          var removeElm = 1;
          scheduleArray.splice(updateValue,removeElm);
          $("input").val("");
          appendHTML();
          console.log(scheduleArray);
          
      });

      $("#delete").on("click", function(){
          var holder = $("#anul").val();
          console.log(holder);
          holder = parseInt(holder);
          var arrayValue = holder - 1;
          console.log("this is your: " + arrayValue);

          $("tbody > #" + holder).remove();

          var updateValue = arrayValue;
          var removeElm = 1;
          scheduleArray.splice(updateValue,removeElm);
          $("input").val("");

      });






});