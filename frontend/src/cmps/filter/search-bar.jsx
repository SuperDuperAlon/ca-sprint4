import React, { useEffect, useRef, useState } from "react"
import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
import { filterService } from "../../services/filterService"

import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { Calender } from "./calender"
import { GuestsCounter } from "./guest-counter"
import { store } from "../../store/store"
import { SEARCH_BAR_OPEN } from "../../store/stay.reducer"

import { FiSearch } from 'react-icons/fi'
import { BsClock } from 'react-icons/bs'
import { MdClear } from 'react-icons/md'

export function SearchBar({ queryToParams }) {
    const [onActiveNow, setActiveNow] = useState(null)
    const [filter, setFilter] = useState(filterService.getEmptyFilter())
    let { filterBy } = useParams()
    const openSearchBar = useSelector(storeState => storeState.stayModule.searchModalOpen)
    const searchInBox = useRef(null);
    useOutsideAlerter(searchInBox)
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActiveNow(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }

        }, [ref]);
    }

    useEffect(() => {
        setActiveNow(openSearchBar)
    }, [openSearchBar])

    function onChangeDate(dates) {
        const checkIn = dates[0]
        const checkOut = dates[1]
        setFilter({ ...filter, checkOut, checkIn })
    }

    const handleChange = ev => {
        const field = ev.target.name
        const value = ev.target.value
        setFilter({ ...filter, [field]: value })
    }

    function resetOption(option) {
        switch (option) {
            case "location":
                console.log('location')
                setFilter({ ...filter, where: '' })
                break
            case "checkIn":
                setFilter({ ...filter, checkIn: null, checkOut: null })
                break
            case "checkOut":
                setFilter({ ...filter, checkOut: null })
                break
            case 'guests':
                let emptyGuest = filterService.getEmptyFilter()
                setFilter({ ...filter, guests: emptyGuest.guests })


        }
    }

    function onCountChange(field, diff) {
        const prevGuests = { ...filter.guests, ...filter.guests[field] = filter.guests[field] + diff }
        setFilter({ ...filter, prevGuests })
    }

    function onClickSearch(event) {
        event.preventDefault()
        setActiveNow(null)
        if (filterBy) {
            filterBy = filterService.getParamsToObj(filterBy)
        } else {
            filterBy = filterService.getEmptyFilter()
        }

        filterBy.checkIn = filter.checkIn
        filterBy.checkOut = filter.checkOut
        filterBy.where = filter.where
        filterBy.guests = filter.guests

        queryToParams(filter)
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open: false,
        })

    }

    return (
        <div className={openSearchBar ? "search" : "search close"}>
            <div className={openSearchBar ? "search-row" : "search-row close"} ref={searchInBox}>

                <div className={`full main-conten search-bar ${onActiveNow ? "bar-active" : ""}`} >
                        <div className={(onActiveNow === 'location') ? "search-active location" : "location"}
                            onClick={() => setActiveNow('location')}>
                            <div className="bar-input" >
                                <label htmlFor="where">Where</label>
                                <input
                                    type="text"
                                    name="where"
                                    id="where"
                                    value={filter?.where || ""}

                                    placeholder="Search destinations"
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                className={((filter.where) && (onActiveNow === 'location')) ? "show-btn btn-rs" : "btn-rs"}
                                onClick={() => resetOption("location")}><MdClear/></button>
                        </div>
                 
                    <div className="check-date">
                        <div
                            className={(onActiveNow === 'checkIn') ? "search-active checkIn" : "checkIn"}
                            onClick={() => setActiveNow('checkIn')} >
                            <div className="bar-input">
                                <label htmlFor="checkIn">Check in</label>
                                <input type='text' name="checkIn" id='checkIn'
                                    value={filterService.showChosenDate(filter.checkIn)}
                                    readOnly={true}
                                    placeholder="Add dates" />
                            </div>
                            <button
                                className={((filter.checkIn) && (onActiveNow === 'checkIn')) ? "show-btn btn-rs" : "btn-rs"}
                                onClick={() => resetOption("checkIn")}><MdClear/></button>
                        </div>
                        <div
                            className={(onActiveNow === 'checkOut') ? "search-active checkOut" : "checkOut"}
                            onClick={() => setActiveNow('checkOut')}>
                            <div className="bar-input">
                                <label htmlFor="checkOut">Check out</label>
                                <input type='text' name="checkOut" id='checkOut'
                                    value={filterService.showChosenDate(filter.checkOut)}
                                    readOnly={true}
                                    placeholder="Add dates" />
                            </div>
                            <button
                                className={((filter.checkOut) && (onActiveNow === 'checkOut')) ? "show-btn btn-rs" : "btn-rs"}
                                onClick={() => resetOption("checkOut")}><MdClear/></button>
                        </div>
                    </div>
                    <div className={(onActiveNow === 'guests') ? "search-active" : null}>
                        <div className={onActiveNow ? "active guests" : "guests "}>
                            <div
                                className="bar-input"
                                onClick={() => setActiveNow('guests')}>
                                <label htmlFor="guests">Who</label>
                                <input type='text' name='guests' id='guests' placeholder="Add guests"
                                    value={filter?.guests.adults > 0 || filter?.guests.children > 0 ?
                                        `Guests: ${filter.guests.adults + filter.guests.children}` :
                                        ''
                                    }
                                    readOnly={true}
                                    onChange={null}

                                />
                            </div>
                            <button
                                className={((filter?.guests.adults > 0) && (onActiveNow === 'guests')) ? "show-btn btn-rs" : "btn-rs"}
                                onClick={() => resetOption("guests")}
                            ><MdClear/></button>

                            <div className={onActiveNow ? 'active search-icon' : 'search-icon'} onClick={onClickSearch}>
                                <div className="icon">
                                    <FiSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="test">
                    <div className="blank"></div>
                </div>

                {onActiveNow && < div className="search-modal">
                    {(onActiveNow === 'checkIn' || onActiveNow === 'checkOut') &&
                        (<div className="day-picker-model fs-8">
                            <div className="dateOptions">

                            </div>
                            <Calender filterBy={filter} onChangeDate={onChangeDate} />
                        </div>)}
                    {(onActiveNow === 'location' && !filter?.where) && <div className="where-model">
                        <div className="show-recent-search">
                            <h1>Recent searches</h1>
                            <div className="recent-search-list ">
                                <div className="lastSearch">
                                    <div className="roundClock">
                                        <BsClock />
                                    </div>
                                    <div className="searchDetails">
                                        <p>Italy <span className="last-searches"> Stay</span></p>
                                        <div className="timeOf">
                                            Feb 13-15
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="search-by-region">
                            <h1>Search by region</h1>
                            <div className="region-options">
                                <div className="reginImg"
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
                        {(onActiveNow === 'location' && !!filter.where) &&
                            <div className="filterByName">

                            </div>
                        }
                    </div>}

                    {onActiveNow === 'guests' &&
                        <div className="guestsAddingModal">
                            <GuestsCounter filter={filter} onCountChange={onCountChange} />
                        </div>
                    }
                </div>}
            </div>
        </div >
    )
}
