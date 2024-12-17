'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'

import styles from '@/app/css/header.module.css'

import {NavigationBar} from '@/app/components/micro/NavigationBar'
import LangSwitcher from "@/app/components/micro/LangSwitcher";
import {useMain, useStater} from "@/hooks/useStater";

const BurgerMenu = ({color = ""}) => {

    const [open, setOpen] = useState(false)

    const {lang} = useMain()

    return(
        <>
            <div onClick = {() => setOpen(!open)} className = {`${styles.burgerIcon} ${(color) ? styles.whiteSpan : null}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className = {`${styles.burgerContainer} ${(open) ? styles.openBurger : styles.closedBurger}`}>
                <div className={styles.upBurgerBlock}>
                    <div className = {`${styles.logoContainer}`}>
                        <div className = {`${styles.imgContainer }`}>
                            <Image alt = "Логотип компании грузомир" src = "/logoSmall.svg" fill/>
                        </div>
                    </div>
                    <div onClick = {() => setOpen(!open)} className = {`${styles.burgerIcon}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <NavigationBar lang={lang} burgerSetter = {setOpen} />

                <LangSwitcher />

            </nav>
        </>
    )
}

export default BurgerMenu;
