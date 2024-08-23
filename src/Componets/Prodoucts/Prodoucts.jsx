import { useEffect, useState } from "react"
import getProduct from "../../Apis/getProduct"
import Item from "./Item"
import Featyrproduct from "../product/Featyrproduct"
import getcategories from "../../Apis/categores"
import { Getspecificcategory } from "../../Apis/GetspecificProduct";
function Prodoucts() {


    let [categorieslist, setcategorieslist] = useState([])
    let [categorieslistarr, setcategorieslistarr] = useState([])
    let [lodaing, setlodaing] = useState(false)
    let [massage, setmassage] = useState('')

    async function categorieslistApi() {
        setlodaing(true)
        let data = await getcategories()
        if (data) {
            setcategorieslist(data)
            setmassage('')
            setlodaing(false)
        }
        else {
            setmassage(data)
            setlodaing(false)
        }

    }

    useEffect(() => {
        categorieslistApi()
    }, [])

    async function Getspecificcategoryapi(categoresid) {
        let data = await Getspecificcategory(categoresid)
        setcategorieslistarr(data);

    }

    return (
        <>
            <div className="container flex flex-col md:flex-row my-9">
                <ul className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-4 space-y-2 mb-4 md:mb-0">
                    {categorieslist?.map((element) => (
                        <li
                            key={element?._id}
                            className="cursor-pointer p-2 bg-gray-100 rounded hover:bg-green-500 hover:text-white transition-colors duration-300"
                            onClick={() => Getspecificcategoryapi(element?._id)}
                        >
                            {element?.name}
                        </li>
                    ))}
                </ul>
                <div className="w-full md:w-3/4">
                    <Featyrproduct arr={categorieslistarr}></Featyrproduct>
                </div>
            </div>

        </>
    );
}

export default Prodoucts;