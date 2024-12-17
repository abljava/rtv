'use client'

import React, {useRef, useState} from 'react'
import Image from 'next/image'

import emailjs from "@emailjs/browser";

import styles from '@/app/css/forms.module.css'

import {useMain, useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

export const Forms = ({header = '', job = '', type = 'main'}) => {

  const {lang, mobile} = useMain();
  const {setModule} = useActions()
  const [sendStatus, setSendStatus] = useState(false);
  const [statusSending, setStatusSending] = useState(false);

  const SERVICE_ID = 'service_zh5fjyu',
        API_KEY = 'lEUiaEbpj1jr1fJON',
        TEMPLATE_MAIL = (type && type == 'module') ? 'template_nuh5gls' : 'template_fnhz8fa'


    const localeTextH3 = {
      ru: 'Хотите с нами сотрудничать?',
      en: 'Do you want to cooperate with us?',
  }
  const localeTextP = {
      ru: 'Напишите адрес электронной почты и мы свяжемся с вами',
      en: 'Write your email address and we will contact you',
  }
  const localeButton = {
      ru: 'Рассчитать',
      en: 'Send',
  }
 const loadingButton = {
        ru: 'Отправка...',
        en: 'Sending',
 }
  const localePlaceholder = {
      ru: 'Эл. почта',
      en: 'Email',
  }
  const localHeaderModule = {
      ru: 'Оставьте свои данные и мы перезвоним вам в ближайшее время',
      en: 'Leave your details and we will call you back as soon as possible',
    }
 const sliderHeaderLang = {
      'ru': 'Перевозки по России',
      'en' : 'Tracking Russia'
 }
 const cityFromLang = {
      'ru': 'Город отправки',
      'en' : 'from city'
 }
 const cityToLang = {
      'ru': 'Город доставки',
      'en' : 'city to'
 }
 const infoLang = {
      'ru': 'Оставьте свой номер телефона, мы перезвоним в ближайшее время и всё подробно расскажем.',
      'en' : 'Please....'
 }

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusSending(true)
    //Отправка данных
      emailjs.sendForm(SERVICE_ID, TEMPLATE_MAIL, formRef.current, API_KEY)
          .then((result) => {
              if(result.status) {
                setSendStatus(true)
                console.log("FORM SEND: " + result.status)

                  setTimeout(() => {
                      setSendStatus(false)
                      setStatusSending(false)
                  },30000)
              }
          }, (error) => {

          });

      }

 const exit = (e) => {
      e.preventDefault()
 }

  switch (type) {
    case "callback":
      return(
        <form onSubmit = {(!statusSending) ? handleSubmit : exit} ref = {formRef}>
            {
                (!sendStatus) ?
                    <>
                        <input type="name" name="name" placeholder="Имя"/>
                        <input type="tel" name="tel" placeholder="Телефон"/>
                        <input type="text" name="text" placeholder="Комментарий"/>
                        <input type="hidden" name="to"
                               value={(process.env.NEXT_PUBLIC_JOBSMAL) ? process.env.NEXT_PUBLIC_JOBSMAL : "survey@mcb-fe.ru"}/>
                        <button onClick={f => f} type="submit">{(!statusSending) ? localeButton[lang] : loadingButton[lang] }</button>
                    </>  : <h3> Заявка отправлена! <br /> Скоро Вам позвонят! </h3>
            }
        </form>
      )
      break;
    case "module":
      return(
          <form className={styles.moduleForm} onSubmit = {(!statusSending) ? handleSubmit : exit} ref = {formRef}>
              {
                  (!sendStatus) ?
                      <>
              <h3>{localHeaderModule[lang]}</h3>
              <input type = "name" name = "name" placeholder = "Имя" />
              <input type = "tel" name = "tel" placeholder = "Телефон" />
              <input type = "hidden" name = "to" value = {process.env.NEXT_PUBLIC_JOBSMAIL} />
              <input type = "hidden" name = "job" value = {job} />
                          <button onClick={f => f} type="submit">{(!statusSending) ? localeButton[lang] : loadingButton[lang] }</button>
                      </>
                      : <h3> Заявка отправлена! <br /> Скоро Вам позвонят! </h3>
              }
             <div onClick = {() => setModule(false)} className={styles.exitModule}><span></span><span></span></div>
          </form>
       )
       break;
    case "slider":
      return(
        <form onSubmit = {(!statusSending) ? handleSubmit : exit} className = {`${styles.sliderForm}`} ref = {formRef}>
            {
                (!sendStatus) ?
                    <>
                        {
                            (mobile) ? <h2 style = {{
                                width: '70%',
                                textAlign: 'center',
                                marginTop: '-13%',
                                marginBottom: '-13%',
                                textTransform: 'uppercase',
                                fontSize: '36px',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>{sliderHeaderLang[lang]}</h2> : null
                        }
          <h3>Рассчитать стоимость</h3>

          <div className = {styles.mainContainer}>
                <div className = {styles.cityesContainer}>
                    <input type = "text" name = "fromCity" placeholder = {cityFromLang[lang]} />
                    {(!mobile) ? <Image src={'/beetween.svg'} alt={'Иконка Между городами'} fill /> : null }
                    <input type = "text" name = "toCity" placeholder = {cityToLang[lang]} />
                </div>
                <div className = {styles.dataContainer}>
                    <div className={styles.dataRow}>
                        <input type = "text" name = "fromCity" placeholder = "Город отправки" />
                        {(!mobile) ? <Image src={'/kg.svg'} alt={'Иконка Между городами'} fill /> : null }
                    </div>
                    <div className={styles.dataRow}>
                        <input type = "text" name = "toCity" placeholder = "Город доставки" />
                        {(!mobile) ? <Image src={'/volume.svg'} alt={'Иконка Между городами'} fill /> : null }
                    </div>
                </div>
          </div>

          <input type = "hidden" name = "to" value = {(process.env.NEXT_PUBLIC_JOBSMAL) ? process.env.NEXT_PUBLIC_JOBSMAL : "survey@mcb-fe.ru"} />
                        <button onClick={f => f} type="submit">{(!statusSending) ? localeButton[lang] : loadingButton[lang] }</button>
                    </>  : <h3> Заявка отправлена! <br /> Скоро Вам позвонят! </h3>
            }
        </form>
      )
      break;
    case "subscribe":
        return(
            <>
            <div className={styles.toColumn}>
                <h4>{localeTextH3[lang]}</h4>
                <p>{localeTextP[lang]}</p>
            </div>
               <form onSubmit = {(!statusSending) ? handleSubmit : exit} className = {`${styles.subscribeForm}`} ref = {formRef}>
                   {
                       (!sendStatus) ?
                           <>
                               <input type="email" name="email" placeholder={localePlaceholder[lang]}/>
                               <input type="hidden" name="to"
                                      value={process.env.NEXT_PUBLIC_SUBSCRIBEMAIL}/>
                               <button onClick={f => f} type="submit">{(statusSending) ? localeButton[lang] : loadingButton[lang] }</button>
                           </>
                           : <h3> Заявка отправлена! <br /> Скоро Вам позвонят! </h3>
                   }
             </form>
            </>
          )
          break;
    case "tarrifs":
        return(
            <form onSubmit = {(!statusSending) ? handleSubmit : exit} className = {`${styles.leftForm}`} ref = {formRef}>
                {
                    (!sendStatus) ?
                        <>
                            <h3>Рассчитать стоимость</h3>

                            <div className = {`${styles.mainContainer} ${styles.tarrifsForm}`}>
                                <div className = {styles.cityesContainer}>
                                    <label htmlFor = "fromCity">Город отправки</label>
                                    <input type = "text" name = "fromCity" placeholder = "" />
                                    <label htmlFor="toCity">Город доставки</label>
                                    <input type = "text" name = "toCity" placeholder = "" />
                                    <label htmlFor="weight">Вес груза</label>
                                    <input type = "text" name = "weight" placeholder = "" />
                                    <label htmlFor="volume">Объём</label>
                                    <input type = "text" name = "volume" placeholder = "" />
                                </div>
                            </div>

                            <input type = "hidden" name = "to" value = {(process.env.NEXT_PUBLIC_JOBSMAL) ? process.env.NEXT_PUBLIC_JOBSMAL : "survey@mcb-fe.ru"} />
                            <button onClick={f => f} type="submit">{(!statusSending) ? localeButton[lang] : loadingButton[lang] }</button>
                        </>  : <h3> Заявка отправлена! <br /> Скоро Вам позвонят! </h3>
                }
            </form>
        )
          break;
    case "main":
      return(
        <div className={`${styles.mainPageForm}`}>

          <Image src={'/downFormBg.png'} alt = {`Доставка грузов по всему миру`} fill/>

            <p>Бесплатная консультация</p>

            <h3>Оптимизируйте вашу логистику с нами</h3>

          <form id = "mainForm" onSubmit = {(!statusSending) ? handleSubmit : exit} className = {`${styles.mainForm}`} ref = {formRef}>
            <div сlassName = {styles.blockFormPosition}>
              <input type = "name" name = "name" placeholder = "Ваше имя" />
              <input type = "tel" name = "tel" placeholder = "+7 (999) 999 99 99" />
              <button type = "submit">{localeButton[lang]}</button>
            </div>

          </form>

          <p>{infoLang[lang]}</p>

        </div>
      )
      break;
    default:
        return(
            <div>
                <p>Неизвестная форма</p>
            </div>
            )
  }
}
