'use client';
import ImageCard from '@/app/components/image-card';
import { useRef } from 'react';
import 'swiper/css';
import { Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const images = [
    '/im1.jpg',
    '/im3.jpg',
    '/im1.jpg',
    '/im5.jpg',
    '/im2.jpg',
    '/im6.jpg',
    '/im7.jpg',
    '/im2.jpg',
];

function VerticalSlider() {
    const swiperRef = useRef(null);

    return (
        <>
            <div className='absolute h-screen right-[2.5%] z-20 max-w-lg'>
                <div className='main h-full overflow-hidden relative'>
                    <Swiper
                        ref={swiperRef}
                        direction='vertical'
                        slidesPerView={3}
                        centeredSlides={true}
                        spaceBetween={20}
                        loop={true}
                        /* loopAdditionalSlides={4} */
                        /*   loopedslides={images.length} */
                        mousewheel={{
                            forceToAxis: true,
                            sensitivity: 0.5,
                            releaseOnEdges: false,
                            thresholdDelta: 50,
                            thresholdTime: 500,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            waitForTransition: true,
                        }}
                        speed={1500}
                        modules={[Autoplay, Mousewheel]}
                        className='h-full'
                        slideToClickedSlide={true}
                        onTouchMove={() => {
                            if (swiperRef.current && swiperRef.current.swiper) {
                                swiperRef.current.swiper.autoplay.stop();
                            }
                        }}>
                        {images.map((image, i) => (
                            <SwiperSlide
                                key={i}
                                className='flex items-center justify-center min-h-[390px]'>
                                <div
                                    suppressHydrationWarning
                                    className='w-full overflow-hidden'>
                                    <ImageCard image={image} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .swiper-slide {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </>
    );
}

export default VerticalSlider;

