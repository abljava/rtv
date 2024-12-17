'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect, useState} from "react";

import {useMain, useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import { Loader } from '@/app/components/micro/Loader'

import {useGetNewsQuery} from "@/redux/api/news.api";


import main_styles from '@/app/css/main.module.css'
import styles from '@/app/css/news.module.css'
import NewsSlider from "@/app/components/NewsSlider";



const News = ({langprop}) => {

    const {lang} = useMain();
    const {isLoading, error, data} = useGetNewsQuery(lang);

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        //
    })
    useEffect(() => {
        if(!window) return null;
        setMobile(window.innerWidth < 550)
    })

    if(!mobile) {
        return(
            <section className = {`${styles.newsContainer} ${main_styles.container}`}>

                <HeaderSection lang = {langprop} />

                <div className = {`${styles.downBlock}`}>
                    {
                        (!data) ? (<Loader />)
                            :
                            data.data.map((item, index) => {

                                if(index > 7) return false

                                return(
                                    <article key = {`newsKey_${index}`} className = {`${styles.newsBlock}`}>
                                        <Link href = {`/routes/news/${item.id}`}>
                                            <div className={`${styles.newsIco}`}>
                                                <Image unoptimized src = {`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`} alt = {item.attributes.name} fill/>
                                            </div>
                                            <p>{(item.attributes.createdAt).split('T')[0]}</p>
                                            <h3>{item.attributes.title}</h3>
                                        </Link>
                                    </article>
                                )
                            })
                    }
                </div>
            </section>
        )
    }
    return(
        <section className = {`${styles.newsContainer} ${main_styles.container}`}>

            <HeaderSection lang = {langprop} />

            <div className = {`${styles.downBlock}`}>
                {
                    (!data) ?
                            (<Loader />)
                            :
                            <NewsSlider data = {data.data} />
                }
            </div>
        </section>
    )
}

const HeaderSection = ({lang}) => {

    if(!lang) return null

    useEffect(() => {}, [lang])

    switch(lang) {
        case 'ru':
            return(
                <>
                    <div className = {`${main_styles.upBlock}`}>
                        <div>
                            <p>Новости</p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                    <h2>свежие <strong>новости и события</strong></h2>
                </>
            )
            break;
        case 'en':
            return(
                <>
                <div className = {`${main_styles.upBlock}`}>
                    <div>
                        <p>News</p>
                    </div>
                    <div>
                        <p></p>
                    </div>
                </div>
                <h2>latest <strong>news and events</strong></h2>
                </>
            )
            break;
        case 'zh':
            return(
                <>
                    <div className = {`${main_styles.upBlock}`}>
                        <div>
                            <p>消息</p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                    <h2>新鲜的 <strong>新闻与事件</strong></h2>
                </>
            )
            break;
        default:
            return
    }
}

export default News;
