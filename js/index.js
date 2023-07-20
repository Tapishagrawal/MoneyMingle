
// Hero Page Aniumation start
let text = document.querySelector('.hero-text');
let img1 = document.querySelector('.hero-icon > img');
let img2 = document.querySelector('.hero-icon > img:nth-child(2)');
let img3 = document.querySelector('.hero-icon > img:nth-child(3)');
let img4 = document.querySelector('.hero-icon > img:nth-child(4)');
let img5 = document.querySelector('.hero-icon > img:nth-child(5)');
let img6 = document.querySelector('.hero-icon > img:nth-child(6)');
let mob1 = document.querySelector('.hero-mobile-images img:nth-child(1)');
let mob2 = document.querySelector('.hero-mobile-images img:nth-child(2)');
let mob3 = document.querySelector('.hero-mobile-images img:nth-child(3)');


window.addEventListener('scroll', () => {
    let value = window.scrollY;
    if (value <= 250) {
        mob1.style.marginRight = value + (-10) + 'px';
        mob3.style.marginLeft = value + (-10) + 'px';
    }
    text.style.marginTop = -value + 50 + 'px';

    img1.style.left = -value + 310 + 'px';
    img1.style.bottom = value + 120 + 'px';

    img2.style.top = value + 100 + 'px';
    img2.style.right = value + 180 + 'px';

    img3.style.bottom = value + 100 + 'px';
    img3.style.right = value + 180 + 'px';

    img4.style.top = -value + 78 + 'px';
    img4.style.right = -value + 345 + 'px';

    img5.style.top = value + 270 + 'px';
    img5.style.left = value + 400 + 'px';

    img6.style.top = -value + 100 + 'px';
    img6.style.left = -value + 300 + 'px';
})
// Hero Page Aniumation End


// Testimonial Start
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
});
// Testimonial End

// feedback form Code start
let feedback = JSON.parse(localStorage.getItem("COUNTRY")) || [];
let feedBackFormBtn = document.querySelector('.feedback-form-icon');
let feedBackForm = document.querySelector('.feedback-form');
let feedBackFormCloseBtn = document.querySelector('#Feed_container > i');
let formSubmitCloseBtn = document.querySelector('.form-btn');
const form = document.getElementById('feedbackForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const feedback = {};

    for (let [key, value] of formData) {
        feedback[key] = value;
    }
    console.log(feedback);
    localStorage.setItem("feedback", JSON.stringify(feedback));
    swal("Thank You For Giving Feedback!")
});

feedBackFormBtn.addEventListener("click",()=>{
    feedBackForm.classList.add('active');
    feedBackFormBtn.style.display = "none";

})
feedBackFormCloseBtn.addEventListener("click",()=>{
    feedBackForm.classList.remove('active');
    feedBackFormBtn.style.display = "initial";

})
formSubmitCloseBtn.addEventListener("click",()=>{
    feedBackForm.classList.remove('active');
    feedBackFormBtn.style.display = "initial";

})
// feedback form Code End

