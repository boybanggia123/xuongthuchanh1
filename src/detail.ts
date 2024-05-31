import { url, fetchAPI } from "../src/app.js";
import { Product } from "../models/product.js";

// Hàm lấy thông tin của một sản phẩm dựa trên ID
const getOneProduct = async (productId) => {
    try {
        // Lấy thông tin sản phẩm từ API
        const response = await fetch(`${url}/products/${productId}`);
        const productData = await response.json();

        // Tạo một đối tượng Product từ dữ liệu nhận được
        const product = new Product(
            productData.name,
            productData.img,
            productData.price,
            productData.description,
            productData.categoriesId
        );

        // Hiển thị thông tin sản phẩm trong trang HTML
        const imgElement = document.querySelector('.mimg img') as HTMLImageElement | null;
        if (imgElement) {
            imgElement.src = product.img;
        }
        
        const bangH3Element = document.querySelector('.bang h3') as HTMLHeadingElement | null;
        if (bangH3Element) {
            bangH3Element.textContent = product.name;
        }
        
        const bangPElement = document.querySelector('.bang p.fs-4') as HTMLParagraphElement | null;
        if (bangPElement) {
            bangPElement.textContent = product.price + " đ";
        }
        
        const motaPElement = document.querySelector('.mota p') as HTMLParagraphElement | null;
        if (motaPElement) {
            motaPElement.textContent = product.description;
        }
        
        

    } catch (error) {
        console.error(error);
    }
};

// Sử dụng sự kiện click để gọi hàm getOneProduct khi người dùng nhấp vào một sản phẩm
document.addEventListener("DOMContentLoaded", () => {
    const productLinks = document.querySelectorAll('.product-link') as NodeListOf<HTMLAnchorElement>; // Chỉ định kiểu của phần tử là HTMLAnchorElement
    productLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
            const productId = link.dataset.productId; // Lấy ID của sản phẩm từ thuộc tính data-product-id
            if (productId) {
                getOneProduct(productId); // Gọi hàm getOneProduct với productId đã lấy được
            }
        });
    });
});

