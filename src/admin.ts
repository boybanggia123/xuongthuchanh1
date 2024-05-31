import { url, fetchAPI } from "../src/app.js";
import { Product } from "../models/product.js";
const urlProducts = url + "products/";

const getAllProducts = async () => {
    const data = await fetchAPI(urlProducts);
    const productsAdmin = document.getElementById("productadmin");
    productsAdmin.innerHTML = data.map((product,index)=>{
        return`
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
        `
    }).join('');
};

const getAllProductid =  async (id) => {
    const urlProCateid = urlProducts + id;
    const data = await fetchAPI(urlProCateid);
    return data;
};

// xóa 
const removeProduct = async(id)=> {
    const urlProduct_id = urlProducts + id;
    const option = {
        method : 'DELETE',
        headers:{
            'Content-type': 'application/json'
        },
    }
    await fetchAPI(urlProduct_id,option);
    getAllProducts();
}
const submitForm = ()=>{
    const hiddentId = (<HTMLInputElement>document.getElementById("id")).value;
    if(hiddentId == ""){
     // thêm mới
     addNewproduct();
    }else{
     updateProduct(hiddentId);
    }
 }


 const showCategoriesInDropdown = async () => {
    const categories = await fetchAPI(url + 'categories');
    const dropdown = document.getElementById('dm');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        dropdown.appendChild(option);
    });
};


 const addNewproduct = async () => {
    // Lấy dữ liệu từ form
    const name = (<HTMLInputElement>document.getElementById("ten")).value;
    const price = parseFloat((<HTMLInputElement>document.getElementById("gia")).value);
    const img = (<HTMLInputElement>document.getElementById("imgnew"));
    const imgPath = img.value;
    const imgExtension = imgPath.split('\\').pop().toLowerCase(); // Sửa lấy dữ liệu img
    const description = (<HTMLInputElement>document.getElementById("mota")).value;
    const categoriesId = (<HTMLInputElement>document.getElementById("dm")).value;
    console.log(imgExtension); 
    // Tạo đối tượng mới từ dữ liệu mới nhận được
    const product = new Product( name, imgExtension, price, description,categoriesId);
    // Thêm đối tượng mới vào db.json
    // Xác định url: urlProducts = http://localhost:3000/products/,
    // Option: method = "POST"
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };

    // Thêm vào db
    await fetchAPI(urlProducts, option);
    // Load lại sản phẩm
    getAllProducts();
};



const updateProduct = async (id)=>{
    //lấy dữa liệu từ form 
    const name = (<HTMLInputElement>document.getElementById("ten")).value;
    const price = parseFloat((<HTMLInputElement>document.getElementById("gia")).value);
    const img = (<HTMLInputElement>document.getElementById("imgnew"));
    const imgPath = img.value;
    const imgExtension = imgPath.split('\\').pop().toLowerCase();
    const description = (<HTMLInputElement>document.getElementById("mota")).value;
    const categoriesId = (<HTMLInputElement>document.getElementById("dm")).value;

    // tạo đối tượng mới từ dữ liệu mới nhận được
    const product = new Product( name, imgExtension, price, description, categoriesId);
    // thay đôi thông tin đối tượng mới vào db.json
    // xác định url:urlProducts=http://localhost:3000/products/, 
    // option: method = "PUT",
    const urlEdit= urlProducts + id
    const option =  {
        
        method : 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
    body : JSON.stringify(product)
}
    // thêm vao db
    await fetchAPI(urlEdit,option);
    // load lại sản phẩm
    getAllProducts();
}

// Hàm bắt sự kiện khi người dùng chọn ảnh mới từ input
document.getElementById('imgnew').addEventListener('change', function(event) {
    // Kiểm tra xem phần tử DOM có phải là một input kiểu file không
    if (event.target instanceof HTMLInputElement) {
        // Lấy file ảnh mới từ input
        const newImg = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            // Hiển thị ảnh mới trong thẻ <img> với id "imgold"
            const imgElement = document.getElementById('imgold');
            if (imgElement instanceof HTMLImageElement) {
                imgElement.src = reader.result as string;
            }
        }
        // Đọc file ảnh mới
        reader.readAsDataURL(newImg);
    }
});
// load sản phẩm đang được chọn ra form
const loadProduct = async (id) => {
    // Lấy thông tin sản phẩm từ server
    const data = await getAllProductid(id);
    // Hiển thị thông tin sản phẩm lên form
    const tenInput = document.getElementById('ten') as HTMLInputElement;
    if (tenInput) tenInput.value = data.name;

    const giaInput = document.getElementById('gia') as HTMLInputElement;
    if (giaInput) giaInput.value = data.price.toString();

    const motaInput = document.getElementById('mota') as HTMLInputElement;
    if (motaInput) motaInput.value = data.describe;

    const dmInput = document.getElementById('dm') as HTMLSelectElement;
    if (dmInput) dmInput.value = data.categoriesId;

    const idInput = document.getElementById('id') as HTMLInputElement;
    if (idInput) idInput.value = data.id;

    // Hiển thị ảnh cũ của sản phẩm trong thẻ <img> với id "imgold"
    const imgElement = document.getElementById('imgold') as HTMLImageElement;
    if (imgElement) imgElement.src = `/public/images/${data.img}`;
}


window.addEventListener('click',e =>{
    const elementName = (<HTMLButtonElement>e.target).name;
    const elementId = (<HTMLButtonElement>e.target).id;


    switch(elementName){
        case'edit':
            loadProduct(elementId);
            break;
        case'remove':
            removeProduct(elementId);
            break;
        case 'btnSubmit':
            submitForm();
            break;
            default:
                break;
    }
})
// Gọi hàm để hiển thị danh mục trong dropdown khi trang được tải
document.addEventListener('DOMContentLoaded', async () => {
    await showCategoriesInDropdown();
});

getAllProducts(); 