var prodList = document.getElementById("prod-list"),
    cartList = document.getElementById("cart-list"),
    article = document.getElementById("article"),
    products;

function allProduct(productList) {
    // creation de la card pour chaque produit
    for (i in productList) {
        prodList.innerHTML +=
            '<div class="card mb-3" data-id="' +
            productList[i]._id +
            '"><div class="row g-0 bg-color"><div class="col-md-4"><div class="card-body"><a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
            productList[i]._id + '"><img class="product_image" src="' +
            productList[i].imageUrl +
            '" alt="' +
            productList[i].name +
            '"></a></div></div><div class="col-md-6"><div class="card-body"><a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
            productList[i]._id + '"><h2 class="card-title">' +
            productList[i].name +
            '</h2></a><p class="card-text">' +
            productList[i].description +
            '</p></div></div><div class="col-md-2"><div class="card-body"><p class="card-text price-color">Prix : <span class="price">' +
            productList[i].price / 100 +
            '€</span></p></div></div></div></div>';
    }
}

// Affichage page produit
if (article) {
    getProduct();
}

// Affichage du panier
if (cartList) {
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
}

// Affichage prix total panier
if (priceTotal) {
    priceTotal.innerHTML = "<p>Prix total : </p><p>" + calcTotalPrice() / 100 + "€</p>";
}

// Affichage page confirmation
if (document.getElementById("order")) {
    var order = JSON.parse(localStorage.getItem("order"));
    document.getElementById("order-id").innerHTML = order.id;
    document.getElementById("order-price").innerHTML = order.price / 100;
}
