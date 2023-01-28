import { useSelector } from 'react-redux'

import { store } from '../../store/store'
import { SEARCH_BAR_OPEN } from '../../store/stay.reducer'

import { MdClear } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { CalendarMain } from './calendar'
import { useState } from 'react'
import { filterService } from '../../services/filterService'
import { GuestsCounter } from './guest-counter'
import { useParams } from 'react-router-dom'


export function SearchBarToMobile({onToSearch}) {
    const openSearchBar = useSelector(storeState => storeState.stayModule.searchModalOpen)
    const [filter, setFilter] = useState(filterService.getEmptyFilter())
    let { filterBy } = useParams()


    function onChangeDate(dates) {
        const checkIn = dates[0]
        const checkOut = dates[1]
        setFilter({ ...filter, checkOut, checkIn })
    }

    function onChangeStaySearchBar(option) {
        if (!openSearchBar) return
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open: option,
        })
    }

    function onCountChange(field, diff) {
        const prevGuests = { ...filter.guests, ...filter.guests[field] = filter.guests[field] + diff }
        setFilter({ ...filter, prevGuests })
    }

    function onClearFilter(){
        setFilter(filterService.getEmptyFilter())

    }

    function onClickSearch(event) {
        event.preventDefault()
        if (filterBy) {
            filterBy = filterService.getParamsToObj(filterBy)
        } else {
            filterBy = filterService.getEmptyFilter()
        }
        filterBy.checkIn = filter.checkIn
        filterBy.checkOut = filter.checkOut
        filterBy.where = filter.where
        filterBy.guests = filter.guests

        onToSearch(filterBy)
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open: false
        })
    }

    return (<>

        <div className={`search-option-to-mobile full ${!openSearchBar ? 'close-bar' : ''}`}>
            <div className="return-btn" onClick={() => onChangeStaySearchBar(false)}>
                <MdClear />
            </div>

            <div className="search-menu">
                {openSearchBar !== 'location' && <div className="location bar-close"
                    onClick={() => onChangeStaySearchBar('location')}
                >
                    <div className="option">
                        where
                    </div>
                    <div className="option-action">
                        I'm flexible
                    </div>
                </div>}

                {openSearchBar === 'location' && <div className="location bar-open">
                    <div className="title bold fs24">
                        Where to?
                    </div>
                    <div className="search-bar-to-click"
                    >
                        <FiSearch />
                        <div className="text-description bold">
                            Search destinations?
                        </div>
                    </div>
                    <div className="regin-carousel">
                        {/* <Box sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={0}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    aria-label="scrollable auto tabs example"
                                >
                                    <Tab label={reigns.map((reign) =><div key={reign.label} className="regin-in-carousel">
                                        <img src={require(reign.src)} alt={reign.label}/>
                                        <div className="label">{reign.label}</div>
                                    </div>                                
                                    )} />

                                </Tabs>
                            </Box> */}

                    </div>
                </div>}


                {openSearchBar !== 'checkIn' && <div className="when bar-close"
                    onClick={() => onChangeStaySearchBar('checkIn')}
                >
                    <div className="option">
                        When
                    </div>
                    <div className="option-action">
                        Add dates
                    </div>
                </div>}

                {openSearchBar === 'checkIn' && <div className="when bar-open">
                    <div className="title bold fs22">
                        When's your trip?
                    </div>
                    <div className="selection day-picker-modal fs-8">
                        <CalendarMain filterBy={filter} onChangeDate={onChangeDate} num={850} type={'search-bar'} />
                    </div>
                </div>}

                {openSearchBar !== 'guests' && <div className="who bar-close"
                    onClick={() => onChangeStaySearchBar('guests')}

                >
                    <div className="option">
                        Who
                    </div>
                    <div className="option-action">
                        Add guests
                    </div>
                </div>}

                {openSearchBar === 'guests' && <div className="who bar-open"

                >
                    <div className="title bold fs22">
                        Who's coming?
                    </div>
                    <div className="guests-adding-modal">
                        <GuestsCounter filter={filter} onCountChange={onCountChange} parentCmp={'searchBar'} />
                    </div>
                </div>}

            </div>


            <div className="clear-and-search-btn full">

                {openSearchBar !== 'checkIn' && <div className="reset-all">
                    <div className="reset-option" onClick={onClearFilter}>
                        Clear all
                    </div>

                    <div className="search-btn" onClick={onClickSearch}>
                        <FiSearch />
                    </div>
                </div>}

                {openSearchBar === 'checkIn' && <div className="reset-dates">

                    <div className="reset-option">
                        Clear
                    </div>

                    <div className="next-btn" onClick={()=>onChangeStaySearchBar('guests')}>
                            Next
                    </div>

                </div>}


            </div>
        </div>

    </>)
}