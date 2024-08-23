import { useMutation, useQuery } from "@tanstack/react-query";
import { useQuerycart } from "../Hooks/useQuerycart";
import { clearproductcart, deletproductcart, getcart, updateproductcart } from "../../Apis/cartApi";
import { useMutationcart } from "../Hooks/useMutationcart";
import { useEffect } from "react";
import BasicModal from "../basicmodal/Basicmodal";
import Lodaing from "../loding/Loding";
function Cart() {
  let { isLoading, data, isError, error } = useQuerycart('getcart', getcart)

  let { mutate ,isPending:remove} = useMutationcart(deletproductcart)
  let { mutate: updatcart ,isPending:update} = useMutationcart(updateproductcart)
  let { mutate: clratcart ,isPending:claer} = useMutationcart(clearproductcart)

  if (update || claer || remove ) {
    return <Lodaing></Lodaing>
  }

  return (
    <>
      <div className="container mx-auto my-9 relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
        {data?.data?.numOfCartItems ? (
          <>
            <button
              type="button"
              onClick={() => { clratcart() }}
              className="focus:outline-none my-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Clear
            </button>
            <h1 className="text-xl font-semibold mb-2">
              Cart Items: <span className="text-green-500">{data?.data?.numOfCartItems}</span>
            </h1>
            <h1 className="text-lg font-semibold my-4">
              Total Price: <span className="text-green-500">{data?.data?.data?.totalCartPrice} EGP</span>
            </h1>
            <table className="w-full text-sm text-left text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-left">Qty</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.data?.products?.map((element) => (
                  <tr
                    key={element?.product?.id}
                    className="bg-white border-b hover:bg-gray-100"
                  >
                    <td className="px-4 py-4">
                      <img
                        src={element?.product?.imageCover}
                        className="w-16 h-16 object-cover rounded-md"
                        alt={element?.product?.name}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {element?.product?.category?.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            element?.count === 1 ? mutate(element?.product?._id) : updatcart({ id: element?.product?.id, count: element?.count - 1 });
                          }}
                          className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Decrease Quantity</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <span>{element?.count}</span>
                        <button
                          onClick={() => {
                            element?.count >= element?.product?.quantity ? null : updatcart({ id: element?.product?.id, count: element?.count + 1 });
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Increase Quantity</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {element?.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        onClick={() => { mutate(element?.product?._id); }}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <BasicModal cartid={data?.data?.data._id}></BasicModal>
          </>
        ) : (
          <h1 className="text-red-700 my-10 text-center text-lg">No items in cart</h1>

        )}
      </div>
        
    </>
  );
}

export default Cart;