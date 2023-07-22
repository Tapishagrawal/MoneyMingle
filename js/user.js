// console.log("abc")
const url = "https://nearsteeluserdata.onrender.com/user";
const curUrl = "https://activitycurrencymoneymingle.onrender.com/country_data";

let tableBod = document.getElementById("table");
let mainBalHead = document.getElementById("balance");
let moneyInDiv = document.getElementById("moneyIn");
let moneyOutDiv = document.getElementById("moneyOut");
let converterDiv = document.getElementById("converter");
let imageDiv = document.getElementById("flag-img");
let afterConvDiv = document.getElementById("after-conversion");

let transData;
let currData;

transPrint(url+ "/1");
currFetch(curUrl);

setTimeout(()=>{
    for(let i = transData.transactions.length-1;i>transData.transactions.length-6;i--){
        tableBod.append(createTrans(transData.transactions[i]));
    }

    balCal(url+"/1", currData)

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
        console.log(data);
        transData = data;
    }
    catch(err){
        console.log(err);
    }
}
async function balCal(url, currData){
    try{
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        let balance = 1000;
        let moneyIn = 1000;
        let moneyOut = 0;
        data.transactions.forEach(el => {
            if(el.type == "Payment from"){
                balance += currConv(el.userCurrency, el.net, currData);
                moneyIn += currConv(el.userCurrency, el.net, currData);
            }else if(el.type == "Transfer to"){
                balance -= currConv(el.userCurrency, el.net, currData);
                moneyOut -= currConv(el.userCurrency, el.net, currData);
            }
        });

        mainBalHead.innerText = "$" + Math.round(balance * 100) / 100;
        moneyInDiv.innerText = "$" + Math.round(moneyIn * 100) / 100;
        moneyOutDiv.innerText = "$" + Math.round(Math.abs(moneyOut) * 100) / 100;
    }
    catch(err){
        console.log(err);
    }
}

async function currFetch(url){
    try{
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
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


