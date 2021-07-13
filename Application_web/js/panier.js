var cart = JSON.parse(localStorage.getItem('cart')) || [];
var priceTotal = document.getElementById("cart_total");

function add_cart(idProd) {
    //////////////////////////////////////////////
    // Dans script.js déclaration de products 
    // products = la liste de tout les produits fetch et set dans script.js

    const product = products.filter(product => product._id == idProd)[0] || [],
        inputQty = parseInt(document.getElementById("prod-qty-" + idProd).value),
        inputColor = document.getElementById("product-color-" + idProd).value,
        cartItemId = idProd + inputColor;


    let cartProduct = cart.filter(cartProduct => cartProduct.cartItemId == cartItemId)[0];

    const hasProductInCart = cartProduct != undefined;

    //////////////////////////////////////////////
    // Si le produit selectionner existe dans le panier alors on incrémente juste la qty
    // Sinon on push dans le panier le produit
    if (hasProductInCart) cartProduct.qty = parseInt(cartProduct.qty) + inputQty;
    else {
        //////////////////////////////////////////////
        // Clone l'objet product, pour créer une nouvelle référence 
        let newProd = { ...product };

        newProd.qty = inputQty;
        newProd.selectedColor = inputColor;

        // Création d'une id unique pour un produit dans le panier
        newProd.cartItemId = cartItemId;

        cart.push(newProd);
    }

    // Set dans le localStorage, dans la key cart les produits 
    localStorage.setItem("cart", JSON.stringify(cart));

    showAlert();

    //window.location.href = "panier.html";
}

//////////////////////////////////////////////
// Calcule le prix total du panier
function calcTotalPrice() {
    var total = 0;
    // parcours les products du panier et
    // increment le total par le prix du produit * la qty
    for (i in cart) {
        total += cart[i].price * cart[i].qty;
    }
    return total;
}

//////////////////////////////////////////////
// Edit La qty du produit dans le panier
function editProductQty(cartItemId) {
    var product = cart.filter(product => product.cartItemId == cartItemId)[0],
        inputQty = parseInt(document.getElementById("prod-qty-" + cartItemId).value);

    product.qty = inputQty;

    if (product.qty <= 0) deleteProduct(idProd);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update du prix total
    document.getElementById("cart_total").childNodes[1].innerHTML = calcTotalPrice() / 100 + "€";
}


//////////////////////////////////////////////
// Supprime le produit du panier
function deleteProduct(cartItemId) {
    cart = cart.filter(product => product.cartItemId != cartItemId);
    localStorage.setItem("cart", JSON.stringify(cart));

    showAlert();
    document.getElementById(cartItemId).classList.add("deleted");
    setTimeout(() => {
        document.getElementById(cartItemId).remove();
    }, 1000);

    document.getElementById("cart_total").childNodes[1].innerHTML = calcTotalPrice() / 100 + "€";
}

function showAlert() {

    document.getElementById("alert-success").classList.add("show");

    setTimeout(() => {
        document.getElementById("alert-success").classList.remove("show");
    }, 2000);
}


//////////////////////////////////////////////
// Retourne les produits du panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

//////////////////////////////////////////////
// Transforme le panier en array d'id produit
function convertCart() {
    var idList = [];
    for (prod in cart) {
        for (i = 0; i < cart[prod].qty; i++) {
            idList.push(cart[prod]._id);
        }
    }
    return idList;
}

//////////////////////////////////////////////
// Envoi du formulaire
document.addEventListener('submit', function (event) {

    event.preventDefault();

    // Contenu de la requête
    var orderReq = {
        contact: Object.fromEntries(new FormData(event.target)),
        products: convertCart()
    };

    // Requête fetch POST
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        body: JSON.stringify(orderReq),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        var order = {
            id: data.orderId,
            price: calcTotalPrice()
        };
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.setItem("cart", JSON.stringify(""));
        window.location.href = "confirmation.html";
    }).catch(function (error) {
        console.warn(error);
    });
});

//////////////////////////////////////////////
// Debug
function debug(name, vr) {
    console.log(
        "=============================== \n",
        name + " : \n",
        vr,
        "\n =============================== \n"
    );
}
