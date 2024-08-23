import { useEffect, useState } from "react";
import {GetspecificProduct ,Getspecificcategory} from "../../Apis/GetspecificProduct";
import { useParams } from "react-router-dom";
import Item from "./Item";
import { useMutationcart } from "../Hooks/useMutationcart";
import { addTocartapi } from "../../Apis/cartApi";
import { toast } from "react-toastify";
import Lodaing from "../loding/Loding";

function ProdouctDetalise() {

    let {status,mutate,data} = useMutationcart(addTocartapi)
    if(status == 'success'){
        toast(data?.data?.message)
    }
    if (status == 'error'){
        console.log('nooooo');
    }



    let [produc , setproduc]= useState([])
    let [relatedproduc , setrelatedproduc]= useState([])
    let [lodaing,setlodaing] = useState(false)
    let[massage,setmassage]= useState('')
    let[imgsrc , setimgsrc]=useState('')

    let {id,categoryid} = useParams()
    async function GetspecificProductApi() {
        setlodaing(true)
        let data = await GetspecificProduct(id)
        if (data){
            setproduc(data)
            setmassage('')
            setlodaing(false)
        }
        else{
            setmassage(data)
            setlodaing(false)
        }
    }
    async function GetspecificcategoryApi() {
        setlodaing(true)
        let data = await Getspecificcategory(categoryid)

        if (data){
            setrelatedproduc(data)
            setmassage('')
            setlodaing(false)
        }
        else{
            setmassage(data)
            setlodaing(false)
        }
    }
    useEffect(()=>{
        GetspecificcategoryApi()
    },[])

    useEffect(()=>{
        GetspecificProductApi()
    },[id])

    function changsrc(e){
        setimgsrc(e.target.src)
    }

    if (lodaing) {
        return <Lodaing></Lodaing>
    }
    return ( 
        <>

<div className="container mx-auto my-9 flex flex-col sm:flex-row items-center">
  <div className="sm:w-1/3 p-4">
    <img 
      src={imgsrc ? imgsrc : produc?.imageCover} 
      className="w-full rounded-lg shadow-lg" 
      alt={produc?.title} 
    />
    <ul className="flex justify-center gap-4 mt-4">
        {produc?.images?.map((imag)=><li key={imag}><img onClick={changsrc} src={imag} className="w-[120px] cursor-pointer"/></li>)}
    </ul>
  </div>
  <div className="sm:w-2/3 p-4">
    <p className="text-green-700 font-semibold text-lg">{produc?.category?.name}</p>
    <p className="text-2xl font-bold my-2">{produc?.title}</p>
    <p className="text-gray-700 leading-relaxed my-4">{produc?.description}</p>
    <div className="flex justify-between items-center my-4">
      <p className="text-xl font-bold text-gray-900">{produc?.price} EGP</p>
      <p className="flex items-center text-yellow-500">
        <i className="fa-solid fa-star"></i>
        <span className="ml-1 text-gray-700">{produc?.ratingsAverage}</span>
      </p>
    </div>
    <button onClick={()=>{mutate(produc?._id)}} className="bg-green-700 text-white p-2 rounded my-2">ADD TO CART</button>
  </div>
</div>

        <div className="row container my-10">
            {relatedproduc?.map((element)=><Item key={element._id}  ele={element}></Item>)}
        </div>
        
        </>

    );
}

export default ProdouctDetalise;