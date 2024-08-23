import { getallCategories } from "../../Apis/cartApi";
import { useQuerycart } from "../Hooks/useQuerycart";
import Lodaing from "../loding/Loding";

function Categoreitem() {
    let { data ,isLoading} = useQuerycart('getcategorise', getallCategories)
    
    if (isLoading) {
        return <Lodaing></Lodaing>
    }

    return (
        <>
            <div className="container mx-auto my-10">
                <div className="flex flex-wrap justify-center gap-4">
                    {data?.data?.data.map(element => (
                        <div
                            key={element._id}
                            className="md:w-1/4 p-4 bg-white border border-transparent rounded-lg shadow-lg hover:shadow-xl hover:border-green-500 transition-all duration-300 ease-in-out"
                        >
                            <img
                                src={element.image}
                                alt={element.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <p className="text-center mt-4 font-semibold text-gray-700">
                                {element.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Categoreitem;