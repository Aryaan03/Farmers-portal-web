// Initialize Firebase 
var config = {
    apiKey: "AIzaSyAhhdZij4A7sbATb0cdSf-Um8ZtS-GIqBM",
    authDomain: "farmersportal-b1d87.firebaseapp.com",
    databaseURL: "https://farmersportal-b1d87-default-rtdb.firebaseio.com",
    projectId: "farmersportal-b1d87",
    storageBucket: "farmersportal-b1d87.appspot.com",
    messagingSenderId: "213265871299",
    appId: "1:213265871299:web:2a018df02bd47daa1d0d76",
    measurementId: "G-JQFQK62JJW"
  };
  firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database.databaseURL().ref('message');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var phone = getInputVal('phone');

  // Save message
  saveMessage(name, email, phone);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    phone:phone
  });
}