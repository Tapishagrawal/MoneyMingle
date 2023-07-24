

const getProductData = async () => {
  
  try {
    let res = await fetch(`https://mm-money-mingle.onrender.com/user`);
    let data = await res.json();

    console.log(data);
    appendProducts(data);
  } catch (err) {}
};










// getProductData();
// "id": 1,
//     "name": "admin",
//     "password": "admin",
//     "comnformPassword": "admin",
//     "mail": "example@gmail.com",
//     "usrName": "admin",
//     "balance": 1000,
//     "transactions": [
//       {
//         "date": "01-01-2021",
//         "type": "Payment from",
//         "name": "Money Mingle",
//         "gross": 1100,
//         "fee": 110,
//         "net": 990,
//         "userCurrency": "INR",
//         "convertedCurrency": "USD"
//       },

const appendProducts = (data) => {
  document.getElementById("all_user_tbody").innerHTML = "";
  data.forEach(({ id,name, password, mail, usrName, balance, transactions }) => {
    let tr = document.createElement("tr");

    let usrid_td = document.createElement("td");
    usrid_td.innerHTML=id;

    let usrName_td = document.createElement("td");
    usrName_td.innerHTML=usrName;
    

    let password_td = document.createElement("td");
    password_td.innerHTML=password;
    
    let mail_td = document.createElement("td");
    mail_td.innerHTML=mail;

    let u_name = document.createElement("td");
    u_name.innerText = name;

    let inventory = document.createElement("td");
    let inv_span = document.createElement("span");
    inv_span.innerText =transactions.length;
    let inv_icon = document.createElement("i");
    inv_icon.classList.add("fa-solid", "fa-pencil", "edit_icon");
    inventory.append(inv_span, inv_icon);

    // adding EventListner
    inv_icon.onclick = (e) => {
      let new_transactions = +prompt("Enter New transactions");
      if (new_transactions == 0) return;
      updateInvetory(id,new_transactions);
      e.target.previousSibling.innerText = new_transactions;
    };

    let pri = document.createElement("td");
    let pri_span = document.createElement("span");
    pri_span.innerText = balance;
    let pri_icon = document.createElement("i");
    pri_icon.classList.add("fa-solid", "fa-pencil", "edit_icon");
    pri.append(pri_span, pri_icon);
    pri_icon.onclick = (e) => {
      let new_balance = +prompt("Enter New Amount");
      if (new_balance == 0) return;
      updatebalance(id,new_balance);
      e.target.previousSibling.innerText = new_balance;
    };

    let status1 = document.createElement("td");
    let btn = document.createElement("button");
    if ( status1) {
      btn.classList.add("status_active");
      btn.innerText = "Active";
    } else {
      btn.classList.add("status_inactive");
      btn.innerText = "Inactive";
    }
    status1.append(btn);
    btn.onclick = (e) => {
      updateActive(id, btn.innerText);
      if (e.target.innerText == "Active") {
        e.target.classList.add("status_inactive");
        e.target.innerText = "Inactive";
        btn.style.backgroundColor="red"
      } else {
        e.target.classList.add("status_active");
        e.target.innerText = "Active";
        btn.style.backgroundColor="green"
      }
    };
  

    // <i class="fa-solid fa-trash-can"></i>
    let del = document.createElement("td");
    let del_icon = document.createElement("i");
    del_icon.classList.add("fa-solid", "fa-trash-can", "del_icon");
    del.append(del_icon);
    del_icon.onclick = (e) => {
      if (confirm("Press Ok! to Remove")) {
        console.log("OK!");
        removeProduct(id, cat);
        e.target.parentNode.parentNode.remove();
      }
    };

    tr.append(usrid_td, usrName_td, password_td ,mail_td, u_name ,pri, inventory , status1, del);
    document.getElementById("all_user_tbody").append(tr);
  });
};

//update Inventory
const updateInvetory = async (id, new_transactions) => {
  let data = {
    transactions: new_transactions,
  };

  let res = await fetch(`https://mm-money-mingle.onrender.com/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Inventory Updated");
};

//update balance
const updatebalance = async (id, new_balance) => {
  let dataToSent = {
    // balance:{current_balance : new_balance,  before_balance: (new_balance+1000),  savings_amount: (1000),} ,
    balance:new_balance,
  };
  let res = await fetch(`https://nearsteeluserdata.onrender.com/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dataToSent),
    headers: {
      "Content-type": "application/json",
    },
  });
  alert("balance Updated");
};

