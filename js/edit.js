let editBtn = document.getElementById("edit-btn");
let stateChangeBtn = document.getElementById("state-change-btn")
let delBtn = document.getElementById("del-btn");

editBtn.addEventListener('click', function (e) {
    e.preventDefault();

    stateChangeBtn.toggleAttribute("disabled")
    delBtn.toggleAttribute("disabled")

    const selectorTH = document.querySelector('th[data-column="selector"]')
    const selectorsTD = document.querySelectorAll(".tableRow-select-container")

    selectorTH.classList.toggle('d-none')

    selectorsTD.forEach((selector) => {
        selector.classList.toggle('d-none');

        const checkbox = selector.querySelector("input.tableRow-select");
        const selectedRows = document.querySelectorAll("tbody tr")

        if (selector.classList.contains("d-none")) {
            checkbox.checked = false;
            selectedRows.forEach(selectedRow => {
                selectedRow.classList.remove("table-active");
            })
        }
    })
});

stateChangeBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const selectedRows = document.querySelectorAll("tr.table-active");

    selectedRows.forEach(async selectedRow => {
        const status = selectedRow.querySelector("td.status")

        const updatedStatus = {
            checked: status.innerHTML === "NOT YET" ? true : false,
        }

        const splitId = selectedRow.id.split("");
        const id = splitId[splitId.length - 1];
        await fetch("https://fake-server-b5mz.onrender.com/madhead/" + id, {
            method: "PATCH",
            body: JSON.stringify(updatedStatus),
            headers: { 'Content-Type': 'application/json' }
        })
    })

    setTimeout(() => {
        window.location.replace('./todoList.html')
        process.on('warning', e => console.log(e.stack))
    }, 1000)
})

delBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const selectedRows = document.querySelectorAll('tr.table-active');

    selectedRows.forEach(async selectedRow => {
        const splitId = selectedRow.id.split("");
        const id = splitId[splitId.length - 1];
        await fetch("https://fake-server-b5mz.onrender.com/madhead/" + id, {
            method: "DELETE",
        })
    })

    window.location.replace("./todoList.html")
})

function selectRow() {
    const arr = []
    const counters = document.querySelectorAll("span.counter")

    document.querySelectorAll(".tableRow-select").forEach((select, index) => {
        const rows = document.querySelectorAll("tbody tr");

        if (select.checked) {
            rows[index].classList.add("table-active");
            arr.push(rows[index])
        } else {
            rows[index].classList.remove("table-active");
        }
    })

    counters.forEach(counter => {
        counter.innerHTML = "(" + arr.length + ")"
    })
}

