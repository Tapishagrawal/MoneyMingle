// mobile menu bar functionality start
let menuBtn = document.querySelector(".status-btns .fa-bars");
let mobileNavBar = document.querySelector(".navigation-links-mobile")
menuBtn.addEventListener("click", () => {
    mobileNavBar.classList.toggle("active")
})
// mobile menu bar functionality End


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


// feedback form Code start====================
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let feedback_data = JSON.parse(localStorage.getItem("feedback_d")) || [];
const form = document.getElementById('feedbackForm');


let url = 'https://mm-money-mingle.onrender.com/feedback_details/';
let i = 0;
form.addEventListener('submit', function (event) {
    event.preventDefault();


    i++;
    const formData = new FormData(form);
    let feedback = {
        "cust_id": i,
    };
    for (let [key, value] of formData) {
        feedback[key] = value;
    }
    feedback_data.push(feedback);
    localStorage.setItem("feedback_d", JSON.stringify(feedback_data));
    form.reset();
    swal("Thank You For Giving Feedback!")
});


// feedBack form open close section start
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
// feedBack form open close section end



// feedback form Code End=========================





// =========================================Login Pop-On Code Start============================

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



// ==========form Data start============
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


async function LoginFetchData() {
    try {
        let res = await fetch(`https://nearsteeluserdata.onrender.com/user`);
        let data = await res.json();
        LogInform.addEventListener('submit', (e) => {
            e.preventDefault();
            LoginUser(data)
        });
    }
    catch (err) {
        console.log("Login Form Error: " + err);
    }
}
LoginFetchData()

let userLogInStatus = JSON.parse(localStorage.getItem("userLogInStatus")) || []
function LoginUser(data) {
    let isLoggedIn = false;
    data.forEach(user => {
        if (user.usrName === LogInform.userName.value) {
            if (user.password === LogInform.password.value) {
                isLoggedIn = true;
                let isDuplicate = userLogInStatus.some(existingItem => existingItem.id === user.userId)
                if (!isDuplicate) {
                    userLogInStatus.push({ userId: user.id, status: true, name: user.name });
                    localStorage.setItem('userLogInStatus', JSON.stringify(userLogInStatus))
                }
            }
            else {
                swal("Wrong password!", "", "error");
            }
        } else {
            swal("Wrong User Name!", "", "error");
        }

        if (isLoggedIn) {
            if(LogInform.userName.value =="admin"){
                swal("Login successful!", "Welcome to MonneyMingle ;)", "success");
                setTimeout(() => {
                    window.location.href = "admin.html";
                }, 1000);
            }else{
                swal("Login successful!", "Welcome to MonneyMingle ;)", "success");
                setTimeout(() => {
                    window.location.href = "user.html";
                }, 1000);
            }
            
        }
        else {
            swal("Invalid username!", "", "error");
        }
    });

}
// =========form Data End======

const button = document.querySelector(".button");
button.addEventListener("click", (e) => {
    e.preventDefault;
    button.classList.add("animate");
    setTimeout(() => {
        button.classList.remove("animate");
    }, 600);
});

// ==========================================Login Pop-On Code End=========
