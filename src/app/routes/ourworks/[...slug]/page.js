'use client'
import React, {Suspense} from 'react'
import Image from 'next/image'

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";

import styles from '@/app/css/news.module.css'
import localstyles from '@/app/css/pagesOurWorks.module.css'
import {Slider} from "@/app/components/Slider";
import ModuleWindow from "@/app/components/ModuleWindow";
import {useMain} from "@/hooks/useStater";
import {useGetWorksIdQuery} from "@/redux/api/dinamicPages.api";


export default function Page({params}) {

    const router = useRouter();

    const {lang, moduleWindow} = useMain();

    const {isLoading, error, data} = useGetWorksIdQuery(Number.parseInt(params.slug));

    useEffect(() => {
        //
    },[data])

    return (
        <>
            <main className={`${styles.main} ${styles.contentpage} ${localstyles.openWorkContainer}`}>

                {
                    (!isLoading) ?
                        (data) ?
                            <Slider title = {(!isLoading) ? (data) ? data.data.attributes?.title + ' по России' : '' : "Загрузка..."} image = {(data) ? `${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${data.data?.attributes?.fullImage.data.attributes.url}` : ''} />
                            : null
                        : <Loader />
                }

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

                                    <div dangerouslySetInnerHTML = {{__html: data.data.attributes?.fullText}}>
                                    </div>
                                </>
                                : <h3>Ошибка получения данных! Страница: Новости</h3>


                    }
                </section>
                <div className={localstyles.toCenterBlock}>
                    <Forms type = {"main"} />
                </div>

                {
                    (moduleWindow) ? <ModuleWindow /> : null
                }
            </main>
            {
                (moduleWindow) ? <ModuleWindow /> : null
            }
        </>
    )
}
