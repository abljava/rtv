'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from '@/app/css/slider.module.css'

import {useMain, useSlides, useStater} from '@/hooks/useStater'

import {Forms} from "@/app/components/Forms";
import {Loader} from "@/app/components/micro/Loader";

import {useGetSlidersQuery} from "@/redux/api/pages.api";
import Link from "next/link";

/**
 * @name TopTheBestNumberOneImbaIaDolbaebSlider
 * @description Тебе имени не хватило?
 * @param {string128chars} title
 * @param {pathToImage} image
 * @returns {JSX.Element}
 * @constructor
 */
export const Slider = ({title = '', image = ''}) => {

  const [selectSlide, setSelectSlide] = useState(0)
  const [sliderSpeed, setSliderSpeed] = useState(3000)

  const {lang, mobile} = useMain()

  const {isLoading, error, data} = useGetSlidersQuery(lang)
  console.log(data)

  const nextSlide = () => {
    if(!data) return false
    if(selectSlide < data.data.length - 1) {
      setSelectSlide(selectSlide + 1);
    } else {
      setSelectSlide(0)
    }
  }

  useEffect(
    () => {
      const interval = setInterval(() => {
        nextSlide()
      }, sliderSpeed)
      return () => clearInterval(interval)
    }
  )

  return(
    <section className = {`${styles.sliderContainer}`}>
      {
        (!isLoading && data) ?
            (data.data) ?
                data.data.map ((slide, index) => {
                  return(
                      <article
                          style = {
                            (index === 0) ?
                                {marginLeft: `-${selectSlide*100}%`}
                                : null
                          }
                          onMouseMove= {()=>{setSliderSpeed(500000)}}
                          onMouseLeave={()=>{setSliderSpeed(3000)}}
                          key = {`slidekey_${index}`}
                          className = {`${styles.sliderItem}`}>

                        <div className = {`${styles.textSlider}`}>
                          <h2>{(!title) ? slide.attributes.title : title }</h2>
                        </div>

                        <div className = {`${styles.sliderBg}`}>
                          {
                            (typeof slide.attributes.image != "undefined") ?
                                <Image unoptimized alt = {slide.attributes.image.data.alt} src = {(!image) ? `${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${slide.attributes.image.data.attributes.url}` : image }  fill />
                                : null
                          }
                        </div>

                        <Forms type = {'slider'}/>
                      </article>
                  )
                })
                : <h3>Слайдеры отсутствуют</h3>
            : <Loader />
      }
      {
        (!isLoading) ?
            (data && typeof data.data != "undefined") ?
              <SliderController slides = {data.data} setSelectSlide = {setSelectSlide}/>
                :null
           : null
      }

    </section>
  )
}

const SliderController = ({slides, setSelectSlide = f => f}) => {

  return(
    <div className = {`${styles.dotContainer}`}>
    {
       (slides && slides.length > 1) ? slides.map ((slide, index) => {
         if(index > slides.length-2) return;
          return(
            <div
                onClick = {() => {setSelectSlide(index)}}
                key = {`dotKey_${index}`}
                className = {`${styles.dot}`}></div>
          )
        }) : null
     }
    </div>
  )
}
