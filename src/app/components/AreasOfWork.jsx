'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect, useState} from "react";
import { Loader } from '@/app/components/micro/Loader'
import {useMain, useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import {useGetAreasQuery} from "@/redux/api/areas.api";

import main_styles from '@/app/css/main.module.css'
import styles from '@/app/css/areas.module.css'
import {Slider} from "@/app/components/Slider";



export const AreasOfWork = ({}) => {

    const {lang} = useMain();

    let {isLoading, error, data, refetch} = useGetAreasQuery(lang);

    const [mobile, setMobile] = useState(false)

    const localeButton = {
        en: '',
        ru: '',
    }

    useEffect(() => {
        if(!window) return null;
        setMobile(window.innerWidth < 550)
    })

    useEffect(() => {},[data])
    useEffect( () => {
        console.log(localeButton[lang])
    },[lang])

    if(!mobile) {
        return(
            <section className = {`${styles.areasContainer} ${main_styles.container}`}>

                <div className = {`${styles.downBlock}`}>
                    {
                        (!data) ? (<Loader />)
                            :
                            data.data.map((item, index) => {
                                return(
                                    <article key = {`areasKey_${index}_lang_${lang}`} className = {`${styles.areaBlock}`}>
                                        <div className = {`${styles.oneBlock}`}>
                                            <h2>{item.attributes.title}</h2>
                                            <ul dangerouslySetInnerHTML={{__html: (item.attributes.description) ? item.attributes.description : <></>}}>
                                            </ul>
                                            <Link href = {`/routes/services/${item.id}`}>
                                                {
                                                    (index != 4) ?
                                                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                                                            <path d="M19.3179 6.53033C19.6108 6.23744 19.6108 5.76256 19.3179 5.46967L14.5449 0.696699C14.252 0.403806 13.7771 0.403806 13.4842 0.696699C13.1914 0.989593 13.1914 1.46447 13.4842 1.75736L17.7269 6L13.4842 10.2426C13.1914 10.5355 13.1914 11.0104 13.4842 11.3033C13.7771 11.5962 14.252 11.5962 14.5449 11.3033L19.3179 6.53033ZM0 6.75H18.7875V5.25H0V6.75Z" fill="white"/>
                                                        </svg>
                                                        :
                                                        <>Узнать подробнеe
                                                            <div className={styles.circleWhite}>
                                                                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                                                                    <path d="M19.3179 6.53033C19.6108 6.23744 19.6108 5.76256 19.3179 5.46967L14.5449 0.696699C14.252 0.403806 13.7771 0.403806 13.4842 0.696699C13.1914 0.989593 13.1914 1.46447 13.4842 1.75736L17.7269 6L13.4842 10.2426C13.1914 10.5355 13.1914 11.0104 13.4842 11.3033C13.7771 11.5962 14.252 11.5962 14.5449 11.3033L19.3179 6.53033ZM0 6.75H18.7875V5.25H0V6.75Z" fill="white"/>
                                                                </svg>
                                                            </div>
                                                        </>
                                                }

                                            </Link>
                                        </div>
                                        <div className = {`${styles.oneBlock}`}>
                                            {
                                                (item.attributes?.icon?.data) ?
                                                    <img src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${(process.env.NEXT_PUBLIC_PORT) ? `:${process.env.NEXT_PUBLIC_PORT}` : ''}${item.attributes?.icon?.data.attributes.url}`} />
                                                    : null
                                            }
                                        </div>
                                        <Image src = {'/downloads/services/bg_service.svg'} alt = {`Доставка грузов по всему миру`} fill />
                                    </article>
                                )
                            })
                    }
                </div>
            </section>
        )
    }
    return(
        <section className = {`${styles.areasContainer} ${main_styles.container}`}>

            <div className = {`${styles.downBlock}`}>
                {
                    (!data) ? (<Loader />)
                        :
                        data.data.map((item, index) => {
                            return(
                                <article key = {`areasKey_${index}_lang_${lang}`} className = {`${styles.areaBlock}`}>
                                    <div className = {`${styles.oneBlock}`}>
                                        <h2>{item.attributes.title}</h2>
                                        <ul dangerouslySetInnerHTML={{__html: (item.attributes.description) ? item.attributes.description : <></>}}>
                                        </ul>
                                        <Link href = {`/routes/services/${item.id}`}>
                                            {
                                                (index != 4) ?
                                                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                                                        <path d="M19.3179 6.53033C19.6108 6.23744 19.6108 5.76256 19.3179 5.46967L14.5449 0.696699C14.252 0.403806 13.7771 0.403806 13.4842 0.696699C13.1914 0.989593 13.1914 1.46447 13.4842 1.75736L17.7269 6L13.4842 10.2426C13.1914 10.5355 13.1914 11.0104 13.4842 11.3033C13.7771 11.5962 14.252 11.5962 14.5449 11.3033L19.3179 6.53033ZM0 6.75H18.7875V5.25H0V6.75Z" fill="white"/>
                                                    </svg>
                                                    :
                                                    <>Узнать подробнеe
                                                        <div className={styles.circleWhite}>
                                                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                                                                <path d="M19.3179 6.53033C19.6108 6.23744 19.6108 5.76256 19.3179 5.46967L14.5449 0.696699C14.252 0.403806 13.7771 0.403806 13.4842 0.696699C13.1914 0.989593 13.1914 1.46447 13.4842 1.75736L17.7269 6L13.4842 10.2426C13.1914 10.5355 13.1914 11.0104 13.4842 11.3033C13.7771 11.5962 14.252 11.5962 14.5449 11.3033L19.3179 6.53033ZM0 6.75H18.7875V5.25H0V6.75Z" fill="white"/>
                                                            </svg>
                                                        </div>
                                                    </>
                                            }

                                        </Link>
                                    </div>
                                    <div className = {`${styles.oneBlock}`}>
                                        {
                                            (item.attributes?.icon?.data) ?
                                                <img src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${(process.env.NEXT_PUBLIC_PORT) ? `:${process.env.NEXT_PUBLIC_PORT}` : ''}${item.attributes?.icon?.data.attributes.url}`} />
                                                : null
                                        }
                                    </div>
                                    <Image src = {'/downloads/services/bg_service.svg'} alt = {`Доставка грузов по всему миру`} fill />
                                </article>
                            )
                        })
                }
            </div>
        </section>
    )

}

const HeaderSection = ({lang}) => {

    useEffect(() => console.log(lang), [lang])

    switch(lang) {
        case 'ru':
            return(
                <>
                    <div key ={`${lang}`} className = {`${main_styles.upBlock}`}>
                        <div>
                            <p>Услуги</p>
                        </div>
                        <div>
                            <p><Link href={'/'}>Все услуги</Link> </p>
                        </div>
                    </div>
                    <h2>Основные <strong>направления</strong></h2>
                </>
                )
            break;
        case 'en':
            return(
                <>
                    <div  key = {`${lang}`} className = {`${main_styles.upBlock}`}>
                        <div>
                            <p>Services</p>
                        </div>
                        <div>
                            <p><Link href={'/'}>All services</Link> </p>
                        </div>
                    </div>
                    <h2>Main <strong>directions</strong></h2>
                </>
            )
            break;
        case 'zh':
            return(
                <>
                    <div key ={`${lang}`}  className = {`${main_styles.upBlock}`}>
                        <div>
                            <p>服务</p>
                        </div>
                        <div>
                            <p><Link href={'/'}>所有服务</Link> </p>
                        </div>
                    </div>
                    <h2>主要 <strong>方向</strong></h2>
                </>
            )
            break;
        default:
            return
    }
}
