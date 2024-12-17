'use client'
import React, {Suspense, useRef, useState} from 'react'
import Image from 'next/image'

import styles from '@/app/css/mainpage.module.css'
import localstyles from '@/app/css/videos.module.css'

import {useRouter, useSearchParams, usePathname} from 'next/navigation'

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";

import {useGetVideosQuery} from "@/redux/api/dinamicPages.api";
import {useMain} from "@/hooks/useStater";
import Link from "next/link";
import ModuleWindow from "@/app/components/ModuleWindow";

export default function Page({params}) {

    const router = useRouter();
    const {lang, moduleWindow} = useMain();

    const [selectedVideo, setSelectedVideo] = useState(-1)

    const {isLoading, error, data} = useGetVideosQuery();

    useEffect(() => {
        console.log(data)
    },[data])

    return (
        <>
            <main className={`${styles.main} ${styles.contentpage}`}>

                <section className={`${styles.newsContainer} ${localstyles.videosContainer}`}>
                    {
                        (!isLoading && !error) ?
                            (data && Array.isArray(data.data)) ?
                                data.data.map( (item, index) => {
                                    if(index < 5)
                                        return(<Video data = {item} index = {index} setSelectedVideo = {setSelectedVideo} selectedVideo = {selectedVideo}/>)
                                })
                                : <h3>Ошибка получения данных! Страница: Наши работы</h3>
                            : <Loader />


                    }
                </section>

                <div className={localstyles.toCenterBlock}>
                    <Forms type = {"main"} />
                </div>

                <section className={`${styles.newsContainer} ${localstyles.videosContainer}`}>
                    {
                        (!isLoading && !error) ?
                            (data && Array.isArray(data.data)) ?
                                data.data.map( (item, index) => {
                                    if(index >= 5)
                                        return(<Video data = {item} index = {index} setSelectedVideo = {setSelectedVideo} selectedVideo = {selectedVideo}/>)
                                })
                                : <h3>Ошибка получения данных! Страница: Наши работы</h3>
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

/**
 * @param {Int} index
 * @param {mp4File} data
 * @returns {JSX.Element}
 * @constructor
 */
const Video = ({data = {}, index = -1, setSelectedVideo = f => f, selectedVideo = -2}) => {

    const {mobile, lang} = useMain()
    const [play, setPlay] = useState(false)
    const videoRef = useRef();

    useEffect(() => {
        if(play && selectedVideo == index) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    },[play, selectedVideo])

    useEffect(() => {
        console.log(selectedVideo)
    }, [selectedVideo])

    return(
        <div className = {`${localstyles.w100} ${localstyles.videoBlock} ${(!mobile && play && selectedVideo == index) ? localstyles.playingVideo : localstyles.pauseVideo}`}>

            <svg onClick = {
                () => {
                    if(!mobile) {
                      setPlay(!play)
                      setSelectedVideo(index)
                    }
                }
            } onTouchStart = {
                () => {
                      setPlay(!play)
                      setSelectedVideo(index)
                    }
            } width="42" height="49" viewBox="0 0 42 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 24.5L0.749998 48.3157L0.75 0.6843L42 24.5Z" fill="white"/>
            </svg>
            <video ref = {videoRef} autoPlay={play} src = {`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${data.attributes.video.data.attributes.url}`} alt = {data.attributes.title} fill />
            <h2>{data.attributes.video.data.attributes.name.split('.')[0]}</h2>
        </div>
            )

}
