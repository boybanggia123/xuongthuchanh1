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
import { cart } from "../models/cart.js";
import { cart_detail } from "../models/cart_detail.js";
export const showMyCart = () => {
    const cart_str = sessionStorage.getItem('ssCart');
    const myCart = JSON.parse(cart_str);
    let tong = 0;
    let ttgh = myCart.map((item, index) => {
        const tt = item[2] * item[3];
        tong += tt;
        return `
      <li class="list-group-item d-flex justify-content-between lh-sm">
      <input type="hidden" ${index + 1}>
      <div><img src="${item[0]}" alt="" style="width: 80px;"></div>
      <div class="ip1">
        <h6 class="my-0">${item[1]}</h6>
          <input type="number" min="0" max="10" value="${item[3]}" class="quantity">
      </div>
      
      <span class="text-muted">${item[2]}</span>
      <span class="text-muted">${tt}</span>
      <i class="fa-solid fa-xmark" data-product-index="${index}"></i>
    </li>`;
    }).join('');
    ttgh += `
        <li class="list-group-item d-flex justify-content-between">
        <span>Tổng tiền</span>
        <strong id="total">${tong}</strong>
        </li>`;
    return ttgh;
};
export const changeQuantity = (x) => {
    const myCart = JSON.parse(sessionStorage.getItem('ssCart'));
    const product = x.parentElement.parentElement;
    const price = product.children[2].innerText;
    const quantity = product.children[3].innerText;
    const quantitynew = x.value;
    let tt = product.children[4].innerText;
    let total = parseInt(document.getElementById("total").innerText);
    total -= tt;
    if (quantitynew == 0) {
        if (confirm("Remove this product?")) {
            product.remove();
            for (let i = 0; i < myCart.length; i++) {
                if (myCart[i][1] === price) {
                    myCart.splice(i, 1);
                }
            }
            const countItem = parseInt(sessionStorage.getItem("countItem")) - 1;
            sessionStorage.setItem("countItem", countItem.toString());
        }
        else {
            x.value = 1;
            total += Number.parseInt(tt);
        }
    }
    else {
        for (let i = 0; i < myCart.length; i++) {
            if (myCart[i][1] === price) {
                myCart[i][3] = quantitynew;
            }
        }
        tt = quantity * quantitynew;
        product.children[4].innerHTML = tt;
        total += tt;
    }
    document.getElementById("total").innerHTML = total.toString();
    sessionStorage.setItem("ssCart", JSON.stringify(myCart));
    return total;
};
document.getElementById('checkoutBtn').addEventListener('click', () => {
    checkOut();
});
export const checkOut = () => __awaiter(void 0, void 0, void 0, function* () {
    const username = document.getElementById('username').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const total = parseInt(document.getElementById('total').innerHTML);
    const cartItem = new cart(username, address, phone, total);
    try {
        const urlCart = url + 'carts';
        const option = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cartItem)
        };
        const result = yield fetchAPI(urlCart, option);
        yield addCartDetail(result.id);
        sessionStorage.removeItem('ssCart');
        sessionStorage.removeItem('countItem');
        window.location.href = "../index.html";
        alert('Đặt hàng thành công');
    }
    catch (error) {
        console.error('Lỗi khi thực hiện thanh toán:', error);
        alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại sau.');
    }
});
const addCartDetail = (cart_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cart_str = sessionStorage.getItem('ssCart');
    const myCart = JSON.parse(cart_str);
    const urlCartDetail = url + 'cart_details';
    console.log(cart_id, myCart);
    const body = {};
    for (let i = 0; i < myCart.length; i++) {
        const cartDetail = new cart_detail(cart_id, myCart[i][4], myCart[i][2], myCart[i][3]);
        const option = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cartDetail)
        };
        yield fetchAPI(urlCartDetail, option);
    }
});
