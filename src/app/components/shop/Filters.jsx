import React , {useEffect, useState} from 'react';

import styles from '@/app/css/shop.module.css';

import {useStater} from '@/hooks/useStater';
import { Loader } from '@/app/components/micro/Loader';
import {useGetCategoriesQuery} from "@/redux/api/categories.api";

/**
 *
 * @param {string} string
 * @param {Array} array
 * @returns void[];
 */
const Filters = ({filter,filterSetters}) => {

    const {setCategoryFilter} = filterSetters;

    const category  = useStater('category');

    const {isLoading, error, data} = useGetCategoriesQuery();

    switch(filter){
        case 'category':
            return(
                <section className = {`${styles.filtersBlock}`}>
                    <nav>
                        {
                            (isLoading) ? <Loader /> :
                                data ? data.data.map((item, index) => {
                                                return(
                                                    <CategoryFilter key = {`category_${item.id}_${index}`}
                                                                    item={item}
                                                                    index = {item.id}
                                                                    filterSetter = {setCategoryFilter}
                                                                    />
                                                )
                                            })
                                    : <div>Not found</div>

                        }
                    </nav>
                </section>
            )
            break;
        default:
            return(
                <section className = {`${styles.filtersBlock}`}>
                </section>
            )
    }
}

const CategoryFilter = ({item, index,filterSetter}) => {

    const [opened, setOpened] = useState(true);

    const toggleOpened = () => {
          if(item.attributes.childs.data) setOpened(!opened);
    }

    return(
        <div key = {index} className = {`${styles.filterItem}`}>

             <h3 onClick = {
                () => {
                    if(item.attributes.childs.data) toggleOpened()
                    else filterSetter(item.attributes.id)
                }
            } >{item.attributes.name}</h3>

        <div className={`${styles.childCategories} ${(opened) ? styles.openedChild : styles.hiddenChild}`}>
            {
                (!item.attributes.childs.data) ? null :
                            <>
                            {
                                item.attributes.childs.data.map((value, index) => {
                                        return ( !value.attributes.name ) ? null :
                                                                <li onClick = {() => {
                                                                    filterSetter(value.id)
                                                                }}
                                                                    key = {`childKey_${value.id}_${index}`}>{value.attributes.name}</li>
                                    })
                            }
                            </>
            }
        </div>
    </div>
    )
}

export default Filters;
