const container = document.getElementById("tbody")
const loading = document.getElementById("loading-section")
const tableHeads = document.querySelectorAll("thead th:not([data-column='selector'])")
const sortIcons = document.querySelectorAll("th i")

const rendering = async (value = "id", order = "asc") => {
    let template = "";
    const uri = `https://fake-server-b5mz.onrender.com/madhead?_sort=${value}&_order=${order}`;

    try {

        const res = await fetch(uri);
        const data = await res.json();

        data.forEach(post => {
            template += `
            <tr id="row-${post.id}">
                <td>${post.id}</td>
                <td class="edit-dropdown">${post.service}</td>
                <td class="edit-input" contenteditable="false">${post.account}</td>
                <td class="edit-input" contenteditable="false">${post.password}</td>
                <td class="status">${post.checked ? "Done" : "NOT YET"}</td>
                <td class="tableRow-select-container d-none" data-column="selector">
                    <input type="checkbox" class="tableRow-select" value="${post.id}" onchange="selectRow()"/>
                </td>
            </tr>
        `
        });
        console.log("loading finished")
    }
    catch (err) {
        return console.log(err)
    }

    tableHeads.forEach(head => {
        head.setAttribute("data-order", order);
    })

    sortIcons.forEach(icon => {
        const iconValue = icon.getAttribute("data-column");
        if (iconValue === value) {
            icon.classList.remove("d-none")
        } else {
            icon.classList.add("d-none")
        }
    })

    loading.classList.add("d-none");
    container.innerHTML = template;
}

tableHeads.forEach(head => {
    const value = head.getAttribute("data-column");
    const iconValue = head.querySelector("i.bi")

    head.addEventListener("click", () => {
        if (iconValue.classList.contains('d-none')) {
            rendering(value, "asc");
        } else {
            const order = head.getAttribute("data-order");
            const newOrder = order === "asc" ? "desc" : "asc"
            rendering(value, newOrder)
        }
    })
})

window.addEventListener("DOMContentLoaded", () => rendering())