// log Out functionality Start
let userLogInStatus =  JSON.parse(localStorage.getItem('userLogInStatus'));
let LogOutBtn = document.getElementById("btn-logout");
LogOutBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.removeItem('userLogInStatus');
    window.location.href='index.html';
})
// log Out functionality End

// Show Name on navbar on profile menu section start
let getUserCredentials = JSON.parse(localStorage.getItem('userLogInStatus'));
let ShowuserName = document.getElementById("ShowuserName");
let ShowUser = document.querySelector(".ShowUser");
ShowuserName.innerText = `Hello, ${getUserCredentials[0].name}`
ShowUser.innerText = getUserCredentials[0].name;
// Show Name on navbar on profile menu section End

const url = "https://nearsteeluserdata.onrender.com/user";
const curUrl = "https://activitycurrencymoneymingle.onrender.com/country_data";

let tableBod = document.getElementById("table");
let mainBalHead = document.getElementById("balance");
let moneyInDiv = document.getElementById("moneyIn");
let moneyOutDiv = document.getElementById("moneyOut");
let converterDiv = document.getElementById("converter");
let imageDiv = document.getElementById("flag-img");
let afterConvDiv = document.getElementById("after-conversion");
let floatingWindow = document.getElementById("floating");
let floatingDivs = document.querySelectorAll("#floating div");
let recentHeader = document.getElementById("recent-header");

let transData;
let currData;

let userid = userLogInStatus[0].userId
transPrint(`${url}/${userid}`);
currFetch(curUrl);

setTimeout(()=>{
    for(let i = transData.transactions.length-1;i>transData.transactions.length-6;i--){
        tableBod.append(createTrans(transData.transactions[i]));
    }

    balCal(`${url}/${userid}`, currData)

    recentTrans(transData, 3);

    converterDiv.addEventListener("change", ()=>{
        for(let i = 0;i<currData.length;i++){
            if(converterDiv.value == currData[i].currency_code){
                
                let ima = document.createElement("img");
                ima.src = currData[i].image;
        
                imageDiv.innerHTML = null;
        
                imageDiv.append(ima);
                break;
            }
        }
        let balStr = mainBalHead.innerText;
        let balance = "";
        for(let i = 1;i<balStr.length;i++){
            balance += balStr[i];
        }
        afterConvDiv.innerText = Math.round(currConvRev(converterDiv.value, +balance, currData) * 100) / 100 ;
        
    })
    floatingDivs.forEach(el =>{
        el.addEventListener("click", ()=>{
            recentHeader.innerText = el.innerText;
            floatingWindow.classList.toggle("tog");
    
            let array = recentHeader.innerText.split(" ");
            if(array[0] == "All"){
                recentTrans(transData, transData.transactions.length);
            }else{
                recentTrans(transData, +array[1]);
            }
        })
    })
},2000)




function createTrans(data){
    let trow = document.createElement("tr");


    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    td2.innerText = data.name;
    td1.innerText = data.type;
    td3.innerText = data.gross;
    td4.innerText = data.net;
    td5.innerText = data.userCurrency;

    trow.append(td1, td2, td3, td4, td5);

    return trow;
}

async function transPrint(url){
    try{
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data);
        transData = data;
    }
    catch(err){
        console.log(err);
    }
}
function recentTrans(data, days){
    let moneyIn = 0;
    let moneyOut = 0;
    for(let i = data.transactions.length-1;i>=data.transactions.length-days;i--){
        if(data.transactions[i].type == "Payment from"){
            moneyIn += currConv(data.transactions[i].userCurrency, data.transactions[i].net, currData);
        }else if(data.transactions[i].type == "Transfer to"){
            moneyOut -= currConv(data.transactions[i].userCurrency, data.transactions[i].net, currData);
        }
    }
    moneyInDiv.innerText = "$" + Math.round(moneyIn * 100) / 100;
    moneyOutDiv.innerText = "$" + Math.round(Math.abs(moneyOut) * 100) / 100;
}
async function balCal(url, currData){
    try{
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data);
        let balance = 0;
        data.transactions.forEach(el => {
            if(el.type == "Payment from"){
                balance += currConv(el.userCurrency, el.net, currData);  
            }else if(el.type == "Transfer to"){
                balance -= currConv(el.userCurrency, el.net, currData);
            }
        });

        mainBalHead.innerText = "$" + Math.round(balance * 100) / 100;

        fetch(url, {
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({balance: balance})
        })

    }
    catch(err){
        console.log(err);
    }
}

async function currFetch(url){
    try{
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data);
        currData = data;

        data.forEach(el =>{
            converterDiv.append(addOptions(el));
        })

    }
    catch(err){
        console.log(err);
    }
}

function currConv(curr, amt, currData){
    let convRate;
    for(let i = 0;i<currData.length;i++){
        if(currData[i].currency_code == curr){
            convRate = currData[i].currency_rate;
            break;
        }
    }
    // console.log(amt, convRate);

    return amt*(1/convRate);
}
function currConvRev(curr, amt, currData){
    let convRate;
    for(let i = 0;i<currData.length;i++){
        if(currData[i].currency_code == curr){
            convRate = currData[i].currency_rate;
            break;
        }
    }
    // console.log(amt, convRate);

    return amt*(convRate);
}

function addOptions(el){
    let opt = document.createElement("option");
    let spn = document.createElement("span");

    opt.value = el.currency_code;
    spn.innerText = el.currency_code;

    opt.append(spn);

    return opt;
}

function fun(){  
    floatingWindow.classList.toggle("tog");
}

