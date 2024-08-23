import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addTocartapi, addtowishlist, deletetowishlist } from "../../Apis/cartApi";
import { useMutationcart } from "../Hooks/useMutationcart";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";

export default function Item({ ele }) {
    const [flages, setFlages] = useState(false);


    const { status: cartStatus, mutate: addToCart ,data } = useMutationcart(addTocartapi);
    const { status: deleteitem, mutate: deletitemformwish } = useMutationcart(deletetowishlist);
    useEffect(() => {
        if (cartStatus === 'success') {
            toast('item add to your cart');
        } else if (cartStatus === 'error') {
            console.log('Failed to add to cart');
        }
    }, [cartStatus]);


    const { mutate: addToWish, status: wishAddStatus } = useMutationcart(addtowishlist);

    useEffect(() => {
        if (wishAddStatus === 'success') {
            toast("Added to wishlist!");
            setFlages(true);
        } else if (wishAddStatus === 'error') {
            toast.error("Failed to add to wishlist!");
        }
    }, [wishAddStatus]);


    const { mutate: removeFromWishlist, status: wishRemoveStatus } = useMutationcart(deletetowishlist);

    useEffect(() => {
        if (wishRemoveStatus === 'success') {
            toast("Removed from wishlist!");
            setFlages(false);
        } else if (wishRemoveStatus === 'error') {
            toast.error("Failed to remove from wishlist!");
        }
    }, [wishRemoveStatus]);

    const handleWishlistClick = () => {
        if (flages) {
            removeFromWishlist(ele?._id);
            deletitemformwish(ele?._id)
        } else {
            addToWish(ele?._id);
        }
    };

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 my-4">
        <i
            onClick={handleWishlistClick}
            className={`fa-solid fa-heart ms-2 cursor-pointer ${flages ? 'text-red-500' : 'text-gray-400'}`}
        ></i>
        <div className="cursor-pointer p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <Link to={`/ProdouctDetalise/${ele._id}/${ele.category._id}`}>
                <img
                    src={ele?.imageCover}
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt={ele?.title}
                />
                <p className="text-green-700 mt-2 font-semibold">{ele?.category?.name}</p>
                <p className="line-clamp-1 text-gray-800">{ele?.title}</p>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-gray-900">{ele?.price} EGP</p>
                    <p className="flex items-center text-yellow-500">
                        <i className="fa-solid fa-star"></i>
                        <span className="ml-1 text-gray-700">{ele?.ratingsAverage}</span>
                    </p>
                </div>
            </Link>
            <button
                onClick={() => { addToCart(ele?._id); }}
                className="bg-green-700 text-white w-full p-2 rounded mt-4 hover:bg-green-800 transition-colors duration-300"
            >
                ADD TO CART
            </button>
        </div>
    </div>
    
    );
}
