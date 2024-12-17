'use client'
import React, {Suspense, useState} from 'react'
import Image from 'next/image'

import styles from '@/app/css/mainpage.module.css'
import localstyles from '@/app/css/pagesContacts.module.css'

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import {useGetContactsQuery} from "@/redux/api/contacts.api";

import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";

import {useMain} from "@/hooks/useStater";
import ModuleWindow from "@/app/components/ModuleWindow";
import Office from "@/app/components/micro/Office";

export default function Page({}) {

  const router = useRouter();
  const {lang, mobile, moduleWindow} =  useMain();
  const {isLoading, error, data} = useGetContactsQuery(lang);

  const [selectType, setSelectType] = useState(0)

  useEffect(() => {
      console.log(data)
  },[data, selectType])

  const buttonListLang = {
      ru: 'ОФИСЫ СПИСКОМ',
      en: 'OFFICES LIST',
  }
  const buttonMapLang = {
      ru: 'ПОКАЗАТЬ НА КАРТЕ',
      en: 'SHOW ON THE MAP',
  }

  return (
      <>
        <main className={`${styles.main} ${styles.contentpage} ${localstyles.contactPage}`}>
          <nav>
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
              >{buttonListLang[lang]}</button>
              <button onClick = {() => {
                          if(!mobile) {
                              setSelectType(1)
                          }
                      }}
                      style = {{
                          background: (selectType != 1) ? `#F0F0F0` : null,
                          color: (selectType != 1) ? `#292929` : null
                      }}
                      onTouchStart = {() => {
                          setSelectType(1)
                      }}
              >{buttonMapLang[lang]}</button>
          </nav>

          <section className={`${styles.contactsContainer}`}>

              {
                  (!isLoading) ?
                      (data && typeof data.data != 'undefined') ?
                          <Office data = {data.data.attributes.offices.data} selectType = {selectType} />
                          : null
                      : <Loader />
              }

          </section>

        </main>
          {
              (moduleWindow) ? <ModuleWindow /> : null
          }
      </>
  )
}
