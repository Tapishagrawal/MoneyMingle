
// let url = https://nearsteeluserdata.onrender.com/user;
// log Out functionality Start
let userLogInStatus =  JSON.parse(localStorage.getItem('userLogInStatus'));
let LogOutBtn = document.getElementById("btn-logout");
LogOutBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.removeItem('userLogInStatus');
    window.location.href='index.html';
})
// log Out functionality End

const getCustomerData = async () => {
    let res = await fetch(`https://nearsteeluserdata.onrender.com/user`);
    let data = await res.json();
    console.log(data);
    appendCustomerData(data);
  };

  let user_data=document.getElementById("products_div");
  user_data.onclick = () => {
    getCustomerData();
  };
  
  
  const appendCustomerData = (data) => {
    let customer_div = document.getElementById("user_tbody");
    customer_div.innerHTML = "";
    data.forEach(({id, name,usrName,password,balance, mail, transactions}) => {
      let tr = document.createElement("tr");
      let cus_id = document.createElement("td");
      cus_id.innerText = id;
      let cus_name = document.createElement("td");
      cus_name.innerText = name;
      let cus_usrName = document.createElement("td");
      cus_usrName.innerText = usrName;
      let cus_pass = document.createElement("td");
      cus_pass.innerText = password;

      let cus_email = document.createElement("td");
      cus_email.innerText = mail;

      let cus_balance = document.createElement("td");
      cus_balance.innerText = balance;

      let cus_transactions = document.createElement("td"); 
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
    })
    cus_transactions.append(inv_span);

    

      let cus_rem = document.createElement("td");
      let del_icon = document.createElement("i");
      del_icon.classList.add("fa-solid", "fa-trash-can", "del_icon");
      cus_rem.append(del_icon);
      del_icon.onclick = (e) => {
        delete_user_data(id);
        e.target.parentNode.parentNode.remove();
      };
      tr.append(
        cus_id,
        cus_name,
        cus_usrName,
        cus_pass,
        cus_email,
        cus_balance,
        cus_transactions,
        cus_rem
      );
      customer_div.append(tr);
    });
  };
  // search handle
  let searchBtn = document.getElementById("search_user_btn");
  searchBtn.onclick = () => {
    let input_user = document.getElementById("search_user").value;
    search_user_data(input_user);
  };
  
  const search_user_data = async (d) => {
    // d = /d/i;
    let res = await fetch(`https://nearsteeluserdata.onrender.com/user`);
    let data = await res.json();
    data = data.filter(({ name }) => {
      return name.includes(d);
    });
    appendCustomerData(data);
  };
  
  //delete User Details
  
  const delete_user_data = async (id) => {
    let res = await fetch(`https://nearsteeluserdata.onrender.com/user/${id}`, {
      method: "DELETE",
    });
  };