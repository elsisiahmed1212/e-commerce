import axios from "axios";

let token = localStorage.getItem('usertoken')
export function onlinepayment({cartid , shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,{shippingAddress},{headers:{
        token: token
    }})
}
export function cashpayment({cartid , shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,{shippingAddress},{headers:{
        token: token
    }})
}