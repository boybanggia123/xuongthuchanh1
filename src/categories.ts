import { url, fetchAPI } from "../src/app.js";

// Khai báo lại url 
const urlCategory = url + 'categories/';

// lấy tất cả thông tin danh mục

const getCategories = async () => {
    const option = {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        }
    };
    const data = await fetchAPI(urlCategory , option);
    showCategories(data);
}
const showCategories =  (data) => {
    // console.log(data);
    const categoryhome = document.getElementById('categories'); 
    categoryhome.innerHTML = data.map((item) => {
        return`
        <div class="col-md-4 py-3 py-md-0">
                <div class="card" id="tpc">
                    <img src="./public/images/${item.img}" alt="" class="card image-top">
                    <div class="card-img-overlay">
                        <h4 class="card-titel">${item.name}</h4>
                        <p class="card-text">Lorem ipsum dolor.</p>
                        <div id="btn2"><button>View More</button></div>
                    </div>
                </div>
            </div>`
    }).join('');
}

getCategories();
