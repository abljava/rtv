'use client'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { StrapiImage } from '@/app/components/StrapiImage'

import styles from '@/app/css/mainpage.module.css'
import localstyles from '@/app/css/pagesAbout.module.css'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { Forms } from '@/app/components/Forms'
import { Loader } from "@/app/components/micro/Loader";
import { useEffect } from "react";

import { useGetAboutQuery } from "@/redux/api/dinamicPages.api";
import { HeaderPluses } from "@/app/components/main/Header";
import { useMain } from "@/hooks/useStater";
import ModuleWindow from "@/app/components/ModuleWindow";

export default function Page({ params }) {

    const router = useRouter();
    const { lang, moduleWindow, mobile } = useMain();

    const { isLoading, error, data } = useGetAboutQuery(lang);
    // console.log(`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_HOST_API}${data.data.attributes?.mapImage.data.attributes.url}`)



    useEffect(() => {
        // console.log(data.data.attributes.mapImage.data.attributes.formats.thumbnail.url)

    }, [data, moduleWindow])

    return (
        <>
            <main className={`${styles.main} ${styles.contentpage}`}>

                <section className={`${styles.newsContainer} ${localstyles.aboutContainer}`}>
                    {
                        (isLoading) ? <Loader />
                            : (data) ?
                                <>

                                    <div className={`${(!mobile) ? localstyles.w50 : null} ${localstyles.text0}`}>

                                        <h1>{data.data.attributes?.title0}</h1>

                                        <div dangerouslySetInnerHTML={{ __html: data.data.attributes?.text }}></div>

                                    </div>

                                    <div className={`${localstyles.w100} ${localstyles.text1}`}>

                                        <h2>{data.data.attributes?.title1}</h2>

                                        <HeaderPluses lang={lang} />

                                    </div>

                                    <div className={`${localstyles.w100} ${localstyles.text2}`}>
                                        <h2>{data.data.attributes?.title2}</h2>
                                        {/* <div><Image src = 'http://localhost:1337/api/uploads/thumbnail_map_ce0ac2a1e5.png' alt = {''} fill /></div> */}
                                        <div>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_HOST_API}${data.data.attributes?.mapImage.data.attributes.url}`}
                                                alt={''} fill />
                                        </div>
                                    </div>

                                    <div className={localstyles.toCenterBlock}>
                                        <Forms type={"main"} />
                                    </div>

                                    <div></div>
                                </>
                                : <h3>Ошибка получения данных! Страница: О компании</h3>


                    }
                </section>

            </main>
            {
                (moduleWindow) ? <ModuleWindow /> : null
            }
        </>
    )
}
