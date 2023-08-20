const dndArea = document.querySelector(".dnd-area")
const input = document.getElementById("input-file")
const btnWrapp = document.querySelector(".button_wrapper")
const button = btnWrapp.querySelector("button")
let files

dndArea.addEventListener("click", (e) => {
    console.log("click drag & drop")
})

button.addEventListener("click", (e) => {
    input.click()
})

input.addEventListener("change", (e) => {
    files = this.files
    dndArea.classList.add("active")
    showFiles(files)
    dndArea.classList.remove("active")
})

dndArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    dndArea.classList.add("active")
})

dndArea.addEventListener("dragleave", (e) => {
    e.preventDefault()
    dndArea.classList.remove("active")
})

dndArea.addEventListener("drop", (e) => {
    e.preventDefault()
    dndArea.classList.remove("active")
})

function showFiles(files) {
    if(files.length === undefined) {
        proccessFile(files)
    }
    else {
        for(const file of files) {
            proccessFile(file)
        }
    }
}

function proccessFile(file) {

}