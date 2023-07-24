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


let userid = userLogInStatus[0].userId


const url = "https://nearsteeluserdata.onrender.com/user";
const curUrl = "https://activitycurrencymoneymingle.onrender.com/country_data";
let container=document.getElementById("seccont");
let form=document.querySelector("form");
let popup1 = document.getElementById("popup1");
let popup2 = document.getElementById("popup2");
let converterDiv = document.getElementById("converter");
let imageDiv = document.getElementById("flag-img");
let dipInp = document.getElementById("damt");
let feesHead = document.getElementById("fees");
let finalHead = document.getElementById("final-amt");



let transData;
let currData;


currFetch(curUrl);
transPrint(url+"/1");

setTimeout(()=>{
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
    })

    dipInp.addEventListener("input", ()=>{
        feesHead.innerText = "-"+ Math.round((0.1*dipInp.value) * 100) / 100;
        finalHead.innerText =  Math.round((dipInp.value-(0.1*dipInp.value)) * 100) / 100;
    })


    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        if(form.ibname.value===""||form.ibemail.value===""||form.converter.value===""||form.damt.value===""){
            console.log("somthing wrong")
            container.innerHTML=null
            popup1.classList.add("openpopup1")
        }
        else{
            let trueValue = currConvRev(converterDiv.value,+form.damt.value,currData);
            console.log(trueValue);
            console.log("done");
            transData.balance += (0.9 * trueValue);
            let currentDate = +transData.transactions[transData.transactions.length-1].date.split("-")[0];
            let obj={
                name:form.ibname.value,
                date: currentDate+1+"-01-2021",
                gross: +dipInp.value,
                net: +finalHead.innerText,
                fees: Math.abs(+feesHead.innerText),
                userCurrency: converterDiv.value,
                type: "Transfer from"
            }

            transData.transactions.push(obj);
            console.log(obj);
            fetch(`${url}/${userid}`, {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(transData)
            })
            .then((data)=>{
                console.log(data);
                window.location.reload();
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        
        
})


},2000)


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


function addOptions(el){
    let opt = document.createElement("option");
    let spn = document.createElement("span");

    opt.value = el.currency_code;
    spn.innerText = el.currency_code;

    opt.append(spn);

    return opt;
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


