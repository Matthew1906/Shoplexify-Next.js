export interface authResponse {
    status: boolean
    message?:string
    error?: {
        email?:string
        password?:string
        username?:string
        confirmPassword?:string
    }
}

export interface searchParams {
    query?: string 
    categories?: string,
    minPrice?: number,
    maxPrice?: number,
    rating?: string,
    sortBy?: string
    page?: number
}

export interface Product {
    name: string,
    slug: string, 
    image_url: string,
    price: number,
    avg_rating: number,
    num_sold: number,
}

export interface productsResponse {
    page?: number,
    length?: number,
    data?: Array<Product>
}

export interface Review {
    user: string,
    rating: number,
    review: string
}

export interface productResponse extends Product {
    description?: string,
    stock?: number,
    reviews?: Array<Review>,
}

export interface orderResponse extends Product {
    quantity: number,
    rated_by?: number
}