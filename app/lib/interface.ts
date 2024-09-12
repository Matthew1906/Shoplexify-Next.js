import { reviews } from "@prisma/client"

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

export interface productMutationData {
    name: string,
    id: number,
    description: string, 
    image_url: string,
    price: number,
    stock?:number,
    categories?: Array<string> 
}

export interface productMutationResponse {
    status: boolean
    message?:string
    slug?:string,
    error?: {
        name?:string
        description?:string
        image?:string
        price?:string
        stock?:string,
        categories?:string
    }
}

export interface Review {
    user: string,
    rating: number,
    review: string
}

export interface productResponse extends Product {
    id: number,
    status: boolean,
    description: string,
    stock: number,
    categories?: Array<string>,
    reviews?: Array<Review>,
}

export interface orderResponse extends Product {
    quantity: number,
    rated_by?: number,
    stock?: number
}

export interface coordinates {
    lat: number,
    lng: number
}

export interface address extends coordinates {
    address?: string
}

export interface geolocationResponse {
    formatted_address: string,
    geometry: {
        location:{
            lat:number,
            lng:number
        }
    }
}

export interface transactionResponse {
    id: number,
    date: Date,
    status: string,
    total_price: number
}

export interface transactionHistoryDetails extends Product{
    quantity: number,
    rated_by?: number,
}

export interface transactionHistoryResponse {
    id:number,
    status:boolean,
    date: Date,
    address: string,
    delivery_cost: number,
    transaction_status: string
    details: Array<transactionHistoryDetails>
}

export interface reviewResponse {
    status: boolean,
    review: reviews,
    hasPurchased: boolean
}

export interface profileResponse {
    status: boolean
    message?:string
    error?: {
        dob?:string,
        password?:string
        confirmPassword?:string
    }
}

export interface imageInput {
    preview: string
}