'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect} from "react";

import {useMain, useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import { Loader } from '@/app/components/micro/Loader'

//import {useGetBestQuery} from "@/redux/api/best.api";

import main_styles from '@/app/css/main.module.css'
import styles from '@/app/css/infoblock.module.css'


const InfoBlock = ({type = ''}) => {

    const {lang, mobile} = useMain();

    const {setModule} = useActions()

    useEffect(() => {
        //
    })

    const buttonLang = {
        'ru': 'Рассчитать',
        'en': 'Calculate'
    }
    const upTextLang = {
        'ru': 'Просто расскажи о своей перевозке',
        'en': 'Just tell us about your transportation'
    }
    const downTextLang = {
        'ru': 'Мы предложим лучшие условия',
        'en': 'We will offer the best conditions'
    }

    switch(type) {
        case "openModal":
            return(
                <section className = {`${styles.fullWidth} ${main_styles.container}`}>
                    <div className = {`${styles.downBlock}`}>
                        <div>
                            <p>{upTextLang[lang]}</p>
                            <h2>{downTextLang[lang]}</h2>
                            <button
                                onClick={(e) => {
                                    setModule(true)
                                }}
                            >{buttonLang[lang]}</button>
                        </div>
                        <div>
                            <Image src={'/infoBlockBg2.png'} alt={'Карта которая показывает регионы работы'} fill />
                        </div>
                    </div>
                </section>
            )
            break;
        default:
            return(
                <section className = {`${styles.fullWidth} ${main_styles.container}`}>
                    <div className = {`${styles.downBlock}`}>
                    </div>
                </section>
            )
            break;
    }

}

export default InfoBlock;
