import './main_event_section.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import Slice from '@/utilComponent/material/slice/slice'
import default_data from "@/util/default_data/default_data";
import 'swiper/css';
import 'swiper/css/pagination';

function MainEventSection(){

    return(
        <div className="event-section__container">
            <div className="event-section__title">이벤트</div>
            <div className="event-section__content">
                <Swiper
                    className="event-section__slide"
                    modules={[Pagination, A11y, Autoplay]}
                    slidesPerView={3}
                    loop={true}
                    speed={300}
                    spaceBetween={20}
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    pagination={{clickable: true, className:'swp-pagination'}}
                >
                    <SwiperSlide>
                        <Slice url={'https://daejeon.greenart.co.kr/'} 
                               img={default_data.d_imgs.slice_img1} 
                               title={'대전 그린컴퓨터학원'} 
                               text1={'신규 회원'} 
                               text2={'절찬리 모집중!'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slice url={'http://localhost:5000/Login'} 
                               img={default_data.d_imgs.slice_img2} 
                               title={'여행은? 보형짱닷컴'} 
                               text1={'여행의 패러다임'} 
                               text2={'보형짱닷컴!'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slice url={'https://www.hanwhaeagles.co.kr/index.do'} 
                               img={default_data.d_imgs.slice_img3}
                               title={'한화 이글스 2024시즌'} 
                               text1={'한화이글스'} 
                               text2={'포스트시즌 기원!'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slice url={'https://comic.naver.com/webtoon/list?titleId=670143&tab=wed'} 
                               img={default_data.d_imgs.slice_img4} 
                               title={'네이버 웹툰'} 
                               text1={'최고의 웹툰은?'} 
                               text2={'헬퍼2 정주행!'}/>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    )
}

export default MainEventSection



