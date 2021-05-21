const cafeList = document.querySelector('.items');
var hh=``;
function adddata(doc){
    let html=`<ul class="first1" >
    <li class="item1"><img src=${doc.data().img} class="image"></li><br>
    <li style="font-size: 25px">${doc.data().name}</li><br><br>
    <li>minimum price decided<br>by government:- <span>&#8377;</span>${doc.data().desc}</li><br>
    <li>price:- <span>&#8377;</span>${doc.data().price}</li><br><br>
    <button class="button" id=${doc.id} onclick="upcart(id)">add to cart</button>

</ul>`
hh=hh+html;
  cafeList.innerHTML=hh;
}
function adddata1(doc){
    let html=`<ul class="first1" >
    <li class="item1"><img src=${doc.data().img} class="image"></li><br>
    <li style="font-size: 25px">${doc.data().name}</li><br><br>
    <li>minimum price decided<br>by government:- <span>&#8377;</span>${doc.data().desc}</li><br>
    <li>price:- <span>&#8377;</span>${doc.data().price}</li><br><br>
    <button style="background-color: grey"class="button" onclick="document.location='cart.html'">go to cart</button>

</ul>`
hh=hh+html;
  cafeList.innerHTML=hh;
}
function upcart(kk){
    var rr=document.getElementById(kk).innerHTML="go to cart";
    console.log('addd')
    db.collection('data').doc(kk).update({
        cart: true
      });
      setTimeout(myFunct1, 1000);
    }
function myFunct(){
    window.location.reload();
  }
  function myFunct1(){
       var rr1=document.getElementById(kk).onclick=document.location='cart.html';
      
  }
db.collection('data').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    hh=``;
    authCheck();
    changes.forEach(change => {
        console.log(change.doc.data());
        console.log(change.doc);
        if(change.type == 'added'){
            if(change.doc.data().cart==true){
                adddata1(change.doc);
            }
            else{
            adddata(change.doc);}
        }
        else if(change.type=='modified'){
            setTimeout(myFunct, 1000);
        }
        else if (change.type == 'removed'){
            let div = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild (div);
        }
        
    });
});
function authCheck(){
    console.log("hhhhhhhhhhhhhhhhhh");
    auth.onAuthStateChanged(user => {
    if (user) {
        console.log("hhhhhhhhhhhhhhhhhhy");
        document.getElementById('loginNamehh').style.display = "none"; 
        document.getElementById('loginNameh').style.display = "none"; 
        document.getElementById('loginNamehhh').innerHTML='LOGOUT';
        console.log(user.uid, user.email);
        document.getElementById('signinas').innerHTML="loged in with:-";
        document.getElementById('signinemail').innerHTML=user.email;
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then((doc) =>{
            if (doc.exists) {
                console.log("Document data:", doc.data().name);
                document.getElementById('userNmae').innerHTML=doc.data().name;
                document.getElementById('userhello').innerHTML="Hello";
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
           
        })
       // db.collection('users').doc(user.uid).get().then((docr) => {
        //        console.log(docr.data().name);
         //   })
    } else {
        console.log("hhhhhhhhhhhhhhhhhhn");
      document.getElementById('loginNamehh').innerHTML="LOGIN";
  document.getElementById('loginNameh').innerHTML="REGISTER";
  document.getElementById('loginNamehhh').style.display = "none"; 
  document.getElementById('userNmae').innerHTML="register or login";
  document.getElementById('userhello').innerHTML="please ";
  document.getElementById('signinas').innerHTML="";
        document.getElementById('signinemail').innerHTML="";
    }
})}
function llogout(){
    auth.signOut();
    authCheck();
    alert("loged out successfully");
    window.location.reload();
}