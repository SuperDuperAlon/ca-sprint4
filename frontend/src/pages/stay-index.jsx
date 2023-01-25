import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStays, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { AppHeader } from '../cmps/app-header.jsx'
import { StayList } from './stay-list.jsx'
import { SecondaryFilter } from './secondary-filter.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchBar } from '../cmps/filter/search-bar.jsx'
import { filterService } from '../services/filterService.js'
import { store } from '../store/store.js'
import { SEARCH_BAR_OPEN } from '../store/stay.reducer.js'


export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const openSearchBar = useSelector(storeState => storeState.stayModule.searchModalOpen)
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

    function onOpenStay(ev, stay ,filter) {
        ev.stopPropagation()
        const params=queryToParams(filter)
        navigate(`/room/${stay._id}/${params}`)
    }

    function onClickOutSideTheBar(event) {
        console.log('click:')
        event.preventDefault()
        console.log('openSearchBar:', openSearchBar)
        if (!openSearchBar) return
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open: false,
        })

    }

    function onToSearch (filter){
        const params=queryToParams(filter)
        navigate(`/${params}`)
    }
    function queryToParams(filter) {
        filter.checkIn = filterService.getDateToFilter(filter.checkIn)
        filter.checkOut = filterService.getDateToFilter(filter.checkOut)
        const queryParams =
            `where=${filter.where}&checkIn=${filter.checkIn}&checkOut=${filter.checkOut}&label=${filter.label}`
        // &adults=${guests.adults}&children=${guests.children}`    
        return queryParams
    }


    return (
        <div className='index-layout'>
            <div className='app-header index-layout full'>
                <AppHeader queryToParams={queryToParams} stay={false} />
            </div>
            <StayList stays={stays} onRemoveStay={onRemoveStay}
                onEditStay={onEditStay} onOpenStay={onOpenStay}
                onClickOutSideTheBar={onClickOutSideTheBar}
                openSearchBar={openSearchBar}
            />
            {openSearchBar && <div className="black-screen full"
                onClick={onClickOutSideTheBar}
            >
            </div>}
        </div >
    )
}