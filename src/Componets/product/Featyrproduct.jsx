import { useEffect, useState } from "react";
import getProduct from "../../Apis/getProduct";
import Lodaing from "../loding/Loding";
import Item from "../Prodoucts/Item";

function Featyrproduct({arr}) {
    
    let [productlist , setproductlist]= useState([])
    let [lodaing,setlodaing] = useState(false)
    let[massage,setmassage]= useState('')

    async function getproductApi() {
        setlodaing(true)
        let data = await getProduct()
        if (data){
            setproductlist(data)
            setmassage('')
            setlodaing(false)
        }
        else{
            setmassage(data)
            setlodaing(false)
        }
        
    }

    useEffect(()=>{
        getproductApi()
    },[])

    if (lodaing) {
        return <Lodaing></Lodaing>
    }

    if (massage) {
        return <><h1>{massage}</h1></>
    }
    return (
        <div className="row container ">
            {arr?.length?arr.map((element)=><Item key={element?._id} ele={element}></Item>)
            :productlist.map((element)=><Item key={element?._id} ele={element}></Item>)}
        </div>
     );
}

export default Featyrproduct;