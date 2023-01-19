import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js'
import { loadStays, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { AppHeader } from '../cmps/app-header.jsx'
import { utilService } from '../services/util.service.js'
import { StayList } from './stay-list.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { OrderPrefernces } from '../cmps/order-prefernces.jsx'
import { Calendar } from '../cmps/calendar.jsx'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const navigate = useNavigate()

    useEffect(() => {
        loadStays()
    }, [])

    async function onRemoveStay(ev, stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')            
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }


    async function onEditStay(stay) {
        navigate(`/stay/edit/${stay._id}`)
        // const price = +prompt('New price?')
        // const carToSave = { ...car, price }
        // try {
        //     const savedCar = await updateCar(carToSave)
        //     showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
        // } catch (err) {
        //     showErrorMsg('Cannot update car')
        // }        
    }

    function onOpenStay(stay){
        navigate(`/room/${stay._id}`)
    }

    // function onAddToCart(car){
    //     console.log(`Adding ${car.vendor} to Cart`)
    //     addToCart(car)
    //     showSuccessMsg('Added to Cart')
    // }

    // function onAddCarMsg(car) {
    //     console.log(`TODO Adding msg to car`)
    // }
    return (
        <div className='index-layout'>
            <AppHeader />
            <OrderPrefernces />
            <Calendar />
            <main>
                <Link to={`/stay/edit`}>Add stay</Link>
                <StayList stays={stays} onRemoveStay={onRemoveStay} onEditStay={onEditStay} onOpenStay={onOpenStay}/>
            </main>
        </div>
    )
}