let userAuthToken = localStorage.getItem("localAccessToken") || null;
let feedback_data=JSON.parse(localStorage.getItem("feedback_d"))||[];
let url ='https://mm-money-mingle.onrender.com/feedback_details/';
let i=0;
const form = document.getElementById('feedbackForm');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
 
i++;
  const formData = new FormData(form);
  let feedback = {
    "cust_id": i,
  };

  for (let [key, value] of formData) {
    feedback[key] = value;
  }
  

  //   let res = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(feedback),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  // let data = await res.json();
  // console.log(data);
  //console.log(feedback);
  feedback_data.push(feedback);
  localStorage.setItem("feedback_d",JSON.stringify(feedback_data));
  form.reset();
 // alert("Thank You For Giving Feedback")


});

