async function fechData(){
    try{
        let res = await fetch("https://moke-country-name-img-api.onrender.com/users")
        let data = await res.json()
        appendData(data)
    }
    catch(error){
        console.log(error)
    }
}
fechData()

let tb = document.querySelector("tbody")

function appendData(arr){
    //tb.innerHTML=''
    arr.map((ele)=>{
        let row = createRow(ele)
        tb.append(row)
    })

}
function createRow(ele){
    let row = document.createElement("tr")

    let date = document.createElement("td")
    date.innerText=ele.date
    let type = document.createElement("td")
    type.innerText=ele.type
    let source = document.createElement("td")
    source.innerText=ele.source
    let status = document.createElement("td")
    status.innerText=ele.status
    let amount = document.createElement("td")
    amount.innerText=ele.amount

    row.append(date, type, source, status, amount)
    return row
}