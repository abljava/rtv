'use client'
import React, {Suspense} from 'react'
import Image from 'next/image'

import styles from '@/app/css/mainpage.module.css'

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";
import {useMain, useStater} from "@/hooks/useStater";
import {Forms} from "@/app/components/Forms";

import {useGetClientsAndPartnersQuery, useGetClientsQuery} from "@/redux/api/dinamicPages.api";
import localstyles from "@/app/css/pagesClientsAndPartners.module.css";
import {useGetPartnersQuery} from "@/redux/api/partners.api";
import ModuleWindow from "@/app/components/ModuleWindow";

export default function Page({}) {

  const router = useRouter();
  const {lang} =  useMain();
  const {isLoading, error, data} = useGetClientsAndPartnersQuery(lang);

  useEffect(() => {
      //
  },[data])

  const textLocale = {
      ru: 'Иные контактные данные',
      en: 'Other contact details',
  }

  return (
      <>
        <main className={`${styles.main} ${styles.contentpage} ${localstyles.clientPage}`}>
            {
                (!isLoading) ?
                    (data && typeof data.data != 'undefined') ?
                        <>
                            <Clients title = {data.data.attributes.titleClient} text = {data.data.attributes.textClient} />
                            <Partners title = {data.data.attributes.titlePartners} text = {data.data.attributes.textPartners} />
                        </>
                        : null
                    : <Loader />
            }
            <Forms type = {"main"} />
            <div></div>
        </main>
      </>
  )
}

/**
 * @name Блок-клиенты
 * @description Разбил для удобства
 * @param {String} title
 * @param {BigString} text
 * @returns {JSX.Element}
 * @constructor
 */
const Clients = ({title = '', text = ''}) => {

    const {lang} = useMain();

    const {isLoading, error, data} = useGetClientsQuery(lang)

    return(
        <div className = {`${localstyles.w100} ${localstyles.text2}`}>

            <h2>{title}</h2>
            <p>{text}</p>

            <div className = {`${localstyles.scrollData}`}>
                {
                    (!isLoading && !error) ?
                    (data && Array.isArray(data.data)) ?
                        data.data.map( (item, index) => {
                            return(
                                <div className = {`${localstyles.proxyImage}`}>
                                    <Image src = {`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.logo.data.attributes.url}`} alt = {title} fill />
                                </div>
                            )
                        })
                             :null
                        : <Loader />
                }
            </div>
        </div>

    )
}

/**
 * @name Блок-партнеры
 * @description Разбил для удобства
 * @param {String} title
 * @param {BigString} text
 * @returns {JSX.Element}
 * @constructor
 */
const Partners = ({title = '', text = ''}) => {

    const {lang, moduleWindow} = useMain();

    const {isLoading, error, data} = useGetPartnersQuery(lang);

    return(
        <div className = {`${localstyles.w100} ${localstyles.text2} ${localstyles.mt150}`}>

            <h2>{title}</h2>
            <p>{text}</p>

            <div className = {`${localstyles.scrollData}`}>
                {
                    (!isLoading && !error) ?
                        (data && Array.isArray(data.data)) ?
                            data.data.map( (item, index) => {
                                return(
                                    <div className = {`${localstyles.proxyImage}`}>
                                        <Image src = {`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.logo.data[0].attributes.url}`} alt = {title} fill />
                                      </div>
                                )
                            })
                        :null
                    : <Loader />
                }
            </div>
            {
                (moduleWindow) ? <ModuleWindow /> : null
            }
        </div>
    )
}
