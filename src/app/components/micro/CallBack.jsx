import React from 'react'

import styles from '@/app/css/header.module.css'
import Image from "next/image";
import {useMain} from "@/hooks/useStater";

export const CallBack = ({}) => {

  const {lang, mobile} = useMain()

  return(
  <button className = {styles.buttonCallBack}>
    <a href = "tel: 8 (984) 226 - 81 - 21">
      <Image src = {'/icons/tel.svg'} alt = {''} fill />
      {(!mobile) ? `8 (984) 226 - 81 - 21`: null}
    </a>
  </button>
  )
}
