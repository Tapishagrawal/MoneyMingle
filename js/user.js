// console.log("abc")

let data = [
    {
        date: "28-07-23",
        type: "Recieved",
        gross: 28.78,
        net: 25.88
    },
    {
        date: "29-07-23",
        type: "Sent",
        gross: 45.44,
        net: 42.55
    },
    {
        date: "02-08-23",
        type: "Recieved",
        gross: 96.89,
        net: 90.33
    },
    {
        date: "28-07-23",
        type: "Pending",
        gross: 28.78,
        net: 25.88
    }
]

let tableBod = document.getElementById("table");

data.forEach(el =>{
    tableBod.append(createTrans(el));
})

function createTrans(data){
    let trow = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = data.date;
    td2.innerText = data.type;
    td3.innerText = data.gross;
    td3.innerText = data.net;

    trow.append(td1, td2, td3, td4);

    return trow;
}