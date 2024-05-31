import { url, fetchAPI } from "../src/app.js";

const urlProducts = url + "products";

const getAllProductByFeatured = async () => {
    const urlFeatured = urlProducts + '?featured=1' ;
    const data = await fetchAPI(urlFeatured);
    console.log(data);
    
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = data.map((item)=>{
        return`
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
    
    
}
    getAllProductByFeatured();
   

// Định nghĩa hàm showProducts
const showAllProducts = async () => {
     //Lấy dữ liệu từ API
     const urlAllProducts = urlProducts;
    const data = await fetchAPI(urlAllProducts);
    console.log(data);
    
    // Hiển thị dữ liệu lấy được lên trang web
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
}

// Gọi hàm showProducts để kích hoạt kết nối và hiển thị dữ liệu từ API
showAllProducts(); 
