// log Out functionality Start
let userLogInStatus = localStorage.getItem('userLogInStatus');
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




let arr = []
let searchInput = document.getElementById("search")
let filterType = document.getElementById("type")
let Currency = document.getElementById("Currency")
//let sn = document.getElementById("sn")
let sa = document.getElementById("sa")

async function fechData(){
    try{
        let res = await fetch("https://nearsteeluserdata.onrender.com/user")
        let data = await res.json()
        var nData = data[0].transactions
        appendData(nData)
        nData.forEach(ele => {
            arr.push(ele)
        });
    }
    catch(error){
        console.log(error)
    }
}
    console.log(arr)
fechData()

searchInput.addEventListener("input",(e)=>{
    let inp=e.target.value
    let searched = arr.filter((ele)=>{
        if(ele.name.toUpperCase().includes(inp.toUpperCase())){
            return true
        }
    })
    appendData(searched)
})

filterType.addEventListener("change",(e)=>{
    let inp=filterType.value
    let searched = arr.filter((ele)=>{
        if(ele.type==inp || inp==""){
            return true
        }
    })
    appendData(searched)
})

Currency.addEventListener("change",(e)=>{
    let inp=Currency.value
    let searched = arr.filter((ele)=>{
        if(ele.userCurrency==inp || inp==""){
            return true
        }
    })
    appendData(searched)
})

// sn.addEventListener("change",()=>{
//     if(sn.value=="atz"){
//         let sorted = arr.sort()
//         appendData(sorted)
//     }
//     if(sn.value=="zta"){
//         let sorted = arr.sort((a,b)=>{
//             return b.name-a.name
//         })
//         appendData(sorted)
//     }
//     else{
//         appendData(arr)
//     }
// })

sa.addEventListener("change",()=>{
    if(sa.value=="lth"){
        let sorted = arr.sort((a,b)=>{
            return a.net-b.net
        })
        appendData(sorted)
    }
    if(sa.value=="htl"){
        let sorted = arr.sort((a,b)=>{
            return b.net-a.net
        })
        appendData(sorted)
    }
    else{
        appendData(arr)
    }
})

let tb = document.querySelector("tbody")

function appendData(arr){
    tb.innerHTML=''
    arr.map((ele)=>{
        let row = createRow(ele)
        tb.append(row)
    })

}
function createRow(ele){
    let row = document.createElement("tr")
    //console.log(ele)
    let date = document.createElement("td")
    date.innerText=ele.date
    let type = document.createElement("td")
    type.innerText=ele.type
    let name = document.createElement("td")
    name.innerText=ele.name
    let gross = document.createElement("td")
    gross.innerText=ele.gross
    let fee = document.createElement("td")
    fee.innerText=ele.fee
    let net = document.createElement("td")
    net.innerText=ele.net
    let currency = document.createElement("td")
    currency.innerText=ele.userCurrency

    row.append(date, type, name, gross, fee, net, currency)
    return row
}

