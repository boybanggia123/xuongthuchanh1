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
const urlCategory = url + 'categories/';
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    };
    const data = yield fetchAPI(urlCategory, option);
    showCategories(data);
});
const showCategories = (data) => {
    const categoryhome = document.getElementById('categories');
    categoryhome.innerHTML = data.map((item) => {
        return `
        <div class="col-md-4 py-3 py-md-0">
                <div class="card" id="tpc">
                    <img src="./public/images/${item.img}" alt="" class="card image-top">
                    <div class="card-img-overlay">
                        <h4 class="card-titel">${item.name}</h4>
                        <p class="card-text">Lorem ipsum dolor.</p>
                        <div id="btn2"><button>View More</button></div>
                    </div>
                </div>
            </div>`;
    }).join('');
};
getCategories();
