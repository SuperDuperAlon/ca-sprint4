export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const UNDO_REMOVE_CAR = 'UNDO_REMOVE_CAR'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const initialState = {
    stays: [],
    // cart: [],
    // lastRemovedCar: null
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    var cart
    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break
        case REMOVE_STAY:
            // const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays}
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        // case ADD_TO_CART:
        //     newState = { ...state, cart: [...state.cart, action.car] }
        //     break
        // case REMOVE_FROM_CART:
        //     cart = state.cart.filter(car => car._id !== action.carId)
        //     newState = { ...state, cart }
        //     break
        // case CLEAR_CART:
        //     newState = { ...state, cart: [] }
        //     break
        // case UNDO_REMOVE_CAR:
        //     if (state.lastRemovedCar) {
        //         newState = { ...state, cars: [...state.cars, state.lastRemovedCar], lastRemovedCar: null }
        //     }
        //     break
        // default:
    }
    return newState
}
