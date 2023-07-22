// console.log("abc")
const url = "https://nearsteeluserdata.onrender.com/user";
let tableBod = document.getElementById("table");

fetcher(url)

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

async function fetcher(url){
    try{
        let res = await fetch(url);
        let data = await res.json();

        console.log(data);
        for(let i = data[0].transactions.length-1;i>data[0].transactions.length-6;i--){
            tableBod.append(createTrans(data[0].transactions[i]));
        }

    }
    catch(err){
        console.log(err);
    }
}