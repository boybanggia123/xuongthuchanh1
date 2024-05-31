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
import { Product } from "../models/product.js";
const urlProducts = url + "products/";
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchAPI(urlProducts);
    const productsAdmin = document.getElementById("productadmin");
    productsAdmin.innerHTML = data.map((product, index) => {
        return `
        <tr>                 
                              <td>${index + 1}</td> 
                              <td>${product.name}</td>
                              <td>
                              <img src="/public/images/${product.img}" alt="" width="100px">
                            </td>
                              <td>${product.price} $</td>
                              <td><button type="button" class="btn btn-info" name="edit" id="${product.id}">Edit</button>
                                <button type="button" class="btn btn-info" name="remove" id="${product.id}">Remove</button>

                              </td>
                            </tr>
        `;
    }).join('');
});
const getAllProductid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const urlProCateid = urlProducts + id;
    const data = yield fetchAPI(urlProCateid);
    return data;
});
const removeProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const urlProduct_id = urlProducts + id;
    const option = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    };
    yield fetchAPI(urlProduct_id, option);
    getAllProducts();
});
const submitForm = () => {
    const hiddentId = document.getElementById("id").value;
    if (hiddentId == "") {
        addNewproduct();
    }
    else {
        updateProduct(hiddentId);
    }
};
const showCategoriesInDropdown = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield fetchAPI(url + 'categories');
    const dropdown = document.getElementById('dm');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        dropdown.appendChild(option);
    });
});
const addNewproduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.getElementById("ten").value;
    const price = parseFloat(document.getElementById("gia").value);
    const img = document.getElementById("imgnew");
    const imgPath = img.value;
    const imgExtension = imgPath.split('\\').pop().toLowerCase();
    const description = document.getElementById("mota").value;
    const categoriesId = document.getElementById("dm").value;
    console.log(imgExtension);
    const product = new Product(name, imgExtension, price, description, categoriesId);
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    yield fetchAPI(urlProducts, option);
    getAllProducts();
});
const updateProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.getElementById("ten").value;
    const price = parseFloat(document.getElementById("gia").value);
    const img = document.getElementById("imgnew");
    const imgPath = img.value;
    const imgExtension = imgPath.split('\\').pop().toLowerCase();
    const description = document.getElementById("mota").value;
    const categoriesId = document.getElementById("dm").value;
    const product = new Product(name, imgExtension, price, description, categoriesId);
    const urlEdit = urlProducts + id;
    const option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    yield fetchAPI(urlEdit, option);
    getAllProducts();
});
document.getElementById('imgnew').addEventListener('change', function (event) {
    if (event.target instanceof HTMLInputElement) {
        const newImg = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const imgElement = document.getElementById('imgold');
            if (imgElement instanceof HTMLImageElement) {
                imgElement.src = reader.result;
            }
        };
        reader.readAsDataURL(newImg);
    }
});
const loadProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAllProductid(id);
    const tenInput = document.getElementById('ten');
    if (tenInput)
        tenInput.value = data.name;
    const giaInput = document.getElementById('gia');
    if (giaInput)
        giaInput.value = data.price.toString();
    const motaInput = document.getElementById('mota');
    if (motaInput)
        motaInput.value = data.describe;
    const dmInput = document.getElementById('dm');
    if (dmInput)
        dmInput.value = data.categoriesId;
    const idInput = document.getElementById('id');
    if (idInput)
        idInput.value = data.id;
    const imgElement = document.getElementById('imgold');
    if (imgElement)
        imgElement.src = `/public/images/${data.img}`;
});
window.addEventListener('click', e => {
    const elementName = e.target.name;
    const elementId = e.target.id;
    switch (elementName) {
        case 'edit':
            loadProduct(elementId);
            break;
        case 'remove':
            removeProduct(elementId);
            break;
        case 'btnSubmit':
            submitForm();
            break;
        default:
            break;
    }
});
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    yield showCategoriesInDropdown();
}));
getAllProducts();
