'use client'
import React, {Suspense, useEffect, useState} from 'react'
import Image from 'next/image'
import Link from "next/link";

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import {Loader} from "@/app/components/micro/Loader";

import styles from '@/app/css/mainpage.module.css'
import localstyles from '@/app/css/pagesInformation.module.css'

import {useMain, useStater} from "@/hooks/useStater";
import {Forms} from "@/app/components/Forms";

import {
    useGetDocumentsQuery,
    useGetReqQuery,
    useGetRulesQuery,
    useGetTarrifsQuery
} from "@/redux/api/dinamicPages.api";
import ModuleWindow from "@/app/components/ModuleWindow";

export default function Page({}) {

    const router = useRouter();
    const params = useSearchParams();

    const {lang, mobile, moduleWindow} = useMain();

    const [selectType, setSelectType] = useState(0);

    const {isLoading, error, data} = useGetTarrifsQuery(lang);

    const reqButtonLang = {
        ru: "Реквизиты",
        en: "Requisites"
    };
    const docButtonLang = {
        ru: "Документы",
        en: "Documentation"
    };
    const rulButtonLang = {
        ru: "Правила и инструкции",
        en: "Rules and instructions"
    };

    useEffect(() => {},[data, lang]);
    useEffect(() => {});

    return (
        <>

            <main className={`${styles.main} ${styles.contentpage} ${localstyles.informPage}`}>

                <section className={`${localstyles.informContainer}`}>

                    <div className={`${localstyles.upBlock}`}>
                        <div className={`${localstyles.upNav}`}>

                            <button onClick = {() => {
                                    if(!mobile) {
                                       setSelectType(0)
                                                }
                            }}
                                    onTouchStart = {() => {
                                        setSelectType(0)
                                    }}
                                    style = {{
                                        background: (selectType != 0) ? `#F0F0F0` : null,
                                        color: (selectType != 0) ? `#292929` : null
                                    }}
                            >{reqButtonLang[lang]}</button>

                            <button onClick = {() => {
                                if(!mobile) {
                                    setSelectType(1)
                                }
                            }}
                                    onTouchStart = {() => {
                                        setSelectType(1)
                                    }}
                                    style = {{
                                        background: (selectType != 1) ? `#F0F0F0` : null,
                                        color: (selectType != 1) ? `#292929` : null
                                    }}
                            >{docButtonLang[lang]}</button>

                            <button onClick = {() => {
                                if(!mobile) {
                                    setSelectType(2)
                                }
                            }}
                                    onTouchStart = {() => {
                                        setSelectType(2)
                                    }}
                                    style = {{
                                        background: (selectType != 2) ? `#F0F0F0` : null,
                                        color: (selectType != 2) ? `#292929` : null
                                    }}
                            >{rulButtonLang[lang]}</button>

                        </div>
                    </div>

                    <div className={`${localstyles.downBlock}`}>
                        {(selectType == 0) ? <Requisites lang = {lang}/> : null}
                        {(selectType == 1) ? <Documents lang = {lang}/> : null}
                        {(selectType == 2) ? <Rules lang = {lang}/> : null}
                    </div>

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



const Requisites = ({lang = 'ru'}) => {

    const { isLoading, error, data } = useGetReqQuery(lang);

    return(
        <div className = {localstyles.reqColumnBlock}>
            {
                (!isLoading) ?
                    (data && typeof data.data != "undefined" && Array.isArray(data.data)) ?
                            data.data.map( (item, index) => {
                                console.log(item)
                                return(
                                    <>
                                        <p>{item.attributes.title}</p> <p>{item.attributes.text}</p>
                                    </>
                                )
                            })
                        : null
                    : <Loader />
            }
        </div>
    )
}
const Documents = ({lang = 'ru'}) => {

    const { isLoading, error, data } = useGetDocumentsQuery(lang);

    return(
        <ul className = {localstyles.columnBlock}>
            {
                (!isLoading) ?
                    (data && typeof data.data != "undefined" && Array.isArray(data.data)) ?
                        data.data.map( (item, index) => {
                            console.log(item)
                            return(
                                    <li>
                                        <a download href = {`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.doc.data.attributes.url}`}>
                                            {item.attributes.title}
                                        </a>
                                    </li>
                            )
                        })
                        : null
                    : <Loader />
            }
        </ul>
    )
}
const Rules = ({lang = 'ru'}) => {

    const { isLoading, error, data } = useGetRulesQuery(lang);

    return(
        <ul className = {localstyles.rulesColumnBlock}>
            {
                (!isLoading) ?
                    (data && typeof data.data != "undefined" && Array.isArray(data.data)) ?
                        data.data.map( (item, index) => {
                            console.log(item)
                            return(
                                <li>
                                    <p>{item.attributes.title}</p> <br/>
                                    <a download href = {`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.doc.data.attributes.url}`}>
                                        {`скачать`}
                                        <span>( {item.attributes.doc.data.attributes.size} кб)</span></a>
                                </li>
                            )
                        })
                        : null
                    : <Loader />
            }
        </ul>
    )
}
