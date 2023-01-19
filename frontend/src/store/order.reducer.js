export const COUNT_ADULTS = "COUNT_ADULTS"
export const COUNT_CHILDREN = "COUNT_CHILDREN"
export const COUNT_INFANTS = "COUNT_INFANTS"
export const COUNT_PETS = "COUNT_PETS"
export const CHANGE_COUNT = "CHANGE_COUNT"
export const SET_CHECK_OUT_DATE = "SET_CHECK_OUT_DATE"
export const SET_CHECK_IN_DATE = "SET_CHECK_IN_DATE"
export const SET_WHERE_TO_LOOK = "SET_WHERE_TO_LOOK"

const initialState = 
{
  checkIn: null,
  checkOut: null,
  where: '',
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  },
  count: 1,
}

export function orderReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    // Count Actions
    case COUNT_ADULTS:
      newState = {
        ...state,
        guests: { ...state.guests, adults: state.guests.adults + action.diff },
      }
      break
    case COUNT_CHILDREN:
      newState = {
        ...state,
        guests: {
          ...state.guests,
          children: state.guests.children + action.diff,
        },
      }
      break
    case COUNT_INFANTS:
      newState = {
        ...state,
        guests: {
          ...state.guests,
          infants: state.guests.infants + action.diff,
        },
      }
      break
    case COUNT_PETS:
      newState = {
        ...state,
        guests: { ...state.guests, pets: state.guests.pets + action.diff },
      }
      break
    case CHANGE_COUNT:
      newState = {
        ...state,
        count:
          state.guests.adults +
          state.guests.children +
          state.guests.infants +
          state.guests.pets +
          action.diff,
      }
      break

    // Date Actions
    case SET_CHECK_IN_DATE:
      newState = { ...state, checkIn: action.date }
      console.log(newState)
      break
    case SET_CHECK_OUT_DATE:
      newState = { ...state, checkOut: action.date };
      break;
      
      // Set WHERE
      case SET_WHERE_TO_LOOK:
        newState = { ...state, where: action.value };
        break;
      

    default:
      return state
  }
  return newState
}

// For debug:
// window.userState = newState
// console.log('State:', newState)
