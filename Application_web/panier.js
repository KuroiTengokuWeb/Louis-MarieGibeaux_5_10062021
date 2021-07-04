//const { table } = require("console");

var cart = JSON.parse(localStorage.getItem('cart')) || [];

debug("Panier Start", cart);

function add_cart(idProd) {
    // add entry si choix d'une couleur



    //////////////////////////////////////////////
    // Dans script.js déclaration de products 
    // products = la liste de tout les produits fetch et set dans script.js

    var product = products.filter(product => product._id == idProd)[0] || [],
        cartProduct = cart.filter(product => product._id == idProd)[0],
        inputQty = parseInt(document.getElementById("prod-qty-" + idProd).value),
        hasProductInCart = cartProduct != undefined;
    //////////////////////////////////////////////
    // Si la qty du produit est undefined on le set à 1
    // Sinon on set la qty existante
    if (product.qty === undefined) product.qty = inputQty;
    // else product.qty = parseInt(product.qty) + inputQty;

    // En ternaire
    //product.qty = product.qty == undefined ? 1 : product.qty

    // En cour
    //console.log(product);

    //////////////////////////////////////////////
    // Si le produit selectionner existe dans le panier alors on incrémente juste la qty
    // Sinon on push dans le panier le produit
    if (hasProductInCart) cartProduct.qty = parseInt(cartProduct.qty) + inputQty;
    else cart.push(product);

    // Set dans le localStorage, dans la key cart les produits 
    localStorage.setItem("cart", JSON.stringify(cart));

    /*var test = document.getElementById("custom");
    console.log(test);*/
}

//////////////////////////////////////////////
// Calcule le prix total du panier
function calcTotalPrice() {
    var total = 0;
    // parcours les products du panier et
    // increment le total par le prix du produit * la qty
    console.log(cart);
    for (i in cart) {
        total += cart[i].price * cart[i].qty;
    }
    return total;
}

if (document.getElementById("cart_total")) {
    var totals = "<p>Prix total : </p><p>" + calcTotalPrice() + "€</p>";

    document.getElementById("cart_total").innerHTML = totals;
} else {
    console.log("totals manquant");
}
//////////////////////////////////////////////
// Edit La qty du produit dans le panier
function editProductQty(idProd) {

    var product = cart.filter(product => product._id == idProd)[0],
        inputQty = parseInt(document.getElementById("prod-qty-" + idProd).value);

    product.qty = inputQty;
    if (product.qty <= 0) deleteProduct(idProd);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update du prix total
    var total = calcTotalPrice();
    document.getElementById("cart_total").childNodes[1].innerHTML = total;
}


//////////////////////////////////////////////
// Supprime le produit du panier
function deleteProduct(idProd) {
    cart = cart.filter(product => product._id != idProd);
    localStorage.setItem("cart", JSON.stringify(cart));

    calcTotalPrice();
}

//////////////////////////////////////////////
// Retourne les produits du panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

//////////////////////////////////////////////
function getURL() {
    const queryString = window.location.search;
    console.log(queryString);
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        const product_id = urlParams.get('id');
        console.log(product_id);
        return product_id;
    }
}

//////////////////////////////////////////////
// Retourne la fiche d'un produit
function getProduct() {
    let product_id = getURL();
    /*if (product_id) {
        console.log(products);
        let prod = cart.filter(product => product._id == product_id)[0] || [];
        console.log("product id check");
        console.log(prod);
    }*/
    fetch("http://localhost:3000/api/teddies/" + product_id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            if (document.getElementById("prod_test")) {

                prod = document.getElementById("prod_test");
                prod.innerHTML +=
                    '<div class="card mb-3" data-id="' +
                    value._id +
                    '"><div class="row g-0"><div class="col-md-4"><img class="product_image" src="' +
                    value.imageUrl +
                    '" alt="' +
                    value.name +
                    '"></div><div class="col-md-6"><div class="card-body"><h5 class="card-title">' +
                    value.name +
                    '</h5><p class="card-text">' +
                    value.description +
                    '</p><label for="custom">Couleurs : </label><select id="custom"></select></div></div><div class="col-md-2"><p class="card-text"> Prix : <span class="price">' +
                    value.price +
                    '€<span></p><p class="card-text">Quantité : </p><input class="w-100" id="prod-qty-' +
                    value._id + '" name="prod-qty-' +
                    value._id + '" type="number" min="1" value="1" /></div><button class="btn btn-info" onclick="add_cart(\'' +
                    value._id +
                    '\')">Ajouter au panier</button></div></div></div></div>';
                    var clr = document.getElementById("custom");
                    for(i in value.colors){
                        clr.innerHTML += "<option>"+value.colors[i]+"</option>";
                    } 
            } else {
                console.log("error id list_prod");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

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

//////////////////////////////////////////////
// Envoi du formulaire
function sendForm(e) {
    // Transforme le panier en array d'ID produit
    var order = [];
    for (prod in cart){
        for (i=0; i < cart[prod].qty; i++){
            order.push(cart[prod]._id);
        }
    }
    var orderReq = {
        contact :{
          firstName:JSON.stringify(document.getElementById("firstnameInput").value),
          lastName:JSON.stringify(document.getElementById("lastnameInput").value),
          address:JSON.stringify(document.getElementById("adressInput").value),
          city:JSON.stringify(document.getElementById("cityInput").value),
          email:JSON.stringify(document.getElementById("emailInput").value)
        },
        products: order
    };

    e.preventDefault();
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderReq)

    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value){
        console.log(value);
        var check = document.getElementById("check-form");
        check.innerHTML = "La commande " + value.orderId + " est validée. Nombre d'article "+ value.products.length;
        check.classList.add("alert-success");
    })
    .catch(function(err) {
        console.log(err);
    });
  }
  
  document
    .getElementById("form")
    .addEventListener("submit", sendForm);

      

