
let feedback=JSON.parse(localStorage.getItem("COUNTRY"))||[];

const form = document.getElementById('feedbackForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const feedback = {};

  for (let [key, value] of formData) {
    feedback[key] = value;
  }
  console.log(feedback);
  localStorage.setItem("feedback",JSON.stringify(feedback));
  alert("Thank You For Giving Feedback")

});

