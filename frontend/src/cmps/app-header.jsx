import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { GrLanguage } from 'react-icons/gr'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { SiAirbnb } from 'react-icons/si'


import { store } from '../store/store'
import { SEARCH_BAR_OPEN } from '../store/stay.reducer'

export function AppHeader() {
    const navigate = useNavigate()

    const openSearchBar = useSelector(storeState => storeState.stayModule.searchModalOpen)


    function onChangeStaySearchBar(option) {
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open: option,
        })
    }

    return (
        <header className="app-header">
            <main className='main-header'>
                <div className="logo" onClick={()=>navigate('/')}>
                    <h3>anypl<span className="Alogo"><SiAirbnb/></span>ce</h3>
                </div>
                <div className="centerGrid rounded-full">
                    <div className={!openSearchBar ? "whenSearching close" : "whenSearching"}>
                        <p>stay</p>
                    </div>

                    <nav className={!openSearchBar ? 'rounded-full navBarHeader' : " rounded-full navBarHeader close"}>
                        <NavLink key={"anywhere"} onClick={() => onChangeStaySearchBar('location')}>
                            <p>anywhere</p>
                        </NavLink>
                        <NavLink key={"anyWeek"} onClick={() => onChangeStaySearchBar('checkIn')}>
                            <p>any week</p>
                        </NavLink>
                        <NavLink key={"addGuests"} onClick={() => onChangeStaySearchBar('guests')}>
                            <p className="addGuests">add guests</p>
                        </NavLink>

                        <div className='searchIcon'>
                            <FiSearch />
                        </div>
                    </nav>
                </div>

                <div className="users-option ">
                    <div className="switchToHost">
                        <p>switch to hosting</p>
                    </div>
                    <div className="language-option">
                        <GrLanguage />
                    </div>
                    <div className="loginMenu rounded-full">
                        <span className='menu'>
                            <AiOutlineMenu />
                        </span>
                        <span className='person'>
                            <IoPersonCircleSharp />
                        </span>
                    </div>
                </div>
            </main>
        </header>
    )
}