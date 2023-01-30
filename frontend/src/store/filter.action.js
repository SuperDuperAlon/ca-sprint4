import { useNavigate } from 'react-router'
import { filterServiceReq } from '../services/filter.Service.req.js'
import { filterService } from '../services/filterService.js'
import { stayService } from "../services/stay.service"
import { store } from '../store/store.js'
import { SET_FILTER } from './filter.reducer.js'




const BASE_URL='/s'
// Action Creators:

export function putPreferenceOfUser(filter) {
    return { type: SET_FILTER}
  }

export function onSelectedFilter (filter){

    const queryParams = 
    `?where=${filter.where}&checkIn=${filter.checkIn}&checkOut=${filter.checkOut}&adults=${filter.guests.adults}&adults=${filter.guests.children}`

}

export async function searchByKey(text=''){
  if (!text) return
  try{

    const textReturn = await filterServiceReq.queryByText(text)
    return textReturn

  } catch (err) {
        console.log('Cannot load stays')
  }
}
