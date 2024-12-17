'use client'

import Image from 'next/image'
import React, {useState, useEffect} from "react"

import styles from '@/app/css/mainpage.module.css'

import {useActions} from "@/hooks/useActions";

import { AreasOfWork } from './components/AreasOfWork'

import {useGetProductsQuery} from "@/redux/api/products.api";

import {useMain, useProducts, useStater} from "@/hooks/useStater";
import WhyBest from "@/app/components/WhyBest";
import ModuleWindow from "@/app/components/ModuleWindow";
import InfoBlock from "@/app/components/InfoBlock";
import {Forms} from "@/app/components/Forms";

export default function Home() {

  const {getDataProducts} = useActions()

  const [statusLoad, setStatusLoad] = useState(false);
  const {lang, moduleWindow} = useMain()

  const products = useProducts()

  const {isLoading, error, data} = useGetProductsQuery();

  useEffect(() => {
    (data) ?
        (products.length > 1 && data.data.length == products.length) ? getDataProducts(products.filter((item, index) => {
         return item.id != data.data[index].id
        })) : getDataProducts(data.data)
        :
        null
  },[isLoading])

  useEffect(() => {
    if(!statusLoad) {
      setStatusLoad(true)
    }
  })

  useEffect(() => {

  },[moduleWindow])

  return (
    <>
      <div className={styles.fullWidthColor}>
        <AreasOfWork langprop={lang} place = "main" />
      </div>

    <main className={styles.main}>
      <WhyBest langprop={lang} />
      <InfoBlock type = {"openModal"} />
      <div></div>
    </main>

      <div className={styles.toCenterBlock}>
        <Forms type = {"main"} />
      </div>

      {
        (moduleWindow) ? <ModuleWindow /> : null
      }

    </>
  )
}
