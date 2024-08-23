import { useEffect, useState } from "react"
import getcategories from "../../Apis/categores"
import Slider from "react-slick";
function Categories() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4
      };
    let [categorieslist , setcategorieslist]= useState([])
    let [lodaing,setlodaing] = useState(false)
    let[massage,setmassage]= useState('')

    async function categorieslistApi() {
        setlodaing(true)
        let data = await getcategories()
        if (data){
            setcategorieslist(data)
            setmassage('')
            setlodaing(false)
        }
        else{
            setmassage(data)
            setlodaing(false)
        }
        
    }

    useEffect(()=>{
        categorieslistApi()
    },[])

    return ( 
        <div className="container my-5 md:block hidden">
            <Slider {...settings}>
                {categorieslist?.map((element)=><img className="h-[220px] cursor-pointer" key={element._id} style={{objectFit:"cover"}} src={element.image}></img>)}
            </Slider>
        </div>
    );
}

export default Categories;