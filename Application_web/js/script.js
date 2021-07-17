var cartList = document.getElementById("cart-list"),
    products,
    url = document.location.href;



// renvoie le nom du fichier de l'url avec les parametres
function getFileName(currentURL) {
    // Supprime l'éventuel dernier slash de l'URL
    currentURL = currentURL.replace(/\/$/, "");
    // Retourne uniquement la portion derrière le dernier slash de currentURL
    return currentURL.substring(currentURL.lastIndexOf("/") + 1);
}

//////////////////////////////////////////////
// renvoie le nom fichier sans les parametres
function removeUrlParam(url) {
    url = url.substr(0, url.indexOf("?"));
    a = url.split("/");
    return a[a.length - 1];
}

//////////////////////////////////////////////
// Retourne l'id du produit contenu dans l'url
function getUrlParamValue(param) {
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        const product_id = urlParams.get(param);
        return product_id;
    }
}

url = getFileName(url);

// Affichage page accueil
if (url == "index.html") {
    getAllProduct();
}

// Affichage page produit
if (removeUrlParam(url) == "product.html") {
    getProduct(getUrlParamValue('id'));
}

// Affichage du panier
if (url == "panier.html") {
    var cart = getCart();
    for (i in cart) {
        cartList.innerHTML +=
            '<div id="' + cart[i].cartItemId + '" class="card mb-3" data-id="' +
            cart[i]._id +
            '"><div class="row g-0 bg-color"><div class="col-md-4"><div class="card-body"><a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
            cart[i]._id + '"><img class="product_image" src="' +
            cart[i].imageUrl +
            '" alt="' +
            cart[i].name +
            '"></a></div></div><div class="col-md-6"><div class="card-body"><a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
            cart[i]._id + '"><h2 class="card-title">' +
            cart[i].name +
            '</h2></a><p class="card-text">' +
            cart[i].description +
            '</p></div></div><div class="col-md-2"><div class="card-body"><p>' +
            cart[i].selectedColor + '</p><p class="card-text price-color"> Prix : <span class="price">' +
            cart[i].price / 100 +
            '€</span></p><p class="card-text">Quantité : </p><input class="w-25" onchange="editProductQty(\'' +
            cart[i].cartItemId + '\')" id="prod-qty-' +
            cart[i].cartItemId + '" name="prod-qty-' +
            cart[i].cartItemId + '" type="number" min="1" value="' +
            cart[i].qty + '" /><button class="btn" onclick="deleteProduct(\'' +
            cart[i].cartItemId + '\')">Supprimer</button></div></div></div></div></div></div>';
    }
    priceTotal.innerHTML = "<p>Prix total : </p><p>" + calcTotalPrice() / 100 + "€</p>";

}

//////////////////////////////////////////////
// Ajoute la fonction d'envoi ou modifie la page si panier vide
if (localStorage.getItem('cart') && url == "panier.html") {
    document.getElementById('empty-cart').style.setProperty('display', 'none', "important");
    document.getElementById('cart_total').style.setProperty('display', 'flex', "important");
    document.getElementById('order-form').style.setProperty('display', 'flex', "important");
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
            // Stock le numero de commande et le prix total
            localStorage.setItem("order", JSON.stringify(order));
            // Delete le contenu du panier
            localStorage.removeItem("cart");
            // Redirige sur la page de confirmation de commande
            window.location.href = "confirmation.html";
        }).catch(function (error) {
            console.warn(error);
        });
    });
}

//////////////////////////////////////////////
// Affichage page confirmation
if (url == "confirmation.html") {
    if (localStorage.getItem('order')) {
        var order = JSON.parse(localStorage.getItem("order"));
        document.getElementById("order-id").innerHTML = order.id;
        document.getElementById("order-price").innerHTML = order.price / 100;

        window.addEventListener('beforeunload', function (e) {
            localStorage.removeItem("order");
        });
    } else {
        // Redirige a l'accueil si le localStorage order n'existe pas
        window.location.href = "index.html";
    }
}
