'use client'

import { useStater } from '@/hooks/useStater'
import Link from 'next/link'

import styles from '@/app/css/shop.module.css'

import { ProductCard } from '@/app/components/shop/ProductCard'

import { Loader } from '@/app/components/micro/Loader'
import {useGetProductsQuery} from "@/redux/api/products.api";
import {useEffect, useState} from "react";
import {useActions} from "@/hooks/useActions";

export const ProductRow = ({}) => {

    const [statusLoad, setStatusLoad] = useState(false);

    const products = useStater('products')

    return(
        <section className = {`${styles.productContainer}`}>
            <div className = {`${styles.upBlock}`}>
                <div className = {`${styles.left}`}>
                    <h2>запчасти для грузовиков<br /><strong>во владивостоке</strong></h2>
                </div>
                <div className = {`${styles.right}`}>
                    <p>
                       Согласно предыдущему, рекламное сообщество консолидирует культурный креатив. Взаимодействие корпорации и клиента
                    </p>
                </div>
            </div>
            <div className = {`${styles.downBlock}`}>
                {
                    (!products || !products[0]) ? (<Loader />)
                                                    :
                        products.map((item, index) => <ProductCard key = {index} product = {item} />)
                }
            </div>
            <Link className = {`${styles.buttonToShop}`} href = '/routes/shop'>В каталог</Link>
        </section>
    )
}
