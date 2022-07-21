var firebaseConfig = {
  apiKey: "AIzaSyAzaJE7sUZZ-S_-pgb37-5-WhrfAgMQISI",
  authDomain: "checkforvaccine.firebaseapp.com",
  databaseURL: "https://checkforvaccine-default-rtdb.firebaseio.com",
  projectId: "checkforvaccine",
  storageBucket: "checkforvaccine.appspot.com",
  messagingSenderId: "940558363211",
  appId: "1:940558363211:web:eeff6cb0999d4780a73bce",
  measurementId: "G-1LZMJ6007H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var uname=null, upin=null, unumber=null;

function ready(){
  uname = document.getElementById('fname').value;
  upin = document.getElementById('fpin').value;
  unumber = document.getElementById('fnumber').value;
}

function submit(){
  ready();
  console.log(uname);
    // ----------------FOR STORING THE USER DATA AFTER VERIFYING THE PHONE NUMBER-----------------
    firebase.database().ref('Users/' + unumber).set({
      Name: uname,
      Pincode : upin,
      Number: unumber,
    });
}

function done(){
  document.getElementById('done').style.display="block";
}



// Phone auth




window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "search",
  {
    'size':'invisible',
    'callback': function(response){
      phoneAuth();
      document.getElementById('hide').style.display="none"
      document.getElementById('show').style.display="block"
    }

  }
);
function phoneAuth(){ 
  console.log("sent")
  var phoneNumber = $("#fnumber").val();
  // $("input[name='phone_number[full]'").val(phoneNumber);
 
  var verifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber('+91'+phoneNumber,verifier)
  .then(function(confirmationResult){
    window.confirmationResult = confirmationResult;
  })
  .catch(function(error){
    // alert(error);
  });
}

function codeVerify(){
  var code = document.getElementById("OTPCode").value;
  confirmationResult.confirm(code)
  .then(function(result){
    var user = result.user;
    submit();
    // alert("otp verified");
    document.getElementById('done').style.display="block";
    $("#OTPCode").val("");
  })
  .catch(function(error){
    console.log(error);
  })
}