//update active: true||false
const updateActive = async (id, btn_text) => {
  if (btn_text == "Active") {
    let dataToSend = {
      status: false,
    };
    let res = await fetch(`https://nearsteeluserdata.onrender.com/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-type": "application/json",
      },
    });
    let data = await res.json();
  } else {
    let dataToSend2 = {
      status: true,
    };
    let resagain = await fetch(`https://nearsteeluserdata.onrender.com/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToSend2),
      headers: {
        "Content-type": "application/json",
      },
    });
    let data2 = await resagain.json();
  }
  // console.log(btn_text);
};

//remove Products
const removeProduct = async (id) => {
  let res = await fetch(`https://nearsteeluserdata.onrender.com/user/${id}`, {
    method: "DELETE",
  });
  alert("Product Deleted!");
};







let usercare = document.getElementById("user_btn");
usercare.onclick = () => {
 
  getProductData();
};





const  gettransData = async () => {
  
  try {
    let res = await fetch(`https://mm-money-mingle.onrender.com/user`);
    let data = await res.json();

    console.log(data);
    appendtrans(data);


  } catch (err) {}
};

//trans products
let trans = document.getElementById("trans_btn");
trans.onclick = () => {
  gettransData();
};

// Handling sorting

let sort_Prods = document.getElementById("sort_Prod");
sort_Prods.onchange = () => {
  let inputVal = sort_Prods.value;
  if (inputVal == "asc") {
    sort_handle("balance", "asc");
  } else if (inputVal == "desc") {
    sort_handle("balance", "desc");
  }
};
const sort_handle = async (query, value) => {
 
  let res = await fetch(
    `https://mm-money-mingle.onrender.com/user?_sort=${query}&_order=${value}`
  );
  let data = await res.json();
  appendProducts(data);
};





const appendtrans = (data) => {
  document.getElementById("transactions_tbody").innerHTML = "";
  data.forEach(({ id, mail, usrName, balance, transactions }) => {
    let tr = document.createElement("tr");

    let usrid_td = document.createElement("td");
    usrid_td.innerHTML=id;

    let usrName_td = document.createElement("td");
    usrName_td.innerHTML=usrName;
    
    let mail_td = document.createElement("td");
    mail_td.innerHTML=mail;

    let inventory = document.createElement("td");
    let inv_span = document.createElement("table");
 

    transactions.forEach(({date,type,name,gross,fee,net,userCurrency,convertedCurrency})=>{
      let t_ul = document.createElement("tbody");
      t_ul.className="flexdiv";

      let t_date = document.createElement("td");
      t_date.innerHTML=date;
  
      let t_type = document.createElement("td");
      t_type.innerHTML=type;

      let t_name = document.createElement("td");
      t_name.innerHTML=name;
      
      let t_gross = document.createElement("td");
      t_gross.innerHTML=gross;
  
      let t_fee = document.createElement("td");
      t_fee.innerHTML=fee;

      let t_net = document.createElement("td");
      t_net.innerHTML=net;
      
      let t_userCurrency = document.createElement("td");
      t_userCurrency.innerHTML=userCurrency;

      let t_convertedCurrency = document.createElement("td");
      t_convertedCurrency.innerHTML=convertedCurrency;

      t_ul.append(t_date,t_type,t_name,t_gross,t_fee,t_net,t_userCurrency,t_convertedCurrency);
      inv_span.append(t_ul);
    });
    inventory.append(inv_span);

  

    let pri = document.createElement("td");
    let pri_span = document.createElement("span");
    pri_span.innerText = balance;
    let pri_icon = document.createElement("i");
    pri_icon.classList.add("fa-solid", "fa-pencil", "edit_icon");
    pri.append(pri_span, pri_icon);
    pri_icon.onclick = (e) => {
      let new_balance = +prompt("Enter New Amount");
      if (new_balance == 0) return;
      updatebalance(id,new_balance);
      e.target.previousSibling.innerText = new_balance;
    };
  

    // <i class="fa-solid fa-trash-can"></i>
    let del = document.createElement("td");
    let del_icon = document.createElement("i");
    del_icon.classList.add("fa-solid", "fa-trash-can", "del_icon");
    del.append(del_icon);
    del_icon.onclick = (e) => {
      if (confirm("Press Ok! to Remove")) {
        console.log("OK!");
        removeProduct(id, cat);
        e.target.parentNode.parentNode.remove();
      }
    };

    tr.append(usrid_td, usrName_td ,mail_td ,pri, inventory , del);
    document.getElementById("transactions_tbody").append(tr);
  });
};