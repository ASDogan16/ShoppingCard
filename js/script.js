//! html den yapıları çekme


const input = document.getElementById("input")
const filtreInput = document.getElementById("filtre")
const sepet = document.getElementById("sepet")

let urunler = []

let isChecked = false

if (getItemFromLocalStorage()) {
    urunler = getItemFromLocalStorage()

    console.log(urunler)
    localStorageUrunleri()
}

input.addEventListener("keyup", enter)
filtreInput.addEventListener("input", filtreleme)


function enter(e) {
    if (e.keyCode == 13) {
        sepeteEkle()
    }
}

function filtreleme(element) {
    // console.log(element.target.value.toLowerCase())
    const sepetUrunleri = document.querySelectorAll(".sepetUrunu")
    // console.log(sepetUrunleri)

    let kullaniciDeger = element.target.value.toLowerCase()

    sepetUrunleri.forEach(sepetUrunu => {
        let urunAdi = sepetUrunu.firstChild.firstChild.textContent.toLowerCase()

        if (urunAdi.indexOf(kullaniciDeger) !== -1) {
            sepetUrunu.style.display = "block"

        } else {
            sepetUrunu.style.display = "none"
        }



    })



}


function sepeteEkle() {
    const anaDiv = document.createElement("div")
    anaDiv.className = "sepetUrunu"

    const div = document.createElement("div")
    div.classList.add("d-flex", "align-items-center", "justify-content-between", "mt-2", "bg-light", "border",
        "border-white", "p-4", "rounded-2")

    const urun = document.createElement("h4")
    urun.textContent = input.value

    const iconDiv = document.createElement("div")
    iconDiv.setAttribute("class", "d-flex gap-3")

    const check = document.createElement("i")
    check.className = "fa-solid fa-check text-success fa-xl"

    check.addEventListener("click", checkle)

    const trash = document.createElement("i")
    trash.className = "fa-solid fa-trash fa-xl text-danger",

        trash.addEventListener("click", sil)

    if (input.value.trim() != "") {
        iconDiv.append(check)
        iconDiv.append(trash)

        div.append(urun)
        div.append(iconDiv)

        anaDiv.append(div)

        sepet.append(anaDiv)

        addToLocalStorage()

    } else {
        alert("Hayırdır dostum ! Ne yapmaya çalışıyorsun")
    }

    input.value = ""

}

function localStorageUrunleri() {

    urunler.forEach(urun => {
        const anaDiv = document.createElement("div")
        anaDiv.className = "sepetUrunu"

        const div = document.createElement("div")
        div.classList.add("d-flex", "align-items-center", "justify-content-between", "mt-2", "bg-light", "border",
            "border-white", "p-4", "rounded-2")

        const urunAdi = document.createElement("h4")
        urunAdi.textContent = urun.name

        const iconDiv = document.createElement("div")
        iconDiv.setAttribute("class", "d-flex gap-3")

        const check = document.createElement("i")
        check.className = "fa-solid fa-check text-success fa-xl"

        check.addEventListener("click", checkle)

        const trash = document.createElement("i")
        trash.className = "fa-solid fa-trash fa-xl text-danger",

            trash.addEventListener("click", sil)




        iconDiv.append(check)
        iconDiv.append(trash)

        div.append(urunAdi)
        div.append(iconDiv)

        anaDiv.append(div)

        sepet.append(anaDiv)

        isCheckedMi(urun, check , urunAdi, div)

    })

}

function isCheckedMi(urun, check, urunAdi, div){
    if(urun.isChecked === true){
        //? check iconunu etkiler
        check.classList.toggle("text-success")
        check.classList.toggle("text-warning")

        //! inputtan gelen value değerini değiştirmek için
        urunAdi.classList.toggle("text-decoration-underline")

        //* ana divin bg'sini değiştimrke için 
        div.classList.toggle("bg-white")
        div.classList.toggle("bg-light")
    }
}



function checkle() {
    let itemName = this.parentElement.previousElementSibling.textContent
    //! İschecked i Güncelleme
    urunler.forEach(urun => {
        if (urun.name == itemName) {

            urun.isChecked = !urun.isChecked

            //? check iconunu etkiler
            this.classList.toggle("text-success")
            this.classList.toggle("text-warning")

            //! inputtan gelen value değerini değiştirmek için
            this.parentElement.previousElementSibling.classList.toggle("text-decoration-underline")
            let itemName = this.parentElement.previousElementSibling.textContent

            //* ana divin bg'sini değiştimrke için 
            this.parentElement.parentElement.classList.toggle("bg-white")
            this.parentElement.parentElement.classList.toggle("bg-light")

            updateCheckedLocal(urun.itemName, urun.isChecked)
        }
    })




}


function sil() {
    this.parentElement.parentElement.remove()

    // console.log(this.parentElement.previousElementSibling.textContent)

    let urun = this.parentElement.previousElementSibling.textContent

    removeFromLocalStorage(urun)

}


function addToLocalStorage() {

    let urun = {
        "name": input.value.trim(),
        "isChecked": isChecked
    }

    // let urun = input.value.trim()

    urunler.push(urun)

    // console.log(urunler)
    localStorage.setItem("urunler", JSON.stringify(urunler))

}

function getItemFromLocalStorage() {
    let localItem = localStorage.getItem("urunler")
    return JSON.parse(localItem)
}


function removeFromLocalStorage(urun) {

    // console.log(urunler.indexOf(urun))

    let urunIndex = urunler.indexOf(urun)

    urunler.splice(urunIndex, 1)

    localStorage.setItem("urunler", JSON.stringify(urunler))

}



// localStorage.clear()

function updateCheckedLocal(itemName, isChecked) {

    urunler.map(urun => {
        if (urun.name == itemName) {
            urun.isChecked = isChecked
        }




    })

    console.log(urunler)

    localStorage.setItem("urunler", JSON.stringify(urunler))



}