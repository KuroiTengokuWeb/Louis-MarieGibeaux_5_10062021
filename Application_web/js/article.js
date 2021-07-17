// Affiche la liste des produits de l'accueil
function affAllProduct(productList) {
    prodList = document.getElementById("prod-list");
    // creation de la card pour chaque produit
    for (i in productList) {
        prodList.innerHTML +=
            '<div class="card mb-3" data-id="' +
            productList[i]._id +
            '"><div class="row g-0 bg-color"><div class="col-md-4"><div class="card-body"><a href="product.html?id=' +
            productList[i]._id + '"><img class="product_image" src="' +
            productList[i].imageUrl +
            '" alt="' +
            productList[i].name +
            '"></a></div></div><div class="col-md-6"><div class="card-body"><a href="product.html?id=' +
            productList[i]._id + '"><h2 class="card-title">' +
            productList[i].name +
            '</h2></a><p class="card-text">' +
            productList[i].description +
            '</p></div></div><div class="col-md-2"><div class="card-body"><p class="card-text price-color">Prix : <span class="price">' +
            productList[i].price / 100 +
            '€</span></p></div></div></div></div>';
    }
}

//////////////////////////////////////////////
// Récupere tout les produits puis les affiches
function getAllProduct() {
    fetch("http://localhost:3000/api/teddies")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            // Affichage de la liste d'articles
            affAllProduct(value);
            return value;
        })
        .catch(function (err) {
            console.log(err);
        });
}

//////////////////////////////////////////////
// Affiche un produit passer en paramétre
function affProduct(value) {
    prod = document.getElementById("article");
    prod.innerHTML +=
        '<div class="card mb-3" data-id="' +
        value._id +
        '"><div class="row g-0 bg-color"><div class="col-md-4"><div class="card-body"><img class="product_image" src="' +
        value.imageUrl +
        '" alt="' +
        value.name +
        '"></div></div><div class="col-md-6"><div class="card-body"><h5 class="card-title">' +
        value.name +
        '</h5><p class="card-text">' +
        value.description +
        '</p><label for="product-color-' +
        value._id + '">Couleurs : </label><select id="product-color-' +
        value._id + '"></select></div></div><div class="col-md-2"><div class="card-body"><p class="card-text price-color"> Prix : <span class="price">' +
        value.price / 100 +
        '€</span></p><p class="card-text">Quantité : </p><input class="w-25" id="prod-qty-' +
        value._id + '" name="prod-qty-' +
        value._id + '" type="number" min="1" value="1" /><button class="btn" onclick="addCart(\'' +
        value._id +
        '\')">Ajouter au panier</button></div></div></div></div></div></div>';
    var clr = document.getElementById("product-color-" + value._id);
    for (i in value.colors) {
        clr.innerHTML += "<option value=\"" + value.colors[i] + "\">" + value.colors[i] + "</option>";
    }
}

//////////////////////////////////////////////
// Recupere un produit, le stock dans une variable et l'affiche
function getProduct(product_id) {
    fetch("http://localhost:3000/api/teddies/" + product_id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            affProduct(value);
            product = value;
            return value;
        })
        .catch(function (err) {
            console.log(err);
            window.location.href = "index.html";
        });
}
