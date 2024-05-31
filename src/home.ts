import {url,fetchAPI} from "../src/app.js"


export const getCatalogs = async () =>{
    const urlCatalogs = url + 'categories';
    return await fetchAPI(urlCatalogs);
};
export const showCategory = async (data) =>{
    
    const categories = await  getCatalogs();
     let html = categories.map((item)=>{
        let link = `index.html?catagories=${item.id}`;
        return`
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
        `
    }).join('');
    return html;
};  

export const getProduct = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlproducts = `${url}products`;
    let categoriesId = '';
    if (urlParams.has('categories')) {
        categoriesId = urlParams.get('categories') || '';
        urlproducts += `?categoriesId=${categoriesId}`;
    }
    const data = await fetchAPI(urlproducts);
    return data;
};


// Hiển thị danh sách sản phẩm ra trang index.html
export const showProducts = async (data) => {
    const products = await getProduct();
    const html = products.map((item) =>
        `
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
        `
    ).join('');
    return html;
};
// thêm sản phẩm vào giỏ hàng
export const addTocard = (x)=>{
    let arrCarts = [];
    // đọc từ giỏ hàng sessionStorage
    const arrCart_str = sessionStorage.getItem("ssCart");
    if (arrCart_str !== null) {
    arrCarts = JSON.parse(arrCart_str);
    }
    // Đọc tong số san phẩm tu sessionStorage
    let countItem = parseInt(sessionStorage.getItem("countItem"))
    if (Number.isNaN(countItem) ) {
    countItem = 0;
    }
    // Lấy thông tin sản phẩm đang chọn thêm vào giohang
    const product = x.parentElement.children;
    const image = product[0].src;
    let img = '';
    if (image !== '') {
    const arr = img.split('/'); // \/ là lấy đúng phần tử cuối ở ảnh thây vì http://23kefjwn09234.jpg
    img = arr[arr.length - 1];
    }
    const name = product[1].innerText;
    const price = product[2].children[0].innerText;
    const quantity = parseInt(product[3].value, 10);
    const id = product[4].value;
    const productCart = [image, name, price, quantity,id];

    // kiem tra cap nhat so luong mat hang da chon
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
// hiển thị số sẩn phẩm đang chọn trong giỏ hàng
export const showCountProduct = () =>{
    let countItem = parseInt(sessionStorage.getItem("countItem"));
    if (Number.isNaN(countItem) ) {
    countItem = 0;
    }
    return countItem;
}



