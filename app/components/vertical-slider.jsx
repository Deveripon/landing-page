'use client';
import { useRef } from 'react';
import 'swiper/css';
import ImageCard from './image-card';

const images = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
    '/cardimage.jpg',
    '/cardimage1.jpg',
    '/cardimage2.jpg',
    '/cardimage3.jpg',
    '/cardimage4.jpg',
    '/cardimage5.jpg',
    '/cardimage6.jpg',
    '/cardimage7.jpg',
    '/cardimage8.jpg',
    '/cardimage9.jpg',
];

function VerticalSlider() {
    const swiperRef = useRef(null);
    return (
        <>
            <div className='absolute top-[10%] right-[6%] h-[80vh] z-20 max-w-lg'>
                {/* Top fade overlay */}
                {/*                 <span
                    suppressHydrationWarning
                    className='absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 pointer-events-none rounded-t-2xl'></span> */}

                <div className='main h-full overflow-hidden rounded-2xl relative'>
                    {/*          <Swiper
                        ref={swiperRef}
                        direction='vertical'
                        slidesPerView={3}
                        centeredSlides={true}
                        spaceBetween={10}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        speed={800}
                        modules={[Autoplay]}
                        className='h-full'
                        slideToClickedSlide={true}> */}
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className='flex items-center justify-center min-h-[400px]'>
                            <div
                                suppressHydrationWarning
                                className='w-full rounded-2xl overflow-hidden'>
                                <ImageCard image={image} />
                            </div>
                        </div>
                    ))}
                    {/* </Swiper> */}
                </div>

                {/* Bottom fade overlay */}
                {/*         <span className='absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 pointer-events-none rounded-b-2xl'></span> */}
            </div>

            {/*          <style jsx global>{`
                .swiper-slide {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style> */}
        </>
    );
}

export default VerticalSlider;

