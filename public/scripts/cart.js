//cart icon
const items = JSON.parse(localStorage.getItem("items"));
const cartText = document.getElementsByTagName('h6')[0];
if (cartText) {
    cartText.textContent = items ? items.length : 0;
}
const cartItems = document.getElementsByName('items')[0];
if (cartItems) {
    cartItems.value = items ? items : '';
}

//add item
const addItemBtn = document.getElementById('addItemBtn');
if (addItemBtn) {
    addItemBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let items = JSON.parse(localStorage.getItem("items"));
        if (!items) {
            items = [];
        }
        const itemID = e.target.dataset.id;
        items.push(itemID);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.href = "/cart/index?items=" + items;
    });
}

//remove item
const removeBtns = document.getElementsByClassName('remove');
if (removeBtns) {
    for (var i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', (e) => {
            e.preventDefault();
            const itemID = e.target.dataset.id;
            let items = JSON.parse(localStorage.getItem("items"));
            if (items) {
                items.splice(items.indexOf(itemID), 1)
                localStorage.setItem("items", JSON.stringify(items));
            }
            window.location.href = '/cart/index?items=' + items;
        });
    }
}




