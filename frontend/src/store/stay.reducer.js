export const SET_STAYS = 'SET_STAYS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'
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
        // case REMOVE_CAR:
        //     const lastRemovedCar = state.cars.find(car => car._id === action.carId)
        //     cars = state.cars.filter(car => car._id !== action.carId)
        //     newState = { ...state, cars, lastRemovedCar }
        //     break
        // case ADD_CAR:
        //     newState = { ...state, cars: [...state.cars, action.car] }
        //     break
        // case UPDATE_CAR:
        //     cars = state.cars.map(car => (car._id === action.car._id) ? action.car : car)
        //     newState = { ...state, cars }
        //     break
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
