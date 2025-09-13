"use client";
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { EffectCube, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function MainSlider() {
      useEffect(() => {
    AOS.init({ duration: 400 });
  });
    return (
        <div

            className="
  container mx-auto 
  pb-8       
  sm:pb-13     
  md:pb-16    
  lg:pb-20   
  xl:pb-22 
">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectCube, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative w-full
                       aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
                        <Image
                            fill
                            src="/slider/slider-bg-2.webp"
                            alt="Main Slider Image"
                            className="object-cover object-[70%_center]"
                            sizes="100vw"
                            priority
                            loading='eager'
                        />


                        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-white/80 via-white/30 to-transparent z-[5]" />


                        <div className="absolute inset-0 z-10 flex flex-col justify-center p-4 sm:p-6 md:p-10 lg:p-25">
                            <h2
                        
                                
                                className="text-[#191919] font-bold leading-tight
                                 text-[clamp(28px,9vw,48px)] sm:text-[clamp(32px,6vw,56px)] md:text-6xl lg:text-8xl">
                                Summer
                            </h2>

                            <span
                        
                                
                                className="block text-[#191919] font-bold leading-tight
                                   text-[clamp(28px,9vw,48px)] sm:text-[clamp(32px,6vw,56px)] md:text-6xl lg:text-8xl">
                                Collection
                            </span>

                            <p
                                
                                className="py-3 sm:py-4 md:py-5
                                  max-w-[92%] sm:max-w-md md:max-w-xl lg:max-w-[700px]
                                  text-[clamp(12px,3.5vw,16px)] md:text-lg text-[#5c5d61]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Deleniti, sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi?
                            </p>

                            <button
                                
                                className="btn group w-fit
    px-4 sm:px-5 md:px-6
    py-2.5 sm:py-3 md:py-4
    text-[clamp(12px,3.5vw,16px)] md:text-xl
    rounded-md hover:text-yellow-600
    flex items-center gap-2 transition-all">
                                Shop It Now <ArrowRight className='transition-all duration-300
      opacity-70 scale-95
      group-hover:translate-x-2
      group-hover:opacity-100
      group-hover:scale-110' />
                            </button>
                        </div>
                    </div>


                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full
                       aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
                        <Image
                            fill
                            src="/slider/slider-bg1.webp"
                            alt="Main Slider Image"
                            className="object-cover object-[70%_center]"
                            sizes="100vw"
                            priority
                            loading='eager'
                        />


                        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-white/80 via-white/30 to-transparent z-[5]" />


                        <div className="absolute inset-0 z-10 flex flex-col justify-center p-4 sm:p-6 md:p-10 lg:p-25">
                            <h2
                                className="text-[#191919] font-bold leading-tight
                                 text-[clamp(28px,9vw,48px)] sm:text-[clamp(32px,6vw,56px)] md:text-6xl lg:text-8xl">
                                Casual
                            </h2>

                            <span
                                className="block text-[#191919] font-bold leading-tight
                                   text-[clamp(28px,9vw,48px)] sm:text-[clamp(32px,6vw,56px)] md:text-6xl lg:text-8xl">
                                Collection
                            </span>

                            <p
                                className="py-3 sm:py-4 md:py-5
                                  max-w-[92%] sm:max-w-md md:max-w-xl lg:max-w-[700px]
                                  text-[clamp(12px,3.5vw,16px)] md:text-lg text-[#5c5d61]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Deleniti, sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi?
                            </p>

                            <button
                                className="btn group w-fit
                                px-4 sm:px-5 md:px-6
                                py-2.5 sm:py-3 md:py-4
                                              text-[clamp(12px,3.5vw,16px)] md:text-xl
                                rounded-md hover:text-yellow-600
                                flex items-center gap-2 transition-all">
                                Shop It Now <ArrowRight className='transition-all duration-300
                                  opacity-70 scale-95
                                  group-hover:translate-x-2
                                  group-hover:opacity-100
                                  group-hover:scale-110' />
                            </button>
                        </div>
                    </div>


                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full
                       aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
                        <Image
                            fill
                            src="/slider/slider-bg-2.webp"
                            alt="Main Slider Image"
                            className="object-cover object-[70%_center]"
                            sizes="100vw"
                            priority
                            loading='eager'
                        />


                        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-white/80 via-white/30 to-transparent z-[5]" />


                        <div className="absolute inset-0 z-10 flex flex-col justify-center p-4 sm:p-6 md:p-10 lg:p-25">
                            <h2
                                className="text-[#191919] font-bold leading-tight
                                 text-[clamp(28px,9vw,48px)] sm:text-[clamp(32px,6vw,56px)] md:text-6xl lg:text-8xl">
                                Summer
                            </h2>

                            <span
                                className="block text-[#191919] font-bold leading-tight
                                   text-[clamp(28px,9vw,48px)] sm:text-[clamp(32px,6vw,56px)] md:text-6xl lg:text-8xl">
                                Collection
                            </span>

                            <p
                                className="py-3 sm:py-4 md:py-5
                                  max-w-[92%] sm:max-w-md md:max-w-xl lg:max-w-[700px]
                                  text-[clamp(12px,3.5vw,16px)] md:text-lg text-[#5c5d61]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Deleniti, sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quasi?
                            </p>

                            <button
                                className="btn group w-fit
                                px-4 sm:px-5 md:px-6
                                py-2.5 sm:py-3 md:py-4
                                text-[clamp(12px,3.5vw,16px)] md:text-xl
                                rounded-md hover:text-yellow-600
                                flex items-center gap-2 transition-all">
                                Shop It Now <ArrowRight className='transition-all duration-300
                                  opacity-70 scale-95
                                  group-hover:translate-x-2
                                  group-hover:opacity-100
                                  group-hover:scale-110' />
                            </button>
                        </div>
                    </div>


                </SwiperSlide>


            </Swiper>

        </div>
    )
}
