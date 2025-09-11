export interface ProductDetails {
	_id: string;
	id: string;
	title: string;
	slug: string;
	description: string;
	quantity: number;
	price: number;
	priceAfterDiscount: number;
	imageCover: string;
	images: string[];
	category: Category;
	brand: Brand;
	subcategory: Subcategory[];
	ratingsAverage: number;
	ratingsQuantity: number;
	sold: number;
	reviews: unknown[];
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
}
  

