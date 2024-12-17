'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect} from "react";

import {useMain, useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import { Loader } from '@/app/components/micro/Loader'

import {useGetJobsQuery} from "@/redux/api/jobs.api";

import main_styles from '@/app/css/main.module.css'
import styles from '@/app/css/jobs.module.css'

const we = {
    ru: 'Мы',
    en: 'We',
    zh: '我们'
}

const Jobs = ({}) => {

    const {lang} = useMain();

    const {isLoading, error, data} = useGetJobsQuery(lang);

    const buttonText = {
        ru: "Вакансии",
        en: "Vacancies",
        zh: "职位空缺",
    }

    useEffect(() => {
        //
    })

    return(
        <section className = {`${styles.jobsContainer} ${main_styles.container}`}>
            {
                (!data) ? (<Loader />)
                    :
                    <article key = {`infoMainJobs_Key`} className = {`${styles.jobs_infoBlock}`}>
                        <div className={`${styles.imageBlock}`}>
                            <Image unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes.image.data.attributes.url}`} alt = {data.data.attributes.title} fill/>
                        </div>
                        <div className={`${styles.infoJobs}`}>
                            <h3>{we[lang]} - <strong>{data.data.attributes.title}</strong></h3>
                            <p>{data.data.attributes.description}</p>
                            <Link href = {data.data.attributes.buttonLink}>{buttonText[lang]}</Link>
                        </div>
                    </article>
            }
        </section>
    )
}

export default Jobs;
