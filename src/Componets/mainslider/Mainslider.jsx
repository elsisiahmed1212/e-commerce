import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import Slider from "react-slick";
function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll:1,
        arrows:false
      };
    return (
        <div className="container row my-4">
            <div className="w-2/3">
            <Slider {...settings}>
            <img src={slide1} className='w-full h-[400px]'  alt="" />
            <img src={slide2} className='w-full h-[400px]' alt="" />
            <img src={slide3} className='w-full h-[400px]' alt="" />
            </Slider>

            </div>
            <div className="w-1/3">
                <img src={slide2} className='w-full h-[200px]' alt="" />
                <img src={slide3} className='w-full h-[200px]' alt="" />
            </div>
        </div>
    );
}

export default Mainslider;