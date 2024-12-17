import React from "react";
import Image from "next/image";

import mainStyles from '@/app/css/main.module.css'


/**
 *
 */
const PageHeader = ({header = '' , styles = {} , src = '', publicPath = false}) => {
    if(!publicPath) {
        console.log("БЭК")
        return(
            <section style = {{
                backgroundColor: 'rgba(0,0,0,0)',
                backgroundImage: `url(${src})`

            }}
                     className={`${styles.pageHeader} ${mainStyles.pageHeader}`} >
                <h3>{header}</h3>
            </section>
        )
    } else {
        return(
            <section style = {{
                backgroundColor: 'rgba(0,0,0,0)',
                backgroundImage: `url(${src})`

            }}
                className={`${styles.pageHeader} ${mainStyles.pageHeader}`} >

                <h3>{header}</h3>
            </section>
        )
    }

}

export default PageHeader;
