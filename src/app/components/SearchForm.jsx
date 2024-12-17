'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useStater} from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import styles from '@/app/css/search.module.css'
import Link from 'next/link'

export const SearchForm = ({}) => {
    
    const [text, setText] = useState('')
    const [results, setResults] = useState([])

    const products = useStater('products')
    const [loading, setLoading] = useState(false) //пока на будущее

    function getResults() {
        if(text.length < 2) {
            setResults([]);
            return;
        }
        // Начальное значение состояния results
        let tempresults = [];
        
        // Проверка каждого объекта в массиве products
        for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
        // Проверяем наличие совпадения title с введенным текстом
        let toLowCaseText = text.toLowerCase();
        let titleToLowerCase = product.title.toLowerCase();
        if (titleToLowerCase.includes(toLowCaseText)) {
        const existingProduct = tempresults.find((result) => result.id === product.id);
        
        // Проверяем, есть ли уже такой объект внутри results
        if (!existingProduct) {
        // Добавляем объект в состояние results
        tempresults.push(product);
        }
        }
        }
        setResults(tempresults)
    }

    function goToResult() {
        setTimeout(() => {
            setResults([]);
            setText('');
        },100)
    }

    useEffect(() => {console.log(results)},[results])

    return(
        <section className = {`${styles.searchContainer}`}>
            <div className={`${styles.searchForm}`}>
                <div className = {`${styles.searchIcon}`} >
                    <Image src = {'/graySearchIcon.svg'} alt = {'Иконка поиска'} fill />
                </div>    
                <input type = 'text' placeholder = 'Поиск' value = {text} onChange={(e) => {
                    getResults();
                    setText(e.target.value)
                    }} />
             </div>   

             {
                (!results[0]) ? null :
                                <section className = {`${styles.searchResultsContainer}`}>
                                    {
                                        results.map( (item, index) => {
                                            return(
                                                <Link key = {`resultSearch_key_${index}_${item.id}`} onClick = {goToResult} className = {`${styles.resultItem}`} href = {`/routes/shop/${item.id}`}>
                                                    <h3>{item.title}</h3>
                                                </Link>
                                            )
                                        })
                                    }
                                </section>    
             }
        </section>
    )
}