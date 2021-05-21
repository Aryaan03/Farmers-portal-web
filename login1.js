var iii=document.getElementById("loginform").addEventListener('submit', submitForm);


function submitForm(e){
    console.log("aa");
    e.preventDefault();
    var passw=document.loginform.psw.value;
    var nam=document.loginform.uname.value;
    var apost=nam.indexOf("@");
    var dpost=nam.lastIndexOf(".");
  
      if(passw.length<7){
         alert("Password must have minimum 7 Characters");
         return false;
      }
      if(apost<1 || dpost<apost+2 || dpost+2>=nam.length){
         alert("Please enter a valid e-mail address");
         return false;
      }
    // Get values  
    var password = passw;
    var email=nam;
    console.log(email+" "+password);
    // Save message
    saveMessage(email, password);
    
      
      
      //document.getElementById('login_form').reset();
    //document.getElementById('login_name_h').innerHTML="";
  
  }
  function saveMessage(email, password){
    console.log(email+" "+password);
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        alert("loged in successfully"); 
        
      window.location.replace("home.html");
    }).catch(err => {
      loginform.querySelector('.error').innerHTML = err.message;
    });
  }