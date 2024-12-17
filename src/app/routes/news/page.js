'use client'
import React, {Suspense, useEffect} from 'react'
import Image from 'next/image'
import Link from "next/link";

import {useRouter, useSearchParams, usePathname} from 'next/navigation'
import {useMain, useStater} from "@/hooks/useStater";

import {Loader} from "@/app/components/micro/Loader";

import {useGetNewsQuery} from "@/redux/api/news.api";

import PageHeader from "@/app/components/micro/PageHeader";

import styles from '@/app/css/mainpage.module.css'
import stylesnews from '@/app/css/news.module.css'

import headerImage from '@/app/images/headers/newsHeader.png'


export default function Page({params}) {

  const router = useRouter();
  const {lang} = useMain();

  const {isLoading, error, data} = useGetNewsQuery();

    const header = {
        ru: "Новости",
        en: "News"
    }


  useEffect(() => {},[data])

  return (
      <>
        <PageHeader header = {header[lang]} styles = {stylesnews} src = {headerImage.src} publicPath = {true} />

        <main className={`${styles.main} ${stylesnews.marginMain} ${styles.contentpage}`}>

          <section className={`${stylesnews.newsBigContainer}`}>
            {
              (!data) ? (<Loader />)
                  :
                  data.data.map((item, index) => {

                    return(
                        <article key = {`newsBigKey_${index}`} className = {`${stylesnews.newsBlock}`}>
                          <Link href = {`/routes/news/${item.id}`}>
                            <div className={`${stylesnews.newsIco}`}>
                              <Image unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`} alt = {item.attributes.name} fill/>
                            </div>
                            <p>{(item.attributes.createdAt).split('T')[0]}</p>
                            <h3>{item.attributes.title}</h3>
                          </Link>
                        </article>
                    )

                  })
            }
          </section>

        </main>
      </>
  )
}
