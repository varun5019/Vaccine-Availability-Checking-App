var states;
var sid;
var today = new Date();
// $("#jq").click(function(){
//     var api = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
//     $.getJSON( api, function( json ) {
//         console.log(json.states)
//         states = json.states;
//        });
// });
$(document).ready(function () {
  getstate();
  $("#statelist").change(function () {
    getdist();
  });
});


function getstate() {
  var api = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
  $.getJSON(api, function (json) {
    console.log(json.states)
    states = json.states;
  });
}

function putstate() {
  $.each(states, function (i) {
    console.log(states[i]);
    var statename = JSON.stringify(states[i].state_name);
    var state = statename.toString().replaceAll("\"", "");
    var stateid = JSON.stringify(states[i].state_id);
    sid = stateid.toString().replaceAll("\"", "");
    temp = '<option value=' + sid + '>' + state + '</option>';
    $('#statelist').append(temp);
  });
}
// var val = document.getElementById('tbody2');
var test;
var temp = "";
var districts;

function getdist() {
  test = $("#statelist :selected").val();
  console.log(test);
  var api = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + test;
  $.getJSON(api, function (json) {
    console.log(json.districts)
    districts = json.districts;
    // console.log( "JSON Data: " + json.states[1].state_id + json.states[1].state_name );
  });
}
function putdist() {
  $.each(districts, function (i) {
    console.log(districts[i]);
    var distname = JSON.stringify(districts[i].district_name);
    var distnamev = distname.toString().replaceAll("\"", "");
    var distid = JSON.stringify(districts[i].district_id);
    temp = '<option value=' + distid + '>' + distnamev + '</option>';
    $('#tbody1').append(temp);
  });
}
var resultid;

// function result(){
//   resultid = $("#tbody1 :selected").val();
//     console.log(resultid);
//     var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
//     var api = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+resultid+'&date='+date;
//     $.getJSON( api, function( json ) {
//         console.log(json.sessions)
//         districts = json.districts;
//         // console.log( "JSON Data: " + json.states[1].state_id + json.states[1].state_name );
//        });
// }
function notice(){
  window.location="./form.html";
}
function resultcards() {
  document.getElementById('backshow').style.display = "block";
  document.getElementById('show').style.display = "block";
  document.getElementById('hide').style.display = "none";
  document.getElementById('siic').style.display = "none";
  // window.location = "./results.html"

  $.each(sessions, function (i) {
    console.log(sessions[i]);
    var statename = JSON.stringify(sessions[i].name);
    statename = statename.toString().replaceAll("\"", "");

    var stateid = JSON.stringify(sessions[i].center_id);

    var address = JSON.stringify(sessions[i].address);
    address = address.toString().replaceAll("\"", "");

    var capacity = JSON.stringify(sessions[i].available_capacity);

    var vaccine = JSON.stringify(sessions[i].vaccine);
    vaccine = vaccine.toString().replaceAll("\"", "");

    var slotd = JSON.stringify(sessions[i].from);

    var date = JSON.stringify(sessions[i].date);
    date = date.toString().replaceAll("\"", "");

    var price = JSON.stringify(sessions[i].fee_type);
    price = price.toString().replaceAll("\"", "");

    console.log(statename, stateid, capacity);
    if (capacity > 0) {
      var temp = '<div class="card-cont" id="crd-cont" onclick="cowin()"><div class="card border-light mb-3" style="width: 85%;"><div class="row g-0"><div class="col-md-4 l-card"><h5 style="font-weight: 700; font-size:1em;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 2em;">' + capacity + '</h1><h6>' + vaccine + '</h6></div><div class="col-md-8"><div class="card-body" style="height: 100%"><p style="font-weight: 700; margin-bottom: 10px;">' + date + '</p><p style="font-weight: 700; margin-bottom: 5px;">' + statename + '</p><p style=" margin-bottom: 10px;">' + address + '</p><div class="price"><h5 style="font-weight: 700; font-size: 1em; text-transform: uppercase;">' + price + '</h5></div></div></div></div></div></div>';

      $('#show').append(temp);
    }
    else{
      var temp = '<div class="card-cont" id="crd-cont" onclick="notice()"><div class="card border-light mb-3" style="width: 85%;"><div class="row g-0"><div class="col-md-4 l-card"><h5 style="font-weight: 700; font-size:1em;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 2em;">' + capacity + '</h1><h6>' + vaccine + '</h6></div><div class="col-md-8"><div class="card-body" style="height: 100%"><p style="font-weight: 700; margin-bottom: 10px;">' + date + '</p><p style="font-weight: 700; margin-bottom: 5px;">' + statename + '</p><p style=" margin-bottom: 10px;">' + address + '</p><p style="font-weight: 700;">Notify Me</p><div class="price"><h5 style="font-weight: 700; font-size: 1em; text-transform: uppercase;">' + price + '</h5></div></div></div></div></div></div>';

      $('#show').append(temp);
    }
  });

}


