import { useEffect, useRef, useState } from "react"
import { WhereTo } from "./where-to"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { SetSearchParams } from "./set-search-params"
import { filterService } from "../../services/filterService"
import { reginIcons } from '../../assets/import src/reginImg.js'


import { FiSearch } from 'react-icons/fi'
import { BsClock } from 'react-icons/bs'
import { useNavigate } from "react-router"

export function SearchBar() {
    const [activeNow, setActiveNow] = useState(null)
    const [filter, setFilter] = useState(filterService.getEmptyFilter())
    const navigate = useNavigate()


    // console.log('filter:', filter)
    const onChange = (dates) => {
        const checkIn = dates[0]
        const checkOut = dates[1]
        setFilter({ ...filter, checkOut, checkIn })
    }

    const handleChange = ev => {
        const field = ev.target.name
        const value = ev.target.value
        setFilter({ ...filter, [field]: value })
    }
    function rsOption(option) {
        switch (option) {
            case "location":
                setFilter({...filter, where:''})
                break
            case "checkIn":
                setFilter({...filter, checkIn : null})
                break
            case "checkOut":
                setFilter({...filter, checkOut : null})
                break

        }
    }

    function onCountChange(field, diff) {
        const prevGuests = { ...filter.guests, ...filter.guests[field] = filter.guests[field] + diff }
        setFilter({ ...filter, prevGuests })
    }

    function queryToParams(event, labels=null){
        event.preventDefault()
        
        const checkOut=filterService.getDateToFilter(filter.checkOut)
        const checkIn=filterService.getDateToFilter(filter.checkIn)
    
        const queryParams = 
        `where=${filter.where}&checkIn=${checkIn}&checkOut=${checkOut}`
        // &adults=${guests.adults}&children=${guests.children}`

        console.log('queryParams:', queryParams)
    
        navigate(`/${queryParams}`)
    }


    return (
        <div className="search">
            <div className="flex align-center search-bar">
                <div className="location" onClick={() => setActiveNow('location')}>
                    <div className="bar-input" >
                        <label htmlFor="where">Where</label>
                        <input
                            type="text"
                            name="where"
                            id="where"
                            value={filter.where}
                            placeholder="Search destinations"
                            onChange={handleChange}
                        />
                    </div>
                    {<button className="btn-rs"></button>}
                </div>
                <div className="checkDate">
                    <div className="checkIn" onClick={() => setActiveNow('checkIn')} >
                        <div className="bar-input">
                            <label htmlFor="checkIn">Check in</label>
                            <input type='text' name="checkIn" id='checkIn' value={filterService.showChosenDate(filter.checkIn)} placeholder="Add dates" />
                        </div>
                        <button className="btn-rs" onClick={() => rsOption("checkIn")}></button>
                    </div>
                    <div className="checkOut" onClick={() => setActiveNow('checkOut')}>
                        <div className="bar-input">
                            <label htmlFor="checkOut">Check out</label>
                            <input type='text' name="checkOut" id='checkOut' value={filterService.showChosenDate(filter.checkOut)} placeholder="Add dates" />
                        </div>
                        <button className={"btn-rs"} onClick={() => rsOption("checkOut")}></button>
                    </div>

                </div>
                <div className="guests" onClick={() => setActiveNow('guests')}>
                    <div className="bar-input">
                        <label htmlFor="guest">How</label>
                        <input type='text' name='guest' id='guest' placeholder="Add guests" />
                    </div>
                    <button className="btn-rs"></button>
                    <div className={activeNow ? 'active searchIcon' : 'searchIcon'} onClick={queryToParams}>
                        <div className="icon">
                            <FiSearch />
                        </div>
                    </div>
                </div>

            </div>
            {activeNow && < div className="search-modal">
                {(activeNow === 'checkIn' || activeNow === 'checkOut') &&
                    (<div className="dayPickerModel">
                        <div className="dateOptions">

                        </div>
                        <DatePicker
                            selected={filter.checkIn}
                            onChange={onChange}
                            startDate={filter.checkIn}
                            endDate={filter.checkOut}
                            monthsShown={2}
                            selectsRange
                            open={true}
                            inline
                            className="dayPicker"
                        // inline
                        />
                    </div>)}
                {(activeNow === 'location' && !filter?.where) && <div className="whereModel">
                    <div className="showRecentSearch">
                        <h1>Recent searches</h1>
                        <div className="recentSearchList">
                            <div className="lastSearch">
                                {/* <div className="roundClock">
                                    <BsClock/>
                                </div> */}
                                <div className="searchDetails">
                                    <p>Italy <span className="how"> Stay</span></p>
                                    <div className="timeOf">
                                        Feb 13-15
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="searchByRegion">
                        <h1>Search by region</h1>
                        <div className="regionOptions">
                            <div className="reginImg"
                            // onClick={addSearchLabel("I’m flexible")}
                            >
                                <img alt="I’m flexible" src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg" />
                                <h3>I’m flexible</h3>
                            </div>
                            <div className="reginImg">
                                <img alt="Middle East" src="https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320" />
                                <h3>Middle East</h3>
                            </div>
                            <div className="reginImg">
                                <img alt="Italy" src="https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320" />
                                <h3>Italy</h3>
                            </div>

                            <div className="reginImg">
                                <img alt="United States" src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320" />
                                <h3>United States</h3>
                            </div>
                            <div className="reginImg">
                                <img alt="France" src="https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320" />
                                <h3>France</h3>
                            </div>
                            <div className="reginImg">
                                <img alt="Africa" src="https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320" />
                                <h3>Africa</h3>
                            </div>
                        </div>
                    </div>
                    {(activeNow === 'location' && !!filter.where) &&
                        <div className="filterByName">

                        </div>
                    }
                </div>}

                {activeNow === 'guests' &&
                    <div className="guestsAddingModal">
                        <div className="guestsModalOpen">
                            <div className="guest">
                                <div className="guestCategory">
                                    <h3>Adult</h3>
                                    <h5>Ages 13 or above</h5>
                                </div>
                                <div className="counter">
                                    <button className="btu-counter" onClick={() => onCountChange('adults', -1)}>-</button>
                                    {filter.guests.adults}
                                    <button className="btu-counter" onClick={() => onCountChange('adults', 1)}>+</button>
                                </div>
                            </div>
                            <div className="guest">
                                <div className="guestCategory">
                                    <h3>Children</h3>
                                    <h5>Ages 2–12</h5>
                                </div>
                                <div className="counter">
                                    <button className="btu-counter" onClick={() => onCountChange('children', -1)}>-</button>
                                    {filter.guests.children}
                                    <button className="btu-counter" onClick={() => onCountChange('children', 1)}>+</button>
                                </div>
                            </div>
                            <div className="guest">
                                <div className="guestCategory">
                                    <h3>Infants</h3>
                                    <h5>Under 2</h5>
                                </div>
                                <div className="counter">
                                    <button className="btu-counter" onClick={() => onCountChange('infants', -1)}>-</button>
                                    {filter.guests.infants}
                                    <button className="btu-counter" onClick={() => onCountChange('infants', 1)}>+</button>
                                </div>
                            </div>
                            <div className="guest">
                                <div className="guestCategory">
                                    <h3>Pets</h3>
                                    <h5>Bringing a service animal?</h5>
                                </div>
                                <div className="counter">
                                    <button className="btu-counter" onClick={() => onCountChange('pets', -1)}>-</button>
                                    {filter.guests.pets}
                                    <button className="btu-counter" onClick={() => onCountChange('pets', 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>}
            <SetSearchParams/>
        </div>
    )
}
