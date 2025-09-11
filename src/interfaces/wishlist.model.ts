export interface WishlistResponse {
    status: string;
    count: number;
    data: WishlistProduct[];
}

export interface WishlistProduct {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    images: string[];
    category: Category;
    brand: Brand;
    subcategory: Subcategory[];
    ratingsAverage: number;
    ratingsQuantity: number;
    sold: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
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
