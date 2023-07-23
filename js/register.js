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
let userApiData = `https://nearsteeluserdata.onrender.com/user`;

async function userFecthData(){
    try{
        let res = await fetch(userApiData)
        let data = await res.json();
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            userRegistration(data.length, data[0].transactions);
        })
    }
    catch(e){
        console.log("UserFetchData Error: " + e);
    }
}
userFecthData()

function userRegistration(noOfUser, dummyTransaction){
    let formData = {
        id: ++noOfUser,
        name: form['res-name'].value,
        mail: form['res-email'].value,
        usrName: form['res-userID'].value,
        password: form['res-pass'].value,
        comnformPassword: form['res-conFormPass'].value,
        transactions:dummyTransaction
    }
    fetch(userApiData)
    .then(res=>res.json())
    .then(data=>{
        let uniqUserName = data.some(existingUserName => existingUserName.usrName === formData.usrName)
        if(!uniqUserName){
            if(formData.password===formData.comnformPassword){
                fetch(userApiData,{
                    method : 'POST',
                    headers:{
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(res=>res.json())
                userFecthData()
                console.log(formData);
                swal("Account Created Successfully !", "Welcome to MonneyMingle ;)","success");
                setTimeout(() => {
                    window.location.reload();
                    window.location.href = "index.html";
                }, 1500);
                form.reset()
            }
            else{
                swal("Wrong Password", "Passwords did not match", "warning");
            }
        }
        else{
            swal("This username is already taken", "Use Unique User Name", "warning");
        }
    })
    //     


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