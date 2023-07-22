let f1=document.getElementById('flag1');
let f2=document.getElementById('flag2');





function con() {fetch("https://mm-money-mingle.onrender.com/country_data")
  .then(response => response.json())
  .then(data => {
    const countries = data;
      // console.log(data);
      const fromCurrencySelect = document.getElementById("fromMoney");
      const toCurrencySelect = document.getElementById("toMoney");

    countries.forEach(({id,name,currency_code})=> {
     
      const option = document.createElement("option");
      option.value =id;
      option.textContent =`${name} (${currency_code})`;

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

  let fromMoney = Number(document.getElementById("fromMoney").value);
  const endpoint = `https://mm-money-mingle.onrender.com/country_data`; 

    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      data.forEach(({id,image}) => {
      if(id===fromMoney){
        f1.setAttribute("src",image);
      }
    });
    })
    .catch(error => {
      console.log("Failed to fetch Flag1.", error);
    });


});





document.getElementById("toMoney").addEventListener('change',()=>{

  let toMoney =Number(document.getElementById("toMoney").value);

  const endpoint = `https://mm-money-mingle.onrender.com/country_data`; 

    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      data.forEach(({id,image}) => {
      if(id===toMoney){
        f2.setAttribute("src",image);
      }
    });
    })
    .catch(error => {
      console.log("Failed to fetch Flag 2", error);
    });


})



function convertMoney() {
    let amount = Number(document.getElementById("amount").value);
    console.log(typeof(amount));

    let fromMoney = Number(document.getElementById("fromMoney").value);
    let toMoney =Number(document.getElementById("toMoney").value);
  
    const endpoint = `https://mm-money-mingle.onrender.com/country_data`; 
  
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
       
 
        //console.log(data,fromMoney,toMoney);

        let r1=0,r2=0,c1="",c2="",res=0;
        data.forEach(({id,currency_rate,currency_code}) => {
          
        
        if(id===fromMoney){
       
          r1=currency_rate;
          c1=currency_code;
          console.log(currency_rate,typeof(currency_rate),r1)
        }
        if(id===toMoney){
         
          r2=currency_rate;
          c2=currency_code;
          console.log(currency_rate,typeof(currency_rate),r2)
        }
       
       
        if (fromMoney>toMoney) {
            // let x=amount / rates[fromMoney];
            res=Number(amount)/r1;
         res = Number.parseFloat(res).toFixed(4)
        }
     else if (fromMoney<toMoney){
      res=Math.abs(amount*r2);
        res = Number.parseFloat(res).toFixed(4)
     }
     else if (fromMoney==toMoney){
      res=Math.abs(amount);
        res = Number.parseFloat(res).toFixed(4)
     }
        // let x=(amount * rates[toMoney] * 100) / 100;
        
        document.getElementById("result").value =`${res}`;

        let temp1,temp2;

       
      
       
        let  y=Math.abs((1*r1)-r2) ;
        temp1= Number.parseFloat(y).toFixed(4);

        
          let  z=Math.abs((1/r2)) ;
          temp2= Number.parseFloat(z).toFixed(4);
        
          

        document.getElementById("result2").textContent = `1 ${c1} = ${temp1} ${c2}  And
        1 ${c2} = ${temp2} ${c1}`;
      });
      })
      .catch(error => {
        console.log("Failed to fetch exchange rates.", error);
      });
  }
  


