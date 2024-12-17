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


export default function Page({params}) {

  const router = useRouter();
  console.log(params)


  const {isLoading, error, data} = useGetNewsIDQuery(Number.parseInt(params.slug));

  useEffect(() => {console.log(data)},[data])

  return (
      <>
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

                        <div>
                          <p>
                            {data.data.attributes?.text}
                          </p>
                        </div>
                      </>
                      : <h3>Ошибка получения данных! Страница: Новости</h3>


            }
          </section>

        </main>
      </>
  )
}
