//! html den yapıları çekme


const input = document.getElementById("input")
const filtreInput = document.getElementById("filtre")
const sepet = document.getElementById("sepet")





input.addEventListener("keyup", enter

)


function enter(e){
    if(e.keyCode == 13){
        sepeteEkle()
    }
}



function sepeteEkle() {
    const div = document.createElement("div")
    div.classList.add("d-flex", "align-items-center", "justify-content-between", "mt-2", "bg-light", "border", 
    "border-dark", "p-4" , "rounded-2")

    const urun = document.createElement("h4")
    urun.textContent = input.value
    
    const iconDiv = document.createElement("div")
    iconDiv.setAttribute("class", "d-flex gap-3")

    const check = document.createElement("i")
    check.className = "fa-solid fa-check text-success fa-xl"

    check.addEventListener("click", checkle)

    const trash = document.createElement("i")
    trash.className = "fa-solid fa-trash fa-xl text-danger"

    iconDiv.append(check)
    iconDiv.append(trash)

    div.append(urun)
    div.append(iconDiv)

    sepet.append(div)

    input.value = ""

}


function checkle(){
    //? check iconunu etkiler
    this.classList.toggle("text-success")
    this.classList.toggle("text-warning")
}
