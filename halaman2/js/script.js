let iconCart = document.querySelector ('.icon-cart');
let closeCart = document.querySelector ('.close');
let body = document.querySelector ('body');
let listprodukHTML = document.querySelector ('.listproduk');
let listkeranjangHTML = document.querySelector ('.listkeranjang');
let iconCartSpan = document.querySelector ('.icon-cart span');

let listproduk = [];
let carts = [];

iconCart. addEventListener('click',() => {
    body.classList.toggle('showCart')
})
closeCart. addEventListener('click',() => {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    listprodukHTML.innerHTML = '';
    if (listproduk.length > 0){
        listproduk.forEach (produk => {
            let newproduk = document.createElement ('div');
            newproduk.classList.add('item');
            newproduk.dataset.id = produk.id;
            newproduk.innerHTML = `
            <img src="${produk.image}" alt="">
            <h2>${produk.name}</h2>
            <div class="price">${produk.harga}</div>
            <button class="tambahkeranjang">
                Tambah Ke Keranjang
            </button>
            `;
            listprodukHTML.appendChild (newproduk);
        })
    }
}

listprodukHTML.addEventListener('click', (event) => {
    let posisitionClick = event.target;
    if (posisitionClick.classList.contains('tambahkeranjang')){
        let produk_id = posisitionClick.parentElement.dataset.id;
        tambahkeranjang(produk_id);

    }
})

const tambahkeranjang = (produk_id) => {
    let positionThisProductInCart = carts.findIndex ((value) => value.produk_id == produk_id);

    if (carts.length <= 0){
        carts = [{
            produk_id: produk_id,
            quantity: 1 
        }]
    }else if (positionThisProductInCart < 0) {
        carts.push ({
            produk_id: produk_id,
            quantity: 1
        });
    } else {
        carts [positionThisProductInCart].quantity = carts [positionThisProductInCart].quantity + 1;
        
}
addCartToHTML();
}

const addCartToHTML = () => {
    listkeranjangHTML.innerHTML = '';
    if (carts.length > 0){
        carts.forEach (cart => {
            let newCart = document.createElement('div');
            newCart.classList.add ('item');
            let positionproduk = listproduk.findIndex((value) => value.id == cart. produk_id);
            let info = listproduk [positionproduk];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
            ${info.name}
            </div>
            <div class="totalharga">
            ${info.harga * cart.quantity}
            </div>
            <div class="jumlahbarang">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
            listkeranjangHTML.appendChild(newCart);
        })
    }
}

const initApp = () => {
    // nerima data dari json
    fetch ('produk.json')
    .then (response => response.json())
    .then (data => {
        listproduk = data;
        addDataToHTML ();
    })
}

initApp();