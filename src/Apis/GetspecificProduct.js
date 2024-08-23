import axios from 'axios';

export async function GetspecificProduct(proid){

    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${proid}`);
        return data?.data
    } catch (error) {
        return error?.message 
    }

}
export async function Getspecificcategory(categoryid){

    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryid}`);
        return data?.data
    } catch (error) {
        return error?.message 
    }

}