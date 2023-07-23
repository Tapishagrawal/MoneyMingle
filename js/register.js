// Eyes Button Functionality start
const pass = document.querySelector("#res-pass")
    const comPass = document.querySelector("#res-conFormPass")
    let hideEye = document.querySelectorAll(".fa-eye-slash");
    hideEye.forEach((i)=>{
        i.addEventListener("click",()=>{
            if(comPass.type=="password"){
                pass.type="text"
                comPass.type="text"

            }else{
                pass.type="password"
                comPass.type="password"

            }
            if(i.classList[1]=="fa-eye-slash"){
                i.classList.remove("fa-eye-slash")
                i.classList.add("fa-eye")
            }else{
                i.classList.add("fa-eye-slash")
                i.classList.remove("fa-eye")
            }
        })
    })
// Eyes Button Functionality End


const form = document.querySelector("form");
let formLocalData = JSON.parse(localStorage.getItem("form-data"))|| [];

async function userFecthData(){
    try{
        let res = await fetch(`https://nearsteeluserdata.onrender.com/user`)
        let data = await res.json();
        console.log(data);
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            userRegistration(data, data.length,data.transactions)
        })
    }
    catch(e){
        console.log("UserFetchData Error: " + e);
    }
}
userFecthData()

function userRegistration(data,noOfUser,dummyTransaction){
    let formData = {
        id : ++noOfUser,
        name: form['res-name'].value,
        mail: form['res-email'].value,
        usrName: form['res-userID'].value,
        password: form['res-pass'].value,
        comnformPassword: form['res-conFormPass'].value,
        transactions:dummyTransaction
    }
    if(formData.password===formData.comnformPassword){
        formLocalData.push(formData);
        localStorage.setItem("form-data",JSON.stringify(formLocalData))
        form.reset()
        // window.location.href = "index.html";
        console.log(formData);
    }else{
        swal("Wrong Password", "Passwords did not match", "warning");
    }
}

// form.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     let formData = {
//         name: form['res-name'].value,
//         mail: form['res-email'].value,
//         usrName: form['res-userID'].value,
//         password: form['res-pass'].value,
//         comnformPassword: form['res-conFormPass'].value
//     }
//     if(formData.password===formData.comnformPassword){
//         formLocalData.push(formData);
//         localStorage.setItem("form-data",JSON.stringify(formLocalData))
//         form.reset()
//         // window.location.href = "index.html";
//     }else{
//         swal("Wrong Password", "Passwords did not match", "warning");
//     }
// })