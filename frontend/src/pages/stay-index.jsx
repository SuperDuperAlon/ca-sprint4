import { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js'
import { loadStays } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { AppHeader } from '../cmps/app-header.jsx'


export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    // async function onRemoveStay(stayId) {
    //     try {
    //         await removeStay(stayId)
    //         // showSuccessMsg('Car removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove stay')
    //     }
    // }

    // async function onAddStay() {
    //     const stay = stayService.getEmptyStay()
    //     stay.vendor = prompt('Vendor?')
    //     try {
    //         const savedStay = await addStay(stay)
    //         showSuccessMsg(`Stay added (id: ${savedStay._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add stay')
    //     }        
    // }

    // async function onUpdateCar(car) {
    //     const price = +prompt('New price?')
    //     const carToSave = { ...car, price }
    //     try {
    //         const savedCar = await updateCar(carToSave)
    //         showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update car')
    //     }        
    // }

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
            <main>
                {/* <ul className="stay-list">
                    {stays.map(stay =>
                        <li className="stay-preview" key={stay._id}>
                            <img className="stay-img" src={require(`.assets/img/${stay.imgUrls}.jpg`)} />
                            <h4>{stay.loc.city} , {stay.loc.country}</h4>
                            <p>{stay.summary}</p>
                            <p>{stay.beds}</p>
                            <p></p>
                            <div>
                                <button onClick={() => { onRemoveStay(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddCarMsg(car) }}>Add car msg</button>
                            <button className="buy" onClick={() => { onAddToCart(car) }}>Add to cart</button>
                        </li>)
                    }
                </ul> */}
            </main>
        </div>
    )
}