function result() {
  resultid = $("#tbody1 :selected").val();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  if (date != "") {
    console.log(date);
    $.getJSON('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=' + resultid + '&date=' + date)
      .done(function (json) {
        console.log(json.sessions);
        sessions = json.sessions;
        if (sessions.length == 0) {
          //   alert("Sorry no slot available");
          document.getElementById('warn').style.display = "block";
          document.getElementById('noti').style.display = "block";
        }
        else {
          resultcards();
          // putstate();
        }
      });
  }
  else {
    console.log("vishuddh")
  }

}


// FILTERS

$('#agef').click(function () {
  $('#show').empty();
  $.each(sessions, function (i) {
    var statename = JSON.stringify(sessions[i].name);
    statename = statename.toString().replaceAll("\"", "");

    var stateid = JSON.stringify(sessions[i].center_id);
    agey = JSON.stringify(sessions[i].min_age_limit);

    var address = JSON.stringify(sessions[i].address);
    address = address.toString().replaceAll("\"", "");

    var capacity = JSON.stringify(sessions[i].available_capacity);

    var vaccine = JSON.stringify(sessions[i].vaccine);
    vaccine = vaccine.toString().replaceAll("\"", "");

    var slotd = JSON.stringify(sessions[i].from);

    var date = JSON.stringify(sessions[i].date);
    date = date.toString().replaceAll("\"", "");

    var price = JSON.stringify(sessions[i].fee_type);
    price = price.toString().replaceAll("\"", "");

    // console.log(statename,stateid,capacity);
    // console.log(vaccine.toString().replaceAll("\"", ""));
    // temp = '<option value='+stateid+'>'+statename+'</option>';
    // temp = '<tr> <th scope="row">1</th><td>' +sessions[i].name+'</td> <td>'+sessions[i].available_capacity+'</td> <td>'+sessions[i].address+'</td> </tr>';
    // $('#tbody1').append(temp);

    // var temp = '<div class="card vaccine-card"> <div class="card-body vaccine-card-body" > <h5 class="card-title">'+statename+'</h5> <p class="card-text">'+address+'</p> <p>Slot:'+capacity+'</p> <button type="button" class="btn btn-outline-primary" class= "timing-button">'+slotd+'</button> </div> </div>';

    var temp = '<div class="card-cont" id="crd-cont" onclick="cowin()"><div class="card border-light mb-3" style="width: 85%;"><div class="row g-0"><div class="col-md-4 l-card"><h5 style="font-weight: 700; font-size:1em;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 2em;">' + capacity + '</h1><h6>' + vaccine + '</h6></div><div class="col-md-8"><div class="card-body" style="height: 100%"><p style="font-weight: 700; margin-bottom: 10px;">' + date + '</p><p style="font-weight: 700; margin-bottom: 5px;">' + statename + '</p><p style=" margin-bottom: 10px;">' + address + '</p><div class="price"><h5 style="font-weight: 700; font-size: 1em; text-transform: uppercase;">' + price + '</h5></div></div></div></div></div></div>';

    // var temp = '<div class="card-cont"> <div class="card border-light mb-3" style="width: 85%;"><> <div class="row g-0"> <div class="col-md-4 l-card"> <h5 style="font-weight: 700;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 4em;">'+capacity+'</h1> <h6>'+vaccine+'</h6> </div> <div class="col-md-8"> <div class="card-body"> <h1>'+statename+'</h1> <p>'+address+'</p> <p class="date">'+date+'</p> </div> </div> </div> </div> </div>';
    if (agey === "45") {
      if (capacity > 0) {
        $('#show').append(temp);
        console.log("appended")
      }
      else {
        console.log("blahh");
        document.getElementById('warn').style.display = "block";
        document.getElementById('noti').style.display = "block";
      }

    }
  })
})
$('#age').click(function () {
  $('#show').empty();
  $.each(sessions, function (i) {
    var statename = JSON.stringify(sessions[i].name);
    statename = statename.toString().replaceAll("\"", "");

    var stateid = JSON.stringify(sessions[i].center_id);
    agey = JSON.stringify(sessions[i].min_age_limit);

    var address = JSON.stringify(sessions[i].address);
    address = address.toString().replaceAll("\"", "");

    var capacity = JSON.stringify(sessions[i].available_capacity);

    var vaccine = JSON.stringify(sessions[i].vaccine);
    vaccine = vaccine.toString().replaceAll("\"", "");

    var slotd = JSON.stringify(sessions[i].from);

    var date = JSON.stringify(sessions[i].date);
    date = date.toString().replaceAll("\"", "");

    var price = JSON.stringify(sessions[i].fee_type);
    price = price.toString().replaceAll("\"", "");

    // console.log(statename,stateid,capacity);
    // console.log(vaccine.toString().replaceAll("\"", ""));
    // temp = '<option value='+stateid+'>'+statename+'</option>';
    // temp = '<tr> <th scope="row">1</th><td>' +sessions[i].name+'</td> <td>'+sessions[i].available_capacity+'</td> <td>'+sessions[i].address+'</td> </tr>';
    // $('#tbody1').append(temp);

    // var temp = '<div class="card vaccine-card"> <div class="card-body vaccine-card-body" > <h5 class="card-title">'+statename+'</h5> <p class="card-text">'+address+'</p> <p>Slot:'+capacity+'</p> <button type="button" class="btn btn-outline-primary" class= "timing-button">'+slotd+'</button> </div> </div>';

    var temp = '<div class="card-cont" id="crd-cont" onclick="cowin()"><div class="card border-light mb-3" style="width: 85%;"><div class="row g-0"><div class="col-md-4 l-card"><h5 style="font-weight: 700; font-size:1em;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 2em;">' + capacity + '</h1><h6>' + vaccine + '</h6></div><div class="col-md-8"><div class="card-body" style="height: 100%"><p style="font-weight: 700; margin-bottom: 10px;">' + date + '</p><p style="font-weight: 700; margin-bottom: 5px;">' + statename + '</p><p style=" margin-bottom: 10px;">' + address + '</p><div class="price"><h5 style="font-weight: 700; font-size: 1em; text-transform: uppercase;">' + price + '</h5></div></div></div></div></div></div>';

    // var temp = '<div class="card-cont"> <div class="card border-light mb-3" style="width: 85%;"><> <div class="row g-0"> <div class="col-md-4 l-card"> <h5 style="font-weight: 700;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 4em;">'+capacity+'</h1> <h6>'+vaccine+'</h6> </div> <div class="col-md-8"> <div class="card-body"> <h1>'+statename+'</h1> <p>'+address+'</p> <p class="date">'+date+'</p> </div> </div> </div> </div> </div>';
    if (agey === "18") {
      $('#show').append(temp);
      console.log("appended")
    }
    else {
      console.log("blahh");
      document.getElementById('warn').style.display = "block";
      document.getElementById('noti').style.display = "block";
    }
  })
})
$('#covis').click(function () {
  $('#show').empty();
  $.each(sessions, function (i) {
    var statename = JSON.stringify(sessions[i].name);
    statename = statename.toString().replaceAll("\"", "");

    var stateid = JSON.stringify(sessions[i].center_id);
    agey = JSON.stringify(sessions[i].min_age_limit);

    var address = JSON.stringify(sessions[i].address);
    address = address.toString().replaceAll("\"", "");

    var capacity = JSON.stringify(sessions[i].available_capacity);

    var vaccine = JSON.stringify(sessions[i].vaccine);
    vaccine = vaccine.toString().replaceAll("\"", "");

    var slotd = JSON.stringify(sessions[i].from);

    var date = JSON.stringify(sessions[i].date);
    date = date.toString().replaceAll("\"", "");

    var price = JSON.stringify(sessions[i].fee_type);
    price = price.toString().replaceAll("\"", "");

    // console.log(statename,stateid,capacity);
    // console.log(vaccine.toString().replaceAll("\"", ""));
    // temp = '<option value='+stateid+'>'+statename+'</option>';
    // temp = '<tr> <th scope="row">1</th><td>' +sessions[i].name+'</td> <td>'+sessions[i].available_capacity+'</td> <td>'+sessions[i].address+'</td> </tr>';
    // $('#tbody1').append(temp);

    // var temp = '<div class="card vaccine-card"> <div class="card-body vaccine-card-body" > <h5 class="card-title">'+statename+'</h5> <p class="card-text">'+address+'</p> <p>Slot:'+capacity+'</p> <button type="button" class="btn btn-outline-primary" class= "timing-button">'+slotd+'</button> </div> </div>';

    var temp = '<div class="card-cont" id="crd-cont" onclick="cowin()"><div class="card border-light mb-3" style="width: 85%;"><div class="row g-0"><div class="col-md-4 l-card"><h5 style="font-weight: 700; font-size:1em;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 2em;">' + capacity + '</h1><h6>' + vaccine + '</h6></div><div class="col-md-8"><div class="card-body" style="height: 100%"><p style="font-weight: 700; margin-bottom: 10px;">' + date + '</p><p style="font-weight: 700; margin-bottom: 5px;">' + statename + '</p><p style=" margin-bottom: 10px;">' + address + '</p><div class="price"><h5 style="font-weight: 700; font-size: 1em; text-transform: uppercase;">' + price + '</h5></div></div></div></div></div></div>';

    // var temp = '<div class="card-cont"> <div class="card border-light mb-3" style="width: 85%;"><> <div class="row g-0"> <div class="col-md-4 l-card"> <h5 style="font-weight: 700;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 4em;">'+capacity+'</h1> <h6>'+vaccine+'</h6> </div> <div class="col-md-8"> <div class="card-body"> <h1>'+statename+'</h1> <p>'+address+'</p> <p class="date">'+date+'</p> </div> </div> </div> </div> </div>';
    if (vaccine == "COVISHIELD") {
      $('#show').append(temp);
      console.log("appended")
    }
    else {
      console.log("blahh");
      document.getElementById('warn').style.display = "block";
      document.getElementById('noti').style.display = "block";
    }
  })
})
$('#covax').click(function () {
  $('#show').empty();
  $.each(sessions, function (i) {
    var statename = JSON.stringify(sessions[i].name);
    statename = statename.toString().replaceAll("\"", "");

    var stateid = JSON.stringify(sessions[i].center_id);
    agey = JSON.stringify(sessions[i].min_age_limit);

    var address = JSON.stringify(sessions[i].address);
    address = address.toString().replaceAll("\"", "");

    var capacity = JSON.stringify(sessions[i].available_capacity);

    var vaccine = JSON.stringify(sessions[i].vaccine);
    vaccine = vaccine.toString().replaceAll("\"", "");

    var slotd = JSON.stringify(sessions[i].from);

    var date = JSON.stringify(sessions[i].date);
    date = date.toString().replaceAll("\"", "");

    var price = JSON.stringify(sessions[i].fee_type);
    price = price.toString().replaceAll("\"", "");

    // console.log(statename,stateid,capacity);
    // console.log(vaccine.toString().replaceAll("\"", ""));
    // temp = '<option value='+stateid+'>'+statename+'</option>';
    // temp = '<tr> <th scope="row">1</th><td>' +sessions[i].name+'</td> <td>'+sessions[i].available_capacity+'</td> <td>'+sessions[i].address+'</td> </tr>';
    // $('#tbody1').append(temp);

    // var temp = '<div class="card vaccine-card"> <div class="card-body vaccine-card-body" > <h5 class="card-title">'+statename+'</h5> <p class="card-text">'+address+'</p> <p>Slot:'+capacity+'</p> <button type="button" class="btn btn-outline-primary" class= "timing-button">'+slotd+'</button> </div> </div>';

    var temp = '<div class="card-cont" id="crd-cont" onclick="cowin()"><div class="card border-light mb-3" style="width: 85%;"><div class="row g-0"><div class="col-md-4 l-card"><h5 style="font-weight: 700; font-size:1em;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 2em;">' + capacity + '</h1><h6>' + vaccine + '</h6></div><div class="col-md-8"><div class="card-body" style="height: 100%"><p style="font-weight: 700; margin-bottom: 10px;">' + date + '</p><p style="font-weight: 700; margin-bottom: 5px;">' + statename + '</p><p style=" margin-bottom: 10px;">' + address + '</p><div class="price"><h5 style="font-weight: 700; font-size: 1em; text-transform: uppercase;">' + price + '</h5></div></div></div></div></div></div>';

    // var temp = '<div class="card-cont"> <div class="card border-light mb-3" style="width: 85%;"><> <div class="row g-0"> <div class="col-md-4 l-card"> <h5 style="font-weight: 700;">Number of Slots</h5> <h1 style="font-weight: 700; font-size: 4em;">'+capacity+'</h1> <h6>'+vaccine+'</h6> </div> <div class="col-md-8"> <div class="card-body"> <h1>'+statename+'</h1> <p>'+address+'</p> <p class="date">'+date+'</p> </div> </div> </div> </div> </div>';
    if (vaccine == "COVAXIN") {
      $('#show').append(temp);
      console.log("appended")
    }
    else {
      console.log("blahh");
      document.getElementById('warn').style.display = "block";
      document.getElementById('noti').style.display = "block";
    }
  })
})