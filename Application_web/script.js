var list_prod = document.getElementById("list_prod"),
    cart_list = document.getElementById("cart_list"),
    products;

fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
        if (res.ok) {
            //console.log(res);
            return res.json();
        }
    })
    .then(function (value) {
        // recuperation de la liste des produits pour panier.js
        products = value;
        if (list_prod) {
            // creation de la card pour chaque produit
            for (i in value) {
                list_prod.innerHTML +=

                    /*'<div class="card">'+
                    '<a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
                    value[i]._id + '">' +
                        '<img class="card-img-top" src="'+ value[i].imageUrl +'" alt="'+ value[i].name +'"></a>' +
                        '<div class="card-body">'+
                        '<a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
                        value[i]._id + '">'+
                           '<h5 class="card-title">' + value[i].name + '</h5></a>'+
                           '<p class="card-text">'+ value[i].description +'</p>' +
                        '</div>' +
                    '</div>';*/

                    '<div class="card mb-3" data-id="' +
                    value[i]._id +
                    '"><div class="row g-0 bg-color"><div class="col-md-4"><div class="card-body"><a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
                    value[i]._id + '"><img class="product_image" src="' +
                    value[i].imageUrl +
                    '" alt="' +
                    value[i].name +
                    '"></a></div></div><div class="col-md-6"><div class="card-body"><a href="file:///C:/Users/Kuroi_Tengoku/Desktop/Formation/Projet/P5_Gibeaux_Louis-Marie_dev/Application_web/product.html?id=' +
                    value[i]._id + '"><h2 class="card-title">' +
                    value[i].name +
                    '</h2></a><p class="card-text">' +
                    value[i].description +
                    '</p></div></div><div class="col-md-2"><div class="card-body"><p class="card-text price-color">Prix : <span class="price">' +
                    value[i].price +
                    '€</span></p></div></div></div></div>';
            }
        } else {
            console.log("error id list_prod");
        }
    })
    .catch(function (err) {
        console.log(err);
    });

if (cart_list) {
    var cart = getCart();
    for (i in cart) {
        cart_list.innerHTML +=
            '<div class="card mb-3" data-id="' +
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
            '</p></div></div><div class="col-md-2"><div class="card-body"><p class="card-text price-color"> Prix : <span class="price">' +
            cart[i].price +
            '€</span></p><p class="card-text">Quantité : </p><input class="w-25" onchange="editProductQty(\'' +
            cart[i]._id + '\')" id="prod-qty-' +
            cart[i]._id + '" name="prod-qty-' +
            cart[i]._id + '" type="number" min="1" value="' +
            cart[i].qty + '" /><button class="btn" onclick="deleteProduct(\'' +
            cart[i]._id + '\')">Supprimer</button></div></div></div></div></div></div>';
    }

} else {
    console.log("error id cart_list");
}

var test_pro = document.getElementById("prod_test");
if (test_pro) {
    getProduct();
} else {
    console.log("test pro echec");
}