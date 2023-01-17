import { stayService } from "../services/stay.service";
import { userService } from "../services/user.service.js";
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_STAYS } from "./stay.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
// export function getActionRemoveCar(stayId) {
//     return {
//         type: REMOVE_CAR,
//         carId: stayId
//     }
// }
// export function getActionAddCar(stay) {
//     return {
//         type: ADD_CAR,
//         stay: stay
//     }
// }
// export function getActionUpdateCar(car) {
//     return {
//         type: UPDATE_CAR,
//         car
//     }
// }

export async function loadStays() {
    try {
        const stays = await stayService.query()
        console.log('Stays from DB:', stays)
        store.dispatch({
            type: SET_STAYS,
            stays: stays
        })

    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }

}

// export async function removeCar(carId) {
//     try {
//         await stayService.remove(carId)
//         store.dispatch(getActionRemoveCar(carId))
//     } catch (err) {
//         console.log('Cannot remove car', err)
//         throw err
//     }
// }

// export async function addCar(car) {
//     try {
//         const savedCar = await stayService.save(car)
//         console.log('Added Car', savedCar)
//         store.dispatch(getActionAddCar(savedCar))
//         return savedCar
//     } catch (err) {
//         console.log('Cannot add car', err)
//         throw err
//     }
// }

// export function updateCar(car) {
//     return stayService.save(car)
//         .then(savedCar => {
//             console.log('Updated Car:', savedCar)
//             store.dispatch(getActionUpdateCar(savedCar))
//             return savedCar
//         })
//         .catch(err => {
//             console.log('Cannot save car', err)
//             throw err
//         })
// }

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
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove car')
//             console.log('Cannot load cars', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_CAR,
//             })
//         })
// }
