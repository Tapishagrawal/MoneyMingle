
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

let fromCurrencySelect = document.getElementById("fromMoney");
let toCurrencySelect = document.getElementById("toMoney");
let  amount = document.getElementById("amount").value;

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


  
  fromCurrencySelect.onchange= function(){
    document.getElementById("amount").value=`${0}`;
    document.getElementById("result").value =`${amount}`;

     COUNTRY.filter((el)=>{
      // console.log(this.innerHTML.);
      if(this.innerText.toUpperCase().includes(el.name.toUpperCase())===true){
       // console.log(this.options[this.selectedIndex].text,this.el[this.selectedIndex]);
    for(let f in el.flags){
      if(f==='png'){
        //console.log(el)

        localStorage.setItem("Selected1",JSON.stringify(el));
        flag1.setAttribute('src',el.flags[f]);
      }
    }
  }
  });
   };



   toCurrencySelect.onchange= function(){
     COUNTRY.filter((el)=>{
      if(this.innerText.toUpperCase().includes(el.name.toUpperCase())===true){
    for(let f in el.flags){
      if(f==='png'){
        //console.log(el)

        localStorage.setItem("Selected2",JSON.stringify(el));
        flag2.setAttribute('src',el.flags[f]);
      }
    }
  }
  });
   };



function convertMoney() {

    let temp1,temp2;
    var fromMoney = document.getElementById("fromMoney").value;
    var toMoney = document.getElementById("toMoney").value;
    let  res;
  
    const endpoint = `https://api.exchangerate-api.com/v4/latest/USD`; // USD is base Money
  
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        //console.log(data);

        const rates =(data.rates);
       // console.log(data.rates);
       // console.log(data.rates[fromMoney]);
       console.log(typeof(amount))
        if (fromMoney!==toMoney) {
           let  x=amount/rates[fromMoney];
          res = Number.parseFloat(x).toFixed(3)
        }
       // console.log(data.rates[toMoney]);
  
        let x=(amount*rates[toMoney]*100)/100;
       res = Number.parseFloat(x).toFixed(3)
        console.log(res);
        document.getElementById("result").value =`${res}`;

        if(amount===res){
          temp1=1,temp2=1;
        }
       else{
        let  y=(1/rates[fromMoney]);
        temp1= Number.parseFloat(y).toFixed(4);

        let  z=(y*rates[fromMoney]);
        temp2= Number.parseFloat(z).toFixed(4);
       }
        document.getElementById("result2").textContent = `1 ${fromMoney} = ${temp1} ${toMoney}  And
        1 ${toMoney} = ${temp2} ${fromMoney}`;


      })
      .catch(error => {
        console.log("Failed to fetch exchange rates.", error);
      });
  }
  