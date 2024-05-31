import {url,fetchAPI} from "../src/app.js"
import { cart} from "../models/cart.js";
import { cart_detail } from "../models/cart_detail.js";


// Hiển thị thông tin giỏ hàng trên trang cart.html
export const showMyCart = () => {
    const cart_str = sessionStorage.getItem('ssCart');
    const myCart = JSON.parse(cart_str);
    let tong = 0;
    let ttgh = myCart.map((item, index) => {
      const tt = item[2] * item[3];
      tong += tt;
      return `
      <li class="list-group-item d-flex justify-content-between lh-sm">
      <input type="hidden" ${index+1}>
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
  

  // Thay đổi số lượng trong trang cart.html
export const changeQuantity = (x) => {

    const myCart = JSON.parse(sessionStorage.getItem('ssCart'));
  
    const product = x.parentElement.parentElement;
    const price = product.children[2].innerText;
    const quantity = product.children[3].innerText;
    const quantitynew = x.value;
    let tt = product.children[4].innerText;
    let total: number = parseInt(document.getElementById("total").innerText);
    
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
      } else {
        x.value = 1;
        total += Number.parseInt(tt);
      }
    } else {
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
    return  total;
  }
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    checkOut();
});

 export const checkOut = async () => {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const address: string = (document.getElementById('address') as HTMLInputElement).value;
    const phone: string = (document.getElementById('phone') as HTMLInputElement).value;
    const total: number = parseInt((document.getElementById('total') as HTMLDivElement).innerHTML);

    const cartItem = new cart(username, address, phone, total);

    try {
        // Thêm cart vào db
        const urlCart = url + 'carts';
        const option = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cartItem)
        };
        const result = await fetchAPI(urlCart, option);
        // Thêm cart details
        await addCartDetail(result.id);

        // Xóa giỏ hàng trong sessionStorage
        sessionStorage.removeItem('ssCart');
        sessionStorage.removeItem('countItem');

        // Chuyển trang về Index.html và hiển thị thông báo
        window.location.href = "../index.html";
        alert('Đặt hàng thành công');
    } catch (error) {
        console.error('Lỗi khi thực hiện thanh toán:', error);
        alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại sau.');
    }
}

// Hàm thêm cart detail vào db
const addCartDetail = async (cart_id) => {
    const cart_str = sessionStorage.getItem('ssCart');
    const myCart = JSON.parse(cart_str);
    const urlCartDetail = url + 'cart_details';
    console.log(cart_id,myCart);
    
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

        await fetchAPI(urlCartDetail, option);
    }
}
