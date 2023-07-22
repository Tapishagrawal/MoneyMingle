
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
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let feedback_data = JSON.parse(localStorage.getItem("feedback_d")) || [];
const form = document.getElementById('feedbackForm');


let url = 'https://mm-money-mingle.onrender.com/feedback_details/';
let i=0;
form.addEventListener('submit', function (event) {
    event.preventDefault();


    i++;
    const formData = new FormData(form);
    let feedback = {
        "cust_id": i,
    };
    for(let [key, value] of formData) {
        feedback[key] = value;
    }
    feedback_data.push(feedback);
    localStorage.setItem("feedback_d", JSON.stringify(feedback_data));
    form.reset();
    swal("Thank You For Giving Feedback!")
});



let feedBackFormBtn = document.querySelector('.feedback-form-icon');
let feedBackForm = document.querySelector('.feedback-form');
let feedBackFormCloseBtn = document.querySelector('#Feed_container > i');
let formSubmitCloseBtn = document.querySelector('.form-btn');

feedBackFormBtn.addEventListener("click", () => {
    feedBackForm.classList.add('active');
    feedBackFormBtn.style.display = "none";

})
feedBackFormCloseBtn.addEventListener("click", () => {
    feedBackForm.classList.remove('active');
    feedBackFormBtn.style.display = "initial";

})
// formSubmitCloseBtn.addEventListener("click",()=>{
//     // feedBackForm.classList.remove('active');
//     // feedBackFormBtn.style.display = "initial";

// })


// feedback form Code End





// Login Pop-On Code Start=========

// hide show password function Start
const pass = document.querySelector("#password")
const hideEye = document.querySelectorAll(".fa-eye-slash")
hideEye.forEach((i) => {
    i.addEventListener("click", () => {
        if (pass.type === "password") {
            pass.type = "text"
        } else {
            pass.type = "password"
        }
        if (i.classList[1] === "fa-eye-slash") {
            i.classList.remove("fa-eye-slash")
            i.classList.add("fa-eye")
        } else {
            i.classList.remove("fa-eye")
            i.classList.add("fa-eye-slash")
        }
    })
})
// hide show password function End

// form Data start
let statusBtns = document.querySelector('.status-btns a')
let formLocalData = JSON.parse(localStorage.getItem("form-data")) || []
let LogInform = document.querySelector(".form-container")
let loginPage = document.querySelector('.login-page');
let loginCloseBtn = document.querySelector('.login-page .fa-x');

statusBtns.addEventListener('click', (e) => {
    e.preventDefault();
    LogInform.classList.add('active');
    loginPage.classList.add('active');
})
loginCloseBtn.addEventListener('click', () => {
    LogInform.classList.remove('active');
    loginPage.classList.remove('active');
})
LogInform.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = LogInform.userName.value;
    let password = LogInform.password.value;
    let isLoggedIn = false;

    for (let i = 0; i < formLocalData.length; i++) {
        if (username === formLocalData[i].useId) {
            if (password === formLocalData[i].pass) {
                isLoggedIn = true;
                break;
            } else {
                swal("Wrong password!", "", "error");
                return;
            }
        }
    }

    if (isLoggedIn) {
        swal("Login successful!", "Welcome to TrepTrekker", "success");
        setTimeout(() => {
            window.location.href = "index.html";

        }, 500)
        localStorage.setItem("Islogin", "true")
    } else {
        swal("Invalid username!", "", "error");
    }
});
// form Data End

const button = document.querySelector(".button");
button.addEventListener("click", (e) => {
    e.preventDefault;
    button.classList.add("animate");
    setTimeout(() => {
        button.classList.remove("animate");
    }, 600);
});

// Login Pop-On Code End=========

