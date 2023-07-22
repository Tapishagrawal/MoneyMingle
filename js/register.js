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

const form = document.querySelector("form");
let formLocalData = JSON.parse(localStorage.getItem("form-data"))|| [];
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let formData = {
        name: form['res-name'].value,
        email: form['res-email'].value,
        useId: form['res-userID'].value,
        pass: form['res-pass'].value,
        comPass: form['res-conFormPass'].value
    }
    if(formData.pass===formData.comPass){
        formLocalData.push(formData);
        localStorage.setItem("form-data",JSON.stringify(formLocalData))
        form.reset()
        window.location.href = "index.html";
    }else{
        swal("Wrong Password", "Passwords did not match", "warning");
    }
})