import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
const Category = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <SectionTitle subHeading='from 11pm to 10am' heading="online order"></SectionTitle>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={slide1} alt="" />
                 <h2 className="text-2xl uppercase -mt-16 text-center text-white">salads</h2>
                </SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" />
                <h2 className="text-2xl uppercase -mt-16 text-center text-white">pizzas</h2>
                </SwiperSlide>
                <SwiperSlide><img src={slide3} alt="" />
                <h2 className="text-2xl uppercase -mt-16 text-center text-white">soups</h2>
                </SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" />
                <h2 className="text-2xl uppercase -mt-16 text-center text-white">desserts</h2>
                </SwiperSlide>
                <SwiperSlide><img src={slide5} alt="" />
                <h2 className="text-2xl uppercase -mt-16 text-center text-white">salads</h2>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Category;