
let flag1=document.getElementById('flag1');
let flag2=document.getElementById('flag2');
  
flag1.setAttribute("src","https://flagcdn.com/w320/us.png");
flag2.setAttribute("src","https://flagcdn.com/w320/tf.png");

async function con(){
  try{

 
  let res=await fetch("https://restcountries.com/v2/all");
  let data = await res.json();
 
    let countries = data;
    localStorage.setItem("COUNTRY",JSON.stringify(countries));
    addcont(countries);
  }catch(error){
    console.log("Failed to fetch country data.", error);
  };
}
window.addEventListener("load", function () {
  con();
 });

let COUNTRY=JSON.parse(localStorage.getItem("COUNTRY"))||[];

const fromCurrencySelect = document.getElementById("fromMoney");
const toCurrencySelect = document.getElementById("toMoney");

function addcont(countries){


    countries.forEach( ({currencies,flags,name}) => {
     
      const option = document.createElement("option");
      for(let k in currencies){
      option.value = currencies[k].code;
      option.nodeValue=name
    }
  
    var imag = document.createElement("span");
    for(let f in flags){
      if(f==='png'){
    
        imag.innerHTML=(flags[f]);
        option.setAttribute("data-image",flags[f]);
       
        imag.style.width = "40px"; 
        //console.log(imag.innerHTML);
      }
    }
    //  option.append(name,option.value);
    option.innerHTML=`${name} ${option.value}`;

   fromCurrencySelect.append(option.cloneNode(true));
    toCurrencySelect.append(option);

       
    });
  }


  fromCurrencySelect.onchange=()=>{
     COUNTRY.filter((el)=>{
      if(el.name.toUpperCase().includes(fromCurrencySelect.value.toUpperCase())===true){
    for(let f in el.flags){
      if(f==='png'){
        console.log(el)
        localStorage.setItem("Selected1",JSON.stringify(el));
        flag1.setAttribute('src',el.flags[f]);
      }
    }
  }
  });
   };


   toCurrencySelect.onchange=()=>{
     COUNTRY.filter((el)=>{
      if(el.name.toUpperCase().includes(fromCurrencySelect.value.toUpperCase())===true){
    for(let f in el.flags){
      if(f==='png'){
        console.log(el)
        localStorage.setItem("Selected2",JSON.stringify(el));
        flag2.setAttribute('src',el.flags[f]);
      }
    }
  }
  });
   };



function convertMoney() {
    var amount = document.getElementById("amount").value;
    let temp1,temp2;
    const fromMoney = document.getElementById("fromMoney").value;
    const toMoney = document.getElementById("toMoney").value;
  
    const endpoint = `https://api.exchangerate-api.com/v4/latest/USD`; // USD is base Money
  
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        const rates = data.rates;
       // console.log(data.rates);
       // console.log(data.rates[fromMoney]);
        if (fromMoney !== "USD") {
            let x=amount / rates[fromMoney];
          amount = Number.parseFloat(x).toFixed(2)
        }
       // console.log(data.rates[toMoney]);
      
        let x=(amount * rates[toMoney] * 100)/100;
        amount = Number.parseFloat(x).toFixed(1)
        console.log(amount);
        document.getElementById("result").value = `${amount}`;
       
        let  y=(1*rates[toMoney] * 100) / 100;
        temp1= Number.parseFloat(y).toFixed(3);

        let  z= 1/rates[fromMoney];
        temp2= Number.parseFloat(z).toFixed(3);

        document.getElementById("result2").textContent = `1 ${fromMoney} = ${y} ${toMoney}  And
        1 ${toMoney} = ${z} ${fromMoney}`;

      })
      .catch(error => {
        console.log("Failed to fetch exchange rates.", error);
      });
  }
  