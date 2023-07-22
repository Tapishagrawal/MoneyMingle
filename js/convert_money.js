

function con() {fetch("https://restcountries.com/v2/all")
  .then(response => response.json())
  .then(data => {
    const countries = data;

    // Populate the "from" and "to" currency select options with country names and currency codes
    const fromCurrencySelect = document.getElementById("fromMoney");
    const toCurrencySelect = document.getElementById("toMoney");

    countries.forEach(({currencies,flags,name})=> {
      const option = document.createElement("option");
      for(let k in currencies){
        option.value = currencies[k].code;
        option.nodeValue=name
      }
      option.textContent = `${name} (${option.value})`;

      fromCurrencySelect.appendChild(option.cloneNode(true));
      toCurrencySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.log("Failed to fetch country data.", error);
  });

}
con();


document.getElementById("fromMoney").addEventListener('change',()=>{
  document.getElementById("amount").value=0;
  document.getElementById("result").value=0;


})


function convertMoney() {
    var amount = document.getElementById("amount").value;
  
    let fromMoney = document.getElementById("fromMoney").value;
   let toMoney = document.getElementById("toMoney").value;
  
    const endpoint = `https://api.exchangerate-api.com/v4/latest/USD`; // USD is base Money
  
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const rates = data.rates;
       
        if (fromMoney !==toMoney) {
            let x=amount / rates[fromMoney];
          amount = Number.parseFloat(x).toFixed(2)
        }
       // console.log(data.rates[toMoney]);
        //amount = Math.round(amount * rates[toMoney] * 100) / 100;
        let x=(amount * rates[toMoney] * 100) / 100;
        amount = Number.parseFloat(x).toFixed(2)
        console.log(amount);
        document.getElementById("result").value = `${amount}`;

        let temp1,temp2;

        let  z= 1/rates[fromMoney];
        temp2= Number.parseFloat(z).toFixed(5);
       
        let  y=rates[fromMoney] ;
        temp1= Number.parseFloat(y).toFixed(5);

       

        document.getElementById("result2").textContent = `1 ${fromMoney} = ${temp2} ${toMoney}  And
        1 ${toMoney} = ${temp1} ${fromMoney}`;

      })
      .catch(error => {
        console.log("Failed to fetch exchange rates.", error);
      });
  }
  