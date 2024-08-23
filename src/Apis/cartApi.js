import axios from "axios";

let token = localStorage.getItem('usertoken')

// ADD PRODUCT TO CART
export function addTocartapi(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{headers:{
        token: token
    }})
}
///GET CART
export function getcart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{
        token: token
    }})
}

// DELETE PRODUCT FOR CART
export function deletproductcart(cartid) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartid}`,{headers:{
        token: token
    }})
}

// UPDATE PRODUCT FOR CART
export function updateproductcart({id,count}) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{
        token: token
    }})
}

// CLEAR PRODUCT FROM CART
export function clearproductcart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{headers:{
        token: token
    }})
}

// Get all Categories 

export function getallCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

// Get all wish list 

export function getallwishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist/`,{headers:{
        token: token
    }})
}
// ADD TI WISHCART

export function addtowishlist(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist/`,{productId},{headers:{
        token: token
    }})
}
// REMOVE TI WISHCART
export function deletetowishlist(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:{
        token: token
    }})
}