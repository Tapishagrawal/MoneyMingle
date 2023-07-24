const url = "https://nearsteeluserdata.onrender.com/user";

let container=document.getElementById("seccont");
let popup=document.getElementById("popup");
let amount = document.getElementById("amount-add");
let form=document.querySelector("form");

let transData;

transPrint(url+"/1");



setTimeout(()=>{
    form.addEventListener("submit",(e) =>{
        e.preventDefault();
        transData.balance += (+amount.value)*0.9;
        let currentDate = +transData.transactions[transData.transactions.length-1].date.split("-")[0];
        // console.log(currentDate);
        let obj={
            name:transData.name,
            date: currentDate+1+"-01-2021",
            gross: +amount.value,
            net: (+amount.value)*0.9,
            fees: (+amount.value)*0.1,
            userCurrency: "USD",
            type: "Payment from"
        }

        transData.transactions.push(obj);
        console.log(obj);
        fetch(url+"/1", {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(transData)
        }).then((res)=>{
            res.json();
        })
        .then((data)=>{
            console.log(data);
            container.innerHTML=null;
            popup.classList.add("openpopup");
        })
        .catch((err)=>{
            console.log(err);
        })
    })

},2000)

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









    
