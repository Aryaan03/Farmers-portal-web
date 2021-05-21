

const cafeList = document.querySelector('.products');
var val;
var kk;
var total=0;
var hhtt=``;
// create element & render cafe
function renderCafe(doc,kk){
    console.log('k=',kk);
    let html=` <div class="product" data-id=${kk}>
    <div class="product-image">
      <img src=${doc.data().img}>
    </div>
    <div class="product-details">
      <div class="product-title">${doc.data().name}</div>
      <p class="product-description">minimum price decided by government:-${doc.data().desc}</p>
    </div>
    <div class="product-price">${doc.data().price}</div>
    <div class="product-quantity">
      <input id=${kk} type="number" value=${doc.data().quantity} min="1" onchange="updateval(value,id)" >
    </div>
    <div class="product-removal">
      <button id=${kk} class="remove-product" type="button" onclick="removecark(id)">
        Remove
      </button>
    </div>
    <div class="product-line-price" id=${kk+'a'}>${doc.data().price*doc.data().quantity}</div></div>
  `;




  hhtt=hhtt+html;
  cafeList.innerHTML=hhtt;
  
}

function updateval(i,k){
    //let id = e.target.parentElement.getAttribute('data-id');
    console.log('k=',k);
    total=0;
    writeUserData(i,k);
    total=0;
    
}
function writeUserData(value,k) {
    total=0;    
    db.collection('data').doc(k).update({
      quantity: value,
    });
  }
  function updata(){
      total=0;
      console.log('uppp ');
    db.collection('data').where('cart','==', true).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log('good ',doc.id);
            total=total+(doc.data().price*doc.data().quantity);
            var rrr=document.getElementById(doc.id+'a').innerHTML=doc.data().price*doc.data().quantity;
        var rr=document.getElementById("cart-subtotal").innerHTML=total;
    var r1r=document.getElementById("cart-tax").innerHTML=total*5/100;
    var rr1=document.getElementById("cart-total").innerHTML=total+15+(total*5/100);
           
           
        });
    });
  }
  function removecark(klo){
    console.log('good boy');
      //total=0;
    db.collection('data').doc(klo).update({
        quantity: 1,
        cart: false
      });
      console.log('good boy');
      setTimeout(myFunct, 1000);
      // window.location.reload();
  }
  function myFunct(){
    console.log('reload');
    window.location.reload();
  }
/*/
// getting data
 db.collection('data').get().then(snapshot => {
     snapshot.docs.forEach(doc => {
         
        console.log(doc.data.name);
        renderCafe(doc);
     });
 });*/

// saving data
// real-time listener
db.collection('data').where('cart','==', true).orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    total=0;
    hhtt=``;
    changes.forEach(change => {
        console.log(change.doc.data());
        console.log(change.doc.id);
        /*total=total+(change.doc.data().price*change.doc.data().quantity);
        var rr=document.getElementById("cart-subtotal").innerHTML=total;
    var r1r=document.getElementById("cart-tax").innerHTML=total*5/100;
    var rr1=document.getElementById("cart-total").innerHTML=total+15+(total*5/100);*/
    //updata();
        if(change.type == 'added'){
            total=total+(change.doc.data().price*change.doc.data().quantity);
           // var rrr=document.getElementById(doc.id+'a').innerHTML=change.doc.data().price*change.doc.data().quantity;
        var rr=document.getElementById("cart-subtotal").innerHTML=total;
    var r1r=document.getElementById("cart-tax").innerHTML=total*5/100;
    var rr1=document.getElementById("cart-total").innerHTML=total+15+(total*5/100);
            renderCafe(change.doc,change.doc.id);
        }
        else if(change.type=='modified'){
            updata();
            console.log('change');
        }
        else if (change.type == 'removed'){
            let div = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild (div);
        }
        
    });
});