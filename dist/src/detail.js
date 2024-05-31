var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url } from "../src/app.js";
import { Product } from "../models/product.js";
const getOneProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${url}/products/${productId}`);
        const productData = yield response.json();
        const product = new Product(productData.name, productData.img, productData.price, productData.description, productData.categoriesId);
        const imgElement = document.querySelector('.mimg img');
        if (imgElement) {
            imgElement.src = product.img;
        }
        const bangH3Element = document.querySelector('.bang h3');
        if (bangH3Element) {
            bangH3Element.textContent = product.name;
        }
        const bangPElement = document.querySelector('.bang p.fs-4');
        if (bangPElement) {
            bangPElement.textContent = product.price + " đ";
        }
        const motaPElement = document.querySelector('.mota p');
        if (motaPElement) {
            motaPElement.textContent = product.description;
        }
    }
    catch (error) {
        console.error(error);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = link.dataset.productId;
            if (productId) {
                getOneProduct(productId);
            }
        });
    });
});
