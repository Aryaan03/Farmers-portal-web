// Reference messages collection
//var messagesRef = firebase.database.databaseURL().ref('message');

// Listen for form submit
document.getElementById('signupForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name=signupForm['name'].value;
  
  var password = signupForm['password'].value;
  var email=signupForm['email'].value;
  
  // Save message
  saveMessage(name, email, password);

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
function saveMessage(name, email, password){
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        name: name
      });
    }).then(() => {
 });
}