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
const urlProducts = url + "products";
const getAllProductByFeatured = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlFeatured = urlProducts + '?featured=1';
    const data = yield fetchAPI(urlFeatured);
    console.log(data);
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = data.map((item) => {
        return `
        <div class="col-md-3 py-3 py-md-0" id="c">
        <div class="card">
            <img src="./public/images/${item.img}" alt="" class="card image-top">
            <div class="card-body">
                <h3 class="card-titel text-center">${item.name}</h3>
                <p class="card-text text-center">${item.price}$</p>
                <div id="btn3"><button>Shop Now</button></div>
            </div>
        </div>
    </div>
        `;
    }).join('');
});
getAllProductByFeatured();
const showAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlAllProducts = urlProducts;
    const data = yield fetchAPI(urlAllProducts);
    console.log(data);
    const productsList = document.getElementById('productsall');
    productsList.innerHTML = data.map((item) => {
        return `
        <div class="col-md-3 py-3 py-md-0" id="c">
            <div class="card">
                <img src="./public/images/${item.img}" alt="" class="card image-top">
                <div class="card-body">
                    <h3 class="card-titel text-center">${item.name}</h3>
                    <p class="card-text text-center">${item.price}$</p>
                    <div id="btn3"><button>Shop Now</button></div>
                </div>
            </div>
        </div>
        `;
    }).join('');
});
showAllProducts();
