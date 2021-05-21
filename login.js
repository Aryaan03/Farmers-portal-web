// Reference messages collection
//var messagesRef = firebase.database.databaseURL().ref('message');

// Listen for form submit
var tttt=document.getElementById("signupForm").addEventListener('submit', submitForm);


// Submit form
function validate()
      {
 
      var password = document.signupForm.password.value;
	  var repassword = document.signupForm.password.value;
      var name = document.signupForm.email.value;
      var apost = name.indexOf("@");
      var dpost = name.lastIndexOf(".");

            if(password.length<7)
        {
           alert("Password must have minimum 7 Characters");
           return false;
        }
           if(apost<1 || dpost<apost+2 || dpost+2>=name.length)
        {
           alert("Please enter a valid e-mail address");
           return false;
        }
		 if (password != repassword) {
                    alert ("Password did not match, Please try again...")
                    return false;
		}
        
      return true;
   }




function submitForm(e){

  e.preventDefault();

  // Get values
  if(validate()==true){
  var name1=signupForm['firstname'].value;
  var name2=signupForm['lastname'].value;
  var name=name1+" "+name2;
  var password = signupForm['password'].value;
  var email=signupForm['email'].value;
  // Save message
  saveMessage(name, email, password);
  setTimeout(function() {
    albar(email,password);
},1000);}
}
function albar(email,password){
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    alert("loged in successfully"); 
    
  window.location.replace("home.html");
})
  
 // document.getElementById('signupForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, password){
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        name: name
      });
    }).catch(err => {
      signupForm.querySelector('.error').innerHTML = err.message;
    });
}

