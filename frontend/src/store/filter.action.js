import { useNavigate } from 'react-router'
import { filterService } from '../services/filterService.js'
import { stayService } from '../services/stay.service.js'
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

export async function searchByKey(text){
  try{
    const stays = await filterService.queryByText(text)
    return stays

  } catch (err) {
        console.log('Cannot load stays')
  }
}
