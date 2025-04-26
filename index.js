let catalogItems = JSON.parse(localStorage.getItem("catalogItems")) || [];
let editingItemIndex = -1;

function renderCatalog() {
    const catalogList = document.getElementById("catalogList");
    catalogList.innerHTML = "";

    catalogItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("catalog-item");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        itemElement.appendChild(img);

        const title = document.createElement("h3");
        title.textContent = item.name;
        itemElement.appendChild(title);

        const price = document.createElement("p");
        price.textContent = `Preço: R$ ${item.price}`;
        itemElement.appendChild(price);

        const category = document.createElement("p");
        category.textContent = `Categoria: ${item.category}`;
        itemElement.appendChild(category);

        const desc = document.createElement("p");
        desc.textContent = item.description;
        itemElement.appendChild(desc);

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remover";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = () => removeItem(index);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editItem(index);

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(removeBtn);

        itemElement.appendChild(btnGroup);
        catalogList.appendChild(itemElement);
    });
}

function removeItem(index) {
    catalogItems.splice(index, 1);
    localStorage.setItem("catalogItems", JSON.stringify(catalogItems));
    renderCatalog();
}

function editItem(index) {
    const item = catalogItems[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("itemCategory").value = item.category;
    document.getElementById("itemDescription").value = item.description;
    document.getElementById("itemImage").value = item.image;
    editingItemIndex = index;
}

function validateForm() {
    const inputs = document.querySelectorAll("input, select");
    let isValid = true;

    inputs.forEach(input => {
        if (input.validity.valid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            isValid = false;
        }
    });

    return isValid;
}

document.getElementById("catalogForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const newItem = {
        name: document.getElementById("itemName").value,
        price: parseFloat(document.getElementById("itemPrice").value),
        category: document.getElementById("itemCategory").value,
        description: document.getElementById("itemDescription").value,
        image: document.getElementById("itemImage").value
    };

    if (editingItemIndex === -1) {
        catalogItems.push(newItem);
    } else {
        catalogItems[editingItemIndex] = newItem;
        editingItemIndex = -1;
    }

    localStorage.setItem("catalogItems", JSON.stringify(catalogItems));
    renderCatalog();
    this.reset();
    document.querySelectorAll(".valid").forEach(el => el.classList.remove("valid"));
});

fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => console.log("API externa (mock):", data))
    .catch(error => console.error("Erro na API externa:", error));

renderCatalog();
  