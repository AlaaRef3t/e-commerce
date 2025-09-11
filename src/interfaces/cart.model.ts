// API response for cart
export interface CartResponse {
    status: string;
    data: CartData;
    numOfCartItems: number;
    cartId: string;


}

export interface CartData {
    cartOwner: string;
    createdAt: string;
    updatedAt: string;
    totalCartPrice: number;
    products: CartProduct[];
    __v: number;
    _id: string;
}

export interface CartProduct {
    count: number;
    price: number;
    product: Product;
    _id: string;
}

export interface Product {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
    quantity: number;
    ratingsAverage: number;
    brand: Brand;
    category: Category;
    subcategory: Subcategory[];
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}
// الكارت نفسه
