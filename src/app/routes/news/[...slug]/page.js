'use client'
import React, {Suspense} from 'react'
import Image from 'next/image'

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import {useGetCategoriesQuery} from "@/redux/api/categories.api";

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";
import {useGetNewsIDQuery} from "@/redux/api/news.api";

import styles from '@/app/css/news.module.css'
import PageHeader from "@/app/components/micro/PageHeader";

export default function Page({params}) {

  const router = useRouter();

  const {isLoading, error, data} = useGetNewsIDQuery(Number.parseInt(params.slug));

  useEffect(() => {
      //
  },[data])

  return (
      <>
          {
              (isLoading) ? <Loader />
                  : (data) ?
                      <PageHeader header = {(data) ? data.data.attributes?.title : ''} styles = {styles}
                                  src = {(data) ? `https://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes?.headerImage.data.attributes.url}` : ''}
                                  publicPath = {false} />
                      : null
          }


        <main className={`${styles.main} ${styles.contentpage}`}>

          <section className={`${styles.newsBigIntoContainer}`}>
            {
              (isLoading) ? <Loader />
                  : (data) ?
                      <>
                          <div className={styles.headerNews}>
                              <p>Дата публикации: <br /> {(data.data.attributes?.createdAt).split('T')[0]}</p>

                              <h1>{data.data.attributes?.title}</h1>
                          </div>

                          <div>
                              <p>
                                  {data.data.attributes?.description}
                              </p>
                          </div>

                          <div className = {styles.intoTextNews} dangerouslySetInnerHTML={{__html: data.data.attributes?.text}}>
                          </div>
                      </>
                      : <h3>Ошибка получения данных! Страница: Новости</h3>


            }
          </section>

        </main>
      </>
  )
}
