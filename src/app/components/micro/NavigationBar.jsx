import Link from "next/link"
import {useEffect, useState} from "react";

import {useMain, useMenu, useStater} from '@/hooks/useStater'

import styles from '@/app/css/header.module.css'
import footerStyle from '@/app/css/footer.module.css'

import {useGetNavQuery} from "@/redux/api/nav.api";

export const NavigationBar = ({ place = 'header', burgerSetter = false}) => {

  const {lang} = useMain()

  const [showHeaderDrop, setShowHeaderDrop] = useState(-1)

  const {isLoading, error, data} = useGetNavQuery(lang)

  const closedBurger = () => {
    burgerSetter(false);
  }
  const showDrop = (type = '', index = -1) => {
    setShowHeaderDrop(index)
  }

  useEffect(() => {
    //console.log(lang)
  },[lang])

  switch(place){
    case "header":
      return(
          <nav className = {`${styles.nav}`}>
            {
              (!isLoading) ?
                  (data && typeof data.data != 'undefined') ?
                      data.data.map((item, index) => {
                        return(
                            <Link
                                onMouseOver = {() => showDrop('desktop', index)}
                                onMouseLeave = {() => showDrop('desktop', -1)}
                                onClick = {(typeof(burgerSetter) === 'function') ? closedBurger : null}
                                href={item.attributes.route}
                                key={`navmenu_${index}_${lang}`}>

                              {item.attributes.name}

                              {
                                (typeof item.attributes.childs.data != 'undefined' && typeof  item.attributes.childs.data[0] != 'undefined') ?
                                    <>
                                      <svg viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 1.5L8.22581 7L14 1.5" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                      <DropMenuItems showIndex = {showHeaderDrop} index = {index} lang = {lang} items = {item.attributes.childs.data} />
                                    </>
                                    : null
                              }
                            </Link>
                        )
                      })
                  : null
              : null
            }
          </nav>
      )
      break;
      case "footer":
      return(
          <nav className = {`${footerStyle.nav}`}>
            {
              (!isLoading) ?

                  (data && typeof data.data != 'undefined') ?

                      data.data.map((item, index) => {

                        if(item.id != 6  && item.id != 5 && item.id != 10 && item.id != 9) {
                          return (
                              <div key={`navmenu_footer_div${index}_${lang}`}
                                   className={`${footerStyle.footerNavColumn}`}>

                                <Link onClick={(typeof (burgerSetter) === 'function') ? closedBurger : null}
                                      href={item.attributes.route}
                                      key={`navmenu_footer${index}_${lang}`}>
                                  {item.attributes.name}
                                </Link>

                                <div className={`${footerStyle.footerNavChilds}`}>
                                  {
                                    (typeof item.attributes.childs.data != 'undefined' && typeof item.attributes.childs.data[0] != 'undefined') ?
                                        <>
                                          <DropMenuItems showIndex={showHeaderDrop} index={index} lang={lang}
                                                         items={item.attributes.childs.data}/>
                                        </>
                                        : null
                                  }
                                </div>

                              </div>
                          )
                        }
                   })
                  : null
              : null
            }
          </nav>
      )
      break;
    default:
      return(
          <nav className = {`${footerStyle.nav}`}>
            {
              (menu) ?
                  menu.map((item, index) => {
                    return(
                        <Link onClick = {(typeof(burgerSetter) === 'function') ? closedBurger : null} href={item.href} key={`navmenu_footer${index}_${lang}`}>{item.name[lang]}</Link>
                    )
                  })
                  : null
            }
          </nav>
      )

  }

}

const DropMenuItems = ({showIndex = -1, index = 0,  lang = '', items = []}) => {
  return(
      <div className  = {`${styles.dropMenu2lvlContainer} ${(index === showIndex) ? styles.show : styles.hidden}`}>
        {
              (items && Array.isArray(items)) ?
                  items.map((item, index) => {
                      return(
                          <Link onClick = {
                            (typeof(burgerSetter) === 'function') ?
                                closedBurger :
                                null
                          } href={item.attributes.route}
                                key={`navmenu_footer_drop${index}_${lang}`}>
                            {item.attributes.name}
                          </Link>
                      )
                  })
                  : null
        }
      </div>
  )
}
