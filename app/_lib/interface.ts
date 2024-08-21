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
    rating?: string
}

export interface Product {
    name: string,
    slug: string, 
    image_url: string,
    price: number,
    avg_rating: number,
    num_sold: number,
}