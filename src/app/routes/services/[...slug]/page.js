'use client'
import React, {Suspense} from 'react'
import Image from 'next/image'

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";

import { useGetAreasIdQuery } from "@/redux/api/areas.api";

import PageHeader from "@/app/components/micro/PageHeader"; //Баннер

import styles from '@/app/css/news.module.css'
import localstyles from '@/app/css/service.module.css'

import {Slider} from "@/app/components/Slider";
import ModuleWindow from "@/app/components/ModuleWindow";
import {useMain} from "@/hooks/useStater";


export default function Page({params}) {

    const router = useRouter();

    const {lang, moduleWindow} = useMain();

    const {isLoading, error, data} = useGetAreasIdQuery({id: Number.parseInt(params.slug), lang: lang})

    useEffect(() => {
        //
    },[data])

    const russiaLang = {
        'ru': ' по России',
        'en': ' in Russia'
    }

    return (
        <>
            {
                (isLoading) ? <Loader />
                    : (data) ?
                        <Slider title = {(!isLoading) ? (data) ? data.data.attributes?.title : '' : "Загрузка..."} image = {(data) ? `${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes?.headerImage.data.attributes.url}` : ''} />
                    : null
            }

            <main className={`${styles.main} ${styles.contentpage}`}>

                <section className={`${styles.newsBigIntoContainer}`}>
                    {
                        (isLoading) ? <Loader />
                            : (data) ?
                                <>
                                    <div style = {{
                                        marginTop: '60px',
                                    }}
                                        className={styles.headerNews}>


                                        <h1>{data.data.attributes?.title}</h1>
                                    </div>

                                    <div dangerouslySetInnerHTML = {{__html: data.data.attributes?.description}}>
                                    </div>

                                    <div dangerouslySetInnerHTML = {{__html: data.data.attributes?.text}}>
                                    </div>
                                </>
                                : <h3>Ошибка получения данных! Страница: Новости</h3>


                    }
                </section>
                <div className={localstyles.toCenterBlock}>
                    <Forms type = {"main"} />
                </div>
            </main>
            {
                (moduleWindow) ? <ModuleWindow /> : null
            }
        </>
    )
}
