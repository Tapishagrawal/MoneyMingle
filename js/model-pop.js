
var modal = document.querySelector(".myModal");


var btn = document.querySelector(".add_product");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function () {
  modal.style.display = "block";
};


span.onclick = function () {
  modal.style.display = "none";
};


document.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


let addNewProducts = document.getElementById("add_new_user");
addNewProducts.onclick = async () => {
  // let Prodid= res.length;
  let ProdName = document.getElementById("new_prod_name").value;
  let Prodmail = document.getElementById("new_prod_mail").value;
  let Prodpass = document.getElementById("new_prod_pass").value;
 let ProdusrName = document.getElementById("new_prod_usrName").value;
  let Prodbalance = document.getElementById("new_prod_balance").value;

  let  Transaction=  document.getElementById("new_t_Name ").value;
  let  date=  document.getElementById("new_prod_date"  ).value;
  let  type=   document.getElementById("new_prod_type" ).value; 
  let  gross=  document.getElementById("new_prod_gross" ).value;
  let fee=  document.getElementById("new_prod_fee" ).value;
  let net =  document.getElementById("new_prod_net" ).value; 
  let  userCurrency =  document.getElementById("new_prod_userCurrency"  ).value;
  let  convertedCurrency =  document.getElementById("new_prod_convertedCurrency"  ).value;



  let dataToSend = {
    id:(0),
    name: ProdName,
    password: Prodpass,
    mail : Prodmail ,
    status: true,
    usrName: ProdusrName ,
    balance:Prodbalance,
    transactions:[
      {
    t_date: date,
    t_type: type,
    t_name: Transaction,
    t_gross: gross,
    t_fee: fee,
    t_net: net,
    t_userCurrency:userCurrency,
   t_convertedCurrency: convertedCurrency
      }
    ]
    

  };

  let res = await fetch(`https://nearsteeluserdata.onrender.com/user`, {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("User Added");

  ProdName.value = "";
  Prodmail.value = "";
  Prodpass.value = "";
 ProdusrName.value = "";
  Prodbalance.value = "";

   Transaction.value = "";
   date.value = "";
   type.value = ""; 
   gross.value = "";
  fee.value = "";
  net.value = ""; 
   userCurrency.value = "";
   convertedCurrency.value = "";

};