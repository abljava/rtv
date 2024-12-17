'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect} from "react";

import { useActions } from '@/hooks/useActions'
import {useMain} from "@/hooks/useStater";

import { Loader } from '@/app/components/micro/Loader'

import {Forms} from "@/app/components/Forms";

import main_styles from '@/app/css/main.module.css'



const ModuleWindow = ({}) => {

    const {lang, moduleWindow, job} = useMain();

    const {setModule, setJob} = useActions()

    useEffect(() => {
        //
    })

    return(
        <section className = {`${main_styles.moduleWindowContainer} ${main_styles.backgroundContainer}`}>
            <Forms type={'module'} header = {'Оставьте свои данные и мы перезвоним вам в ближайшее время'} job = {job} />
        </section>
    )
}

export default ModuleWindow;
