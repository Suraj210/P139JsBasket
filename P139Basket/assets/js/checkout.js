"use strict";

let remove = document.querySelectorAll("tbody .removeBtn");
let tableRow = document.querySelector("tbody");
let table = document.querySelector(".table");
let alert = document.querySelector("#productTable .alert");
let basket = [];

if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
  for (const item of basket) {
    let tableData = `
  <tr>
     <td>
     <img src="${item.image}" alt=""/></td>
    <td>
      ${item.name}
    </td>
    <td>
      ${item.description}
    </td>
    <td>
     ${item.count}
    </td>
    <td>
     <button class="btn btn-danger removeBtn">Remove</button>
    </td>
   </tr>`;
    let data = document.createElement("tr");
    data.innerHTML += tableData;
    tableRow.append(data);

    for (let btn of remove) {
      btn.addEventListener("click", function () {
        const id = this.parentElement.parentElement.id;
        let filtered = basket.filter((item) => item.id !== parseInt(id));
        localStorage.setItem("basket", JSON.stringify(filtered));
        basketCount();
        location.reload();
      });
    }
  }
} else {
  alert.classList.remove("d-none");
  table.classList.add("d-none");
  document.querySelector(".basket .count").classList.add("d-none");
}

function basketCount() {
  let basketCount = 0;
  for (const item of basket) {
    basketCount += item.count;
  }
  return basketCount;
}

document.querySelector(".basket .count span").innerText = basketCount();
