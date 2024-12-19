'use client'
import Image from 'next/image'
import Link from "next/link";

import {useEffect, useState} from "react";

import {useMain} from '@/hooks/useStater'

import main_styles from '@/app/css/main.module.css'
import styles from '@/app/css/contacts.module.css'

/**
 * @name Офисы
 * @description Компонент для отобржения офисов. Имеет несколько типов отображения.
 * @param {} data
 * @returns {JSX.Element}
 * @constructor
 */
const Office =  ({data = {}, selectType = 0}) => {

    const {lang, mobile} = useMain();

    const [selectedOffice, setSelectedOffice] = useState(0)

    useEffect(() => {}, [selectType])

    const filiasLang = {
        ru: 'Филиал',
        en: 'Branch',
    }
    const addressLang = {
        ru: 'Адресс',
        en: 'Address',
    }
    const howLang = {
        'ru': `Скоро откроется`,
        'en': 'Opening soon'
    }

    return(
        <section className = {`${styles.officeContainer} ${main_styles.container}`}>
            {
                (!selectType) ?
                    <div className={`${styles.rowContacts}`}>
                        <div><h4>{filiasLang[lang]}</h4><h4>{addressLang[lang]}</h4></div>
                        {
                            data.map( (item, index) => <div><h4>{item.attributes.city}</h4><p>{(item.attributes.address) ? item.attributes.address : howLang[lang]}</p></div>)
                        }
                    </div>
                              :
                    <div className={`${styles.mapContacts}`}>
                        <nav>
                            {
                                (data && Array.isArray(data)) ?
                                    data.map( (item, index) => <p onClick = {
                                        () => {
                                            if(!mobile) {
                                                setSelectedOffice(index)
                                            }
                                        }}
                                                                  onTouchStart = {() => {
                                                                      setSelectedOffice(index)
                                                                  }}
                                                                  style = {{
                                                                      color: (selectedOffice == index) ? '#FF6006' : null,
                                                                      fontWeight: (selectedOffice == index) ? `800` : `600`
                                                                  }}
                                    >{item.attributes.city}</p>)
                                    : null
                            }
                        </nav>
                        {
                            (data && Array.isArray(data)) ?
                                  <div dangerouslySetInnerHTML={{__html: (data[selectedOffice].attributes.iframeMap) ? data[selectedOffice].attributes.iframeMap : `<div><h3>Cкоро откроется</h3></div>`}}></div>
                                : null
                        }
                    </div>
            }
        </section>
    )
}

export default Office;
