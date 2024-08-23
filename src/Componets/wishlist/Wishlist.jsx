import { useMutation, useQuery } from "@tanstack/react-query";
import { useQuerycart } from "../Hooks/useQuerycart";
import { addTocartapi, clearproductcart, deletetowishlist, deletproductcart, getallwishlist, getcart, updateproductcart } from "../../Apis/cartApi";
import { useMutationcart } from "../Hooks/useMutationcart";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Lodaing from "../loding/Loding";
function Wishlist() {

    let { isLoading, data, isError, error } = useQuerycart('getwishcart', getallwishlist)

    const { status: cartStatus, mutate: addToCart ,data:f} = useMutationcart(addTocartapi);
    const { status: deleteitem, mutate: deletitemformwish  ,isPending} = useMutationcart(deletetowishlist);


    useEffect(() => {
        if (cartStatus === 'success') {
            toast(data?.data?.message);
        } else if (cartStatus === 'error') {
            console.log('Failed to add to cart');
        }
    }, [cartStatus]);

    if ( isLoading ) {
        return <Lodaing></Lodaing>
    }


    if ( isPending ) {
        return <Lodaing></Lodaing>
    }
    

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap p-2 my-4">
                {data?.data?.data.map((element) => (
                    <div key={element?._id} className="w-full md:w-1/6 sm:w-1/2 p-2">
                        <div className="cursor-pointer p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img
                                src={element?.imageCover}
                                className="w-full h-40 object-cover rounded-t-lg"
                                alt=""
                            />
                            <p className="text-green-700 mt-2 font-semibold">{element?.category?.name}</p>
                            <p className="line-clamp-1 text-gray-800">{element?.title}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-lg font-bold text-gray-900">{element?.price} EGP</p>
                                <p className="flex items-center text-yellow-500">
                                <i className="fa-solid fa-star"></i>
                                <span className="ml-1 text-gray-700">{element?.ratingsAverage}</span>
                                </p>
                            </div>
                            <button
                            onClick={() => { addToCart(element?._id); }}
                                className="bg-green-700 text-white w-full p-2 rounded mt-4 hover:bg-green-800 transition-colors duration-300"
                            >
                                ADD TO CART
                            </button>
                            <button
                            onClick={() => { deletitemformwish(element?._id)}}
                                className="bg-red-700 text-white w-full p-2 rounded mt-4 hover:bg-red-800 transition-colors duration-300"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}

export default Wishlist;

