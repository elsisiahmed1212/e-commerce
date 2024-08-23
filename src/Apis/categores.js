import axios from 'axios';

export default async function getcategories(){

    try {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        return data?.data
    } catch (error) {
        return error?.message
    }

}