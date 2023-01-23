import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
        <header className="app-header full main-content ">
            <main className='main-header main-content'>
                <div className="logo" onClick={() => navigate('/')}>
                    <div><span className="a-Logo"><SiAirbnb /></span><span className='text-next-to-logo'>nyplace</span></div>
                </div>

                <div className="center-grid mar-l24 mar-r24">
                   {/* <div className={!openSearchBar ? "whenSearching close" : "whenSearching"}>
                        <p>stay</p>
                    </div> */}

                    <div className={!openSearchBar ? 'rounded-full navBarHeader ' : " rounded-full navBarHeader close"}>
                        <nav className='header-nav long'>
                            <NavLink key={"anywhere"} onClick={() => onChangeStaySearchBar('location')}>
                                anywhere
                            </NavLink>
                            <NavLink key={"anyWeek"} onClick={() => onChangeStaySearchBar('checkIn')}>
                                any week
                            </NavLink>
                            <NavLink key={"addGuests"} onClick={() => onChangeStaySearchBar('guests')}>
                                add guests
                            </NavLink>
                        </nav>


                        <div className='searchIcon'>
                            <FiSearch />
                        </div>
                        <nav className='header-nav short'>
                            <div className="top">
                                <NavLink key={"anywhere"} className="bold" onClick={() => onChangeStaySearchBar('location')}>
                                    anywhere
                                </NavLink>
                            </div>
                            <div className="bottom">
                                <NavLink key={"anyWeek"} onClick={() => onChangeStaySearchBar('checkIn')}>
                                    any week
                                </NavLink>
                                <NavLink key={"addGuests"} onClick={() => onChangeStaySearchBar('guests')}>
                                    add guests
                                </NavLink>
                            </div>
                        </nav>
                        <div className="filterBtn">
                            <SiAirbnb />
                        </div>
                    </div>
                </div>


                <div className="users-option">
                    <div className="header-options-switching-keys mar-r8">
                        <div className="switchToHost">
                            <div className='fs14 lh18 pad-all12 rounded-full bold switch-to-host'>
                                switch to hosting</div>
                        </div>
                        <div className="language-option fs14 pad-all12">
                            <GrLanguage />
                        </div>
                    </div>

                    <div className="login-menu rounded-full">
                        <span className='menu fs-12 lh-20'>
                            <AiOutlineMenu />
                        </span>
                        <span className='person mar-l12 fs12'>
                            <IoPersonCircleSharp />
                        </span>
                    </div>
                </div>

            </main>

        </header>
    )
}