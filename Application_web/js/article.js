//////////////////////////////////////////////
// Retourne l'id du produit contenu dans l'url
function getURL() {
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        const product_id = urlParams.get('id');
        return product_id;
    }
}

//////////////////////////////////////////////
// Retourne la fiche d'un produit
function getProduct() {
    let product_id = getURL();

    fetch("http://localhost:3000/api/teddies/" + product_id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            if (document.getElementById("article")) {
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
        })
        .catch(function (err) {
            console.log(err);
            window.location.href = "index.html";
        });
}
