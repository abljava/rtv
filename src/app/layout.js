'use client'

import '@/app/css/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//Redux
import {ReduxWrapper} from "@/app/ReduxWrapper"
//Components
import {Header} from  "@/app/components/main/Header"
import {Footer} from "@/app/components/main/Footer"
import YandexMetrika from './YandexMetrika';

export default function RootLayout({ children }) {
  return (
    <ReduxWrapper>
      <html lang="ru">
       <head>
           <title>RTV</title>
           <meta name="viewport" content="width=device-width, initial-scale"/>
           <meta name="description" content="Морское грузовое бюро предлагает профессиональные услуги по организации морских перевозок. Наши специалисты помогут вам с логистикой, таможенным оформлением и выбором оптимальных маршрутов. Доверьте нам свои грузы и надежно создайте и эффективное решение для вашего бизнеса." />
           
            <YandexMetrika 
                yid={97841668}
                clickmap={true}
                trackLinks={true}
                accurateTrackBounce={true}
                webvisor={true}
            />    
            
            
       </head>
        <body className={inter.className}>
        <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ReduxWrapper>
  )
}
