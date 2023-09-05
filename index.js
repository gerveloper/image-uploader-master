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
    files = e.target.files
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
    files = e.dataTransfer.files
    showFiles(files)
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
    const fileType = file.type
    console.log(fileType)
    const validExtensions = ["image/jpeg", "image/jpg", "image/gif", "image/jfif", "image/png", "image/svg+xml", "image/webp"]

    if (validExtensions.includes(fileType)) {

        const fileReader = new FileReader()
        const id = `file-${Math.random().toString(32).substring(7)}`

        fileReader.addEventListener('load', (e) => {
            const fileUrl = fileReader.result
            
            const image = `
                    <div id="${id}" class="img-container">
                        <div class="successful">
                            <p>Uploaded Successfully!</p>
                        </div>
                        <img src="${fileUrl}" alt="${file.name}" class="preview">
                        <div class="status">
                            <span class="status-text">
                                Loading...
                            </span>
                        </div>
                        <div>
                            <label>
                            <input type="submit">
                            <button>Copy</button>
                        </div>
                    </div>
            `

            const html = document.querySelector("#innerframe").innerHTML
            document.querySelector("#innerframe").innerHTML = image 
            //+ html
        })

        fileReader.readAsDataURL(file)
        uploadFile(file, id)

    } 
    else {

        alert("The file doesn't have a valid extension")
    }
}


async function uploadFile(file, id) {
    const formData = new FormData()
    formData.append("file", file)

    try{
        const response = await fetch('http://localhost:3000/upload', {
            method : "POST",
            body : formData
        })

        const responseText = await response.text()
        console.log(responseText)

        document.querySelector(
            `#${id} .status-text`
        ).innerHTML = `<span>Archivo subido correctamente</span>`
    }
    catch (error) {

        document.querySelector(
            `#${id} .status-text`
        ).innerHTML = `<span>Error en la carga del archivo</span>`
        
    }
}