import { stayService } from "../services/stay.service"
import { userService } from "../services/user.service.js"
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_STAYS, ADD_STAY, REMOVE_STAY, UPDATE_STAY } from "./stay.reducer.js"
import { SET_SCORE } from "./user.reducer.js"

// Action Creators:
export function getActionRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId: stayId
    }
}

export function getActionAddStay(stay) {
    return {
        type: ADD_STAY,
        stay: stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}

export async function loadStays(filter=null) {
    try {
        const stays = await stayService.query(filter)
        store.dispatch({
            type: SET_STAYS,
            stays: stays
        })
        // return stays.slice(currentPage*pageSize,currentPage*pageSize+1)

    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }

}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        console.log('Added stay', savedStay)
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export async function updateStay(stay) {
    try{
        const savedStay = await stayService.save(stay)
        store.dispatch(getActionUpdateStay(savedStay))
        return savedStay
    }catch(err) {
        console.log('Cannot save stay', err)
        throw err
    }
}

// export function addToCart(car) {
//     store.dispatch({
//         type: ADD_TO_CART,
//         car
//     })
// }

// export function removeFromCart(carId) {
//     store.dispatch({
//         type: REMOVE_FROM_CART,
//         carId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_CART })
//         return score
//     } catch (err) {
//         console.log('CarActions: err in checkout', err)
//         throw err
//     }
// }


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveCarOptimistic(carId) {
//     store.dispatch({
//         type: REMOVE_CAR,
//         carId
//     })
//     showSuccessMsg('Car removed')

//     stayService.remove(carId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully')
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove car')
//             console.log('Cannot load cars', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_CAR,
//             })
//         })
// }
