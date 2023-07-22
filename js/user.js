// console.log("abc")
const url = "https://nearsteeluserdata.onrender.com/user";
let tableBod = document.getElementById("table");
let transData;
let currData;
transPrint(url+ "/1");

setTimeout(()=>{
    for(let i = transData.transactions.length-1;i>transData.transactions.length-6;i--){
        tableBod.append(createTrans(transData.transactions[i]));
    }
},1000)




function createTrans(data){
    let trow = document.createElement("tr");


    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = data.date;
    td2.innerText = data.type;
    td3.innerText = data.gross;
    td4.innerText = data.net;

    trow.append(td1, td2, td3, td4);

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
async function balCal(url){
    try{
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        let balance = 1000;
        // data.transactions.forEach(el => {
        //     if(el.type == "Payment from"){
                
        //     }
        // });
    }
    catch(err){
        console.log(err);
    }
}

async function currConv(url){
    try{
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        currData = data;
    }
    catch(err){
        console.log(err);
    }
}


