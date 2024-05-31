export class Product {
    id: string;
    name: string;
    img: string;
    price: number;
    description: string;
    categoriesId: string;

    constructor( name: string, img: string, price: number, description: string, categoriesId: string) {
        
        this.name = name;
        this.img = img;
        this.price = price;
        this.description = description;
        this.categoriesId = categoriesId;
    }
}
