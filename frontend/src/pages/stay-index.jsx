import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js'
import { loadStays, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { AppHeader } from '../cmps/app-header.jsx'
import { utilService } from '../services/util.service.js'
import { StayList } from './stay-list.jsx'
import { SecondaryFilter } from './secondary-filter.jsx'
import { OrderPreferences } from '../cmps/order-preferences.jsx'
import { Calendar } from '../cmps/calendar.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { WhereTo } from '../cmps/filter/where-to.jsx'
import { SetSearchParams } from '../cmps/filter/set-search-params.jsx'
import { SearchBar } from '../cmps/filter/search-bar.jsx'
import { filterService } from '../services/filterService.js'


export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const navigate = useNavigate()
    const { filterBy } = useParams()

    useEffect(() => {
        loadStays(filterBy)
        if (!!filterBy?.where === '') { navigate('/') }
    }, [filterBy])

    async function onRemoveStay(ev, stayId) {
        ev.stopPropagation()
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }


    async function onEditStay(ev, stay) {
        ev.stopPropagation()
        navigate(`/stay/edit/${stay._id}`)

    }

    function onOpenStay(ev, stay) {
        ev.stopPropagation()
        navigate(`/room/${stay._id}`)
    }


    function queryToParams(filter) {
        filter.checkIn=filterService.getDateToFilter(filter.checkIn)
        filter.checkOut=filterService.getDateToFilter(filter.checkOut)
        const queryParams =
            `where=${filter.where}&checkIn=${filter.checkIn}&checkOut=${filter.checkOut}&label=${filter.label}`
        // &adults=${guests.adults}&children=${guests.children}`    
        navigate(`/${queryParams}`)
    }


    return (
        <div className='index-layout '>
            <div className="pageTop">
                <AppHeader />
                <SearchBar queryToParams={queryToParams} />
                <SecondaryFilter queryToParams={queryToParams} />
            </div>
            <main className='content'>
                {/* <div className="clickOutSideTheBox">
                </div> */}
                {/* <Link to={`/stay/edit`}>Add stay</Link> */}
                <StayList stays={stays} onRemoveStay={onRemoveStay} onEditStay={onEditStay} onOpenStay={onOpenStay} />
            </main>
        </div >
    )
}