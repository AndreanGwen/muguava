let iconCart = document.querySelector ('.icon-cart');
let closeCart = document.querySelector ('.close');
let body = document.querySelector ('body');
let listprodukHTML = document.querySelector ('.listproduk');
let listkeranjangHTML = document.querySelector ('.listkeranjang');
let iconCartSpan = document.querySelector ('.icon-cart span');
document.querySelector('.checkout').addEventListener('click', function() {
    window.location.href = 'https://api.whatsapp.com/send/?phone=%2B6289653540366&text&type=phone_number&app_absent=0'; // Ganti dengan URL tujuan
});

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
    if (posisitionClick.classList.contains('tambahkeranjang')) {
        let produk_id = parseInt(posisitionClick.parentElement.dataset.id);
        tambahkeranjang(produk_id);
    }
});

listkeranjangHTML.addEventListener('click', (event) => {
    let posisitionClick = event.target;
    if (posisitionClick.classList.contains('minus') || posisitionClick.classList.contains('plus')) {
        let produk_id = parseInt(posisitionClick.closest('.item').dataset.id);
        let type = posisitionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(produk_id, type);
    }
});

const tambahkeranjang = (produk_id) => {
    let positionThisProductInCart = carts.findIndex(value => value.produk_id == produk_id);

    if (carts.length === 0 || positionThisProductInCart < 0) {
        carts.push({
            produk_id: produk_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }

    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

const addCartToHTML = () => {
    listkeranjangHTML.innerHTML = '';
    let totalquantity = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            totalquantity += cart.quantity;
            let positionproduk = listproduk.findIndex(value => value.id == cart.produk_id);
            if (positionproduk === -1) return;

            let info = listproduk[positionproduk];
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.produk_id;
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalharga">${parseFloat(info.harga) * cart.quantity}</div>
                <div class="jumlahbarang">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listkeranjangHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalquantity;
};

const changeQuantity = (produk_id, type) => {
    let positionitemincart = carts.findIndex(value => value.produk_id == produk_id);
    if (positionitemincart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionitemincart].quantity += 1;
                break;
            default:
                let valuechange = carts[positionitemincart].quantity - 1;
                if (valuechange > 0) {
                    carts[positionitemincart].quantity = valuechange;
                } else {
                    carts.splice(positionitemincart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
};

const initApp = () => {
    fetch('produk.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data produk');
            }
            return response.json();
        })
        .then(data => {
            listproduk = data;
            addDataToHTML();
            if (localStorage.getItem('cart')) {
                try {
                    carts = JSON.parse(localStorage.getItem('cart')) || [];
                } catch (e) {
                    console.error("Data localStorage rusak, menghapus data.");
                    localStorage.removeItem('cart');
                    carts = [];
                }
                addCartToHTML();
            }
        })
        .catch(error => console.error('Error:', error));
};

initApp();
