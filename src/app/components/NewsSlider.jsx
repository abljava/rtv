'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from '@/app/css/slider.module.css'

import { useStater } from '@/hooks/useStater'

import {Forms} from "@/app/components/Forms";
import {Loader} from "@/app/components/micro/Loader";

import {useGetSlidersQuery} from "@/redux/api/pages.api";
import Link from "next/link";


const NewsSlider = ({data = [], keytype = "default", style = {}}) => {

  const [selectSlide, setSelectSlide] = useState(0)
  const [sliderSpeed, setSliderSpeed] = useState(3000)

  const {lang} = useMain();

  const localeButton = {
    ru: 'Подробнее',
    en: 'More info',
    zh: '更多细节'
  }


  const nextSlide = () => {
    if(selectSlide < data.length - 1) {
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
      <>
    <section className = {`${styles.sliderContainerNews}`}>
      {
            (data) ?
                data.map((item, index) => {
                  return(
                      <article
                          style = {
                            (index === 0) ?
                                {marginLeft: `-${selectSlide*100}%`}
                                : null
                          }
                          onMouseMove= {()=>{setSliderSpeed(500000)}}
                          onMouseLeave={()=>{setSliderSpeed(3000)}}
                          key = {`slidekey_${index}_${keytype}`}
                          className = {`${styles.sliderItem}`}>

                        <article key = {`newsKey_${index}`} className = {`${styles.newsBlock}`}>
                          <Link href = {`/routes/news/${item.id}`}>
                            <div className={`${styles.newsIco}`}>
                              <Image unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${(process.env.NEXT_PUBLIC_PORT) ? `:${process.env.NEXT_PUBLIC_PORT}` : ''}${item.attributes.image.data.attributes.url}`} alt = {item.attributes.name} fill/>
                            </div>
                            <p>Дата публикации: {(item.attributes.createdAt).split('T')[0]}</p>
                            <h3>{item.attributes.title}</h3>
                          </Link>
                        </article>

                      </article>
                  )
                })
                : <h3>Слайдеры отсутствуют</h3>
      }


    </section>

        <SliderController slides = {data} />
  </>
  )
}

const SliderController = ({slides}) => {
  return(
    <div className = {`${styles.dotContainer}`}>
    {
       (slides) ? slides.map ((slide, index) => {
          return(
            <div style = {{
              width: `${
                  (64/slides.length-1) > 32 ? 32 : (64/slides.length-1)
              }px`,
              height: `${
                  (64/slides.length-1) > 32 ? 32 : (64/slides.length-1)
              }px`
            }} key = {`dotKey_${index}`} className = {`${styles.dot}`}></div>
          )
        }) : null
     }
    </div>
  )
}


export default NewsSlider;
