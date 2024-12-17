'use client'
import React, {Suspense, useEffect} from 'react'
import Image from 'next/image'
import Link from "next/link";

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import {Loader} from "@/app/components/micro/Loader";
import {useMain} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import {useGetJobsAllQuery} from "@/redux/api/jobs.api";
import {useGetPlusesQuery} from "@/redux/api/pluses.api";

import PageHeader from "@/app/components/micro/PageHeader";

import styles from '@/app/css/mainpage.module.css'
import stylesJob from '@/app/css/jobs.module.css'

import headerImage from "@/app/images/headers/jobsHeader.png";

import ModuleWindow from "@/app/components/ModuleWindow";


const header = {
    ru: "Вакансии",
    en: "Vacancies",
}
const advantagesText = {
    ru: 'Преимущества работы с нами',
    en: 'Benefits of working with us',
}
const openJobsText = {
    ru: 'Открытые вакансии',
    en: 'Open vacancies',
}
const buttonText = {
    ru: 'Подробнее',
    en: 'More info',
}

export default function Page({params}) {

  const router = useRouter();
  const {lang, moduleWindow} = useMain();
  const {setModule, setJob} = useActions();

  const {isLoading, error, data} = useGetJobsAllQuery(lang)

  useEffect(() => {console.log(data)},[data])

  return (
      <>
        <PageHeader header = {header[lang]} styles = {stylesJob} src = {headerImage.src} publicPath = {true} />

        <main className={`${styles.main} ${styles.contentpage} ${stylesJob.contenter}`}>

            <h2>{advantagesText[lang]}</h2>

            <Pluses />

            <h2>{advantagesText[lang]}</h2>

              <section className={`${stylesJob.jobsBigContainer}`}>
                {
                  (!data) ? (<Loader />)
                      :
                      data.data.map((item, index) => {

                        return(
                            <article key = {`newsBigKey_${index}_${lang}`} className = {`${stylesJob.jobsBlock}`}>
                                <div className={`${stylesJob.jobsIco}`}>
                                  <Image unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`} alt = {item.attributes.name} fill/>
                                </div>
                                <div className={`${stylesJob.infoJobsText}`}>
                                  <h3>{item.attributes.title}</h3>

                                  <div className = {styles.grayTextBlock}>
                                      <p>Тип занятости: {item.attributes.type}</p>
                                      <p>Заработная плата: {item.attributes.price}</p>
                                  </div>

                                  <p>{item.attributes.description}</p>
                                  <button
                                       onClick = {
                                           () => {
                                               if(!moduleWindow)
                                                   setModule(true)
                                                   setJob(item.attributes.title)
                                           }
                                       }
                                       className={stylesJob.callForm}
                                  >
                                      {buttonText[lang]}
                                  </button>
                                </div>
                            </article>
                        )

                      })
                }
              </section>

        </main>
          {
              (moduleWindow) ? <ModuleWindow /> : null
          }
      </>
  )
}

/*
                        return(
                            <article key = {`newsBigKey_${index}`} className = {`${stylesJob.jobsBlock}`}>
                              <Link href = {`/routes/jobs/${item.id}`}>
                                <div className={`${stylesJob.jobsIco}`}>
                                  <Image src = {`https://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`} alt = {item.attributes.name} fill/>
                                </div>
                                <h3>{item.attributes.title}</h3>
                              </Link>
                            </article>
                        )
 */

const Pluses = ({}) => {

    const {lang} =  useMain();
    const {isLoading, error, data} = useGetPlusesQuery(lang)

    return(
        <section className = {stylesJob.plusesContainer}>
            {
            (!data) ? (<Loader />)
                :
                data.data.map((item, index) => {

                    return(
                        <article key = {`plusKey_${index}`} className = {`${stylesJob.plusBlock}`}>
                                <div className={`${stylesJob.plusIco}`}>
                                    <Image src = {`https://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.icon.data.attributes.url}`} alt = {item.attributes.name} fill/>
                                </div>
                                <h3>{item.attributes.title}</h3>
                        </article>
                    )

                })
                }
        </section>
    )
}
