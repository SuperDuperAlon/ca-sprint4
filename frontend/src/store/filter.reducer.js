export const SET_CHECK_IN_DATE = 'SET_CHECK_IN_DATE'
export const CHANGE_GUEST_ADULTS = 'CHANGE_GUEST_ADULTS'
export const SET_FILTER = 'SET_FILTER'
export const SET_CHECK_OUT_DATE = 'SET_CHECK_OUT_DATE'

const initialState = {
    filter:{
    checkIn:null,
    checkOut:null,
    where:"",
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
   
    switch (action.type) {
        case SET_FILTER:
            newState = { ...state, filter: action.filter }
            break
        // case SET_CHECK_IN_DATE:
        //     newState = { ...state, filter: {...state.filter, checkIn:action.date} }
        //     break
        // case SET_CHECK_OUT_DATE:
        //     newState = { ...state, filter: {...state.filter, checkOut:action.date} }
        //     break
        

    // guest
        // case CHANGE_GUEST_ADULTS:           
        // filter={...state.filter ,guests:{...state.filter.guests, adults:"1"}}
        // console.log('filter:', filter)
        //    newState = { ...state,  filter: {...state.filter.guests.adults, ...state.filter.guests.adults+=action.change}}
        //    break


    // default:
    }
    return newState
}