'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect} from "react";

import { useStater } from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import { Loader } from '@/app/components/micro/Loader'

//import {useGetBestQuery} from "@/redux/api/best.api";

import main_styles from '@/app/css/main.module.css'
import styles from '@/app/css/map.module.css'



const Map = ({}) => {

    //const {isLoading, error, data} = useGetBestQuery();

    useEffect(() => {
        //
    })

    return(
        <section className = {`${styles.whybestContainer} ${main_styles.container}`}>
            <div className = {`${main_styles.upBlock}`}>
                <div>
                    <p>Расположение</p>
                </div>
                <div>
                    <p></p>
                </div>
            </div>
            <h2>Региональное <strong>Покрытие</strong></h2>
            <p>
                Количество пирокластического материала прекращает перенос. Зона дифференциальных <br />
                опусканий, в пределах Молого-Шекснинской, Нерльской и Мещерской низменностей, <br />
                относительно слабо ослабляет малиньит
            </p>
            <div className = {`${styles.downBlock}`}>
                <Image src={'/map2.png'} alt={'Карта которая показывает регионы работы'} fill />
            </div>
        </section>
    )
}

export default Map;
