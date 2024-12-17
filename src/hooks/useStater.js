import { useSelector } from 'react-redux'

export const usePage = () => {
  const state = useSelector(state => state.page)
  return state;
}
export const useMenu = () => {
  const state = useSelector(state => state.menu)
  return state;
}
export const useSlides = () => {
  const state = useSelector(state => state.slides)
  return state;
}
export const usePartners = () => {
  const state = useSelector(state => state.partners)
  return state;
}
export const useServices = () => {
  const state = useSelector(state => state.service)
  return state;
}
export const useProducts = () => {
  const state = useSelector(state => state.products)
  return state;
}
export const useCategory = () => {
  const state = useSelector(state => state.category)
  return state;
}
export const useBestSales = () => {
  const state = useSelector(state => state.bestsales)
  return state;
}
export const useCart = () => {
  const state = useSelector(state => state.cart)
  return state;
}
export const useTerms = () => {
  const state = useSelector(state => state.deliveriesTerms)
  return state;
}
export const useMain = () => {
  const state = useSelector(state => state.main)
  return state;
}
