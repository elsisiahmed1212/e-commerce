import axios from 'axios';

export default async function getProduct(){

    try {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        return data?.data
    } catch (error) {
        return error?.message
    }

}