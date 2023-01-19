import { useNavigate } from 'react-router'
import { store } from '../store/store.js'
import { SET_FILTER } from './filter.reducer.js'

const BASE_URL='/s'
// Action Creators:



export function onSelectedFilter (filter){
    
    // const navigate = useNavigate()

    console.log('filter', filter)
    const queryParams = 
    `?where=${filter.where}&checkIn=${filter.checkIn}&checkOut=${filter.checkOut}&adults=${filter.guests.adults}&adults=${filter.guests.children}`
    
    // navigate('/s')
    // store.dispatch({
    //     type: SET_FILTER,
    //     filter
    // })
}