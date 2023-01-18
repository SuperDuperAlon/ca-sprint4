export const SET_CHECK_IN_DATE = 'SET_CHECK_IN_DATE'
export const CHANGE_GUEST_ADULTS = 'CHANGE_GUEST_ADULTS'

const initialState = {
    filter:{
    checkIn:null,
    checkOut:null,
    where:null,
    guests:{
        adults:0,
        children:0,
        infants:0,
        pets:0
    }
    }
}

export function filterReducer(state = initialState, action) {
    var newState = state
    var filter
   
    switch (action.type) {
        case SET_CHECK_IN_DATE:
            newState = { ...state, filter: action.checkIn }
            break

    // guest
        case CHANGE_GUEST_ADULTS:
        //    console.log('CHANGE_GUEST_ADULTS:', action)
        //    console.log('...state.filter.guests.adults:', {...state.filter.guests.adults})
            // filter={...state.filter ,...state.filter:{...state.filter.guests,...state.filter.guests.adults="1"}}
            // console.log('filter:', filter)
        //    newState = { ...state,  filter: {...state.filter.guests.adults, ...state.filter.guests.adults+=action.change}}
           break


    default:
        return state
    }
}