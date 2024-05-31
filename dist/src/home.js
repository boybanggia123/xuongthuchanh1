var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url, fetchAPI } from "../src/app.js";
export const getCatalogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlCatalogs = url + 'categories';
    return yield fetchAPI(urlCatalogs);
});
export const showCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield getCatalogs();
    let html = categories.map((item) => {
        let link = `index.html?catagories=${item.id}`;
        return `
        <div class="col-md-4 py-3 py-md-0">
                <div class="card" id="tpc">
                    <img src="./public/images/${item.img}" alt="" class="card image-top">
                    <div class="card-img-overlay">
                        <h4 class="card-titel"><a href=${link} class="nav-link">${item.name}</a></h4>
                        <p class="card-text">Lorem ipsum dolor.</p>
                        <div id="btn2"><button>View More</button></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    return html;
});
export const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlproducts = `${url}products`;
    let categoriesId = '';
    if (urlParams.has('categories')) {
        categoriesId = urlParams.get('categories') || '';
        urlproducts += `?categoriesId=${categoriesId}`;
    }
    const data = yield fetchAPI(urlproducts);
    return data;
});
export const showProducts = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield getProduct();
    const html = products.map((item) => `
        <div class="col-md-3 py-3 py-md-2">
        <div class="card">
            <div class="card-body" id="c">
                    <img src="./public/images/${item.img}" alt="" class="card-image-top">
                    <h3 class="card-title text-center">${item.name}</h3>
                    <p class="card-text text-center">$<span>${item.price}<span></p>
                    <input type="number" name="soluong" min="1" max="10" value="1">
                    <input type="hidden" value="${item.id}">
                    <button id="btn3" class="addCart">Shop Now</button>
            </div>
            </div>
        </div>
        `).join('');
    return html;
});
export const addTocard = (x) => {
    let arrCarts = [];
    const arrCart_str = sessionStorage.getItem("ssCart");
    if (arrCart_str !== null) {
        arrCarts = JSON.parse(arrCart_str);
    }
    let countItem = parseInt(sessionStorage.getItem("countItem"));
    if (Number.isNaN(countItem)) {
        countItem = 0;
    }
    const product = x.parentElement.children;
    const image = product[0].src;
    let img = '';
    if (image !== '') {
        const arr = img.split('/');
        img = arr[arr.length - 1];
    }
    const name = product[1].innerText;
    const price = product[2].children[0].innerText;
    const quantity = parseInt(product[3].value, 10);
    const id = product[4].value;
    const productCart = [image, name, price, quantity, id];
    let check = 0;
    for (let i = 0; i < arrCarts.length; i++) {
        if (arrCarts[i][2] === price) {
            const amount = quantity + arrCarts[i][3];
            arrCarts[i][3] = amount;
            check = 1;
            break;
        }
    }
    if (check === 0) {
        arrCarts.push(productCart);
        countItem++;
    }
    sessionStorage.setItem("ssCart", JSON.stringify(arrCarts));
    sessionStorage.setItem("countItem", countItem.toString());
};
export const showCountProduct = () => {
    let countItem = parseInt(sessionStorage.getItem("countItem"));
    if (Number.isNaN(countItem)) {
        countItem = 0;
    }
    return countItem;
};
