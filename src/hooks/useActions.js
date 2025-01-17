import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { actions as pagesActions} from '@/redux/reducers/pagesReducer'
import { actions as cartActions } from '@/redux/reducers/cartReducer'
import { actions as categoryActions } from '@/redux/reducers/categoryReducer'
import { actions as productActions } from '@/redux/reducers/productReducer'
import { actions as mainActions } from '@/redux/reducers/mainReducer'

const rootActions = {
  ...pagesActions,
  ...cartActions,
  ...categoryActions,
  ...productActions,
  ...mainActions,
}

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo( () => {
    return bindActionCreators(rootActions, dispatch)
  },[dispatch])

}
