async function fechData(){
    try{
        let res = await fetch("https://moke-country-name-img-api.onrender.com/country")
        let data = await res.json()
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}
fechData()