let addBtn = document.getElementById("add-btn");
let cross = document.getElementById("form-cross");
const formContainer = document.getElementById("form-container")
const form = document.getElementById("form");
const checkbox = document.getElementById("form-checkbox");

const createNewData = async (e) => {
    e.preventDefault();

    const service = document.getElementById("select-menu").value;

    const newData = {
        service: service,
        account: form.account.value,
        password: form.password.value,
        checked: checkbox.checked ? true : false,
    }

    await fetch("https://fake-server-b5mz.onrender.com/madhead", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { 'Content-Type': 'application/json' }
    })

    window.location.replace('./tos.html')
}

form.addEventListener("submit", createNewData)

addBtn.addEventListener('click', function () {
    formContainer.classList.remove('d-none')
})

cross.addEventListener('click', function () {
    formContainer.classList.add('d-none')

    const selectMenu = document.getElementById('select-menu')
    selectMenu.value = selectMenu.options[0].value;
})