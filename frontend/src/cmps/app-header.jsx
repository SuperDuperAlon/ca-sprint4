import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { GrLanguage } from 'react-icons/gr'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { SiAirbnb } from 'react-icons/si'

import { store } from '../store/store'
import { SEARCH_BAR_OPEN } from '../store/stay.reducer'
import { SearchBar } from './filter/search-bar'
import { SecondaryFilter } from '../pages/secondary-filter'
import { useState } from 'react'
import { filterService } from '../services/filterService'
import { LoginMenu } from './login-menu'

export function AppHeader({onToSearch, stay ,onClickOutSideTheBar, origin}) {
    const openSearchBar = useSelector(storeState => storeState.stayModule.searchModalOpen)
    const navigate = useNavigate()
    const [isMenuOpen , setIsMenuOpen] = useState(false)

    function onChangeStaySearchBar(option) {
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open: option,
        })
    }

    return (<>
            <main className='main-header'>
                <div className="logo" onClick={() => navigate('/')}>
                    <div><span className="a-Logo"><SiAirbnb /></span><span className='text-next-to-logo'>nyplace</span></div>
                </div>
                {origin!=='dashboard' && <div className={`center-grid ${!openSearchBar? "" : "close"}`}>
                    <div className={!openSearchBar ? 'rounded-full nav-bar-header' : " rounded-full nav-bar-header close"}>
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
                        <div className="title-to-details-page" onClick={() => onChangeStaySearchBar('location')}>
                            Start your search
                        </div>


                        <div className='search-icon'>
                            <FiSearch />
                        </div>
                        <nav className='header-nav short'>
                            <div className="top">
                                <NavLink key={"anywhere"} className="bold" onClick={() => onChangeStaySearchBar('location')}>
                                    Anywhere
                                </NavLink>
                            </div>
                            <div className="bottom">
                                <NavLink key={"anyWeek"} onClick={() => onChangeStaySearchBar('checkIn')}>
                                    Any week
                                </NavLink>
                                <NavLink key={"addGuests"} onClick={() => onChangeStaySearchBar('guests')}>
                                    Add guests
                                </NavLink>
                            </div>
                        </nav>
                        <div className="filter-btn">
                            <SiAirbnb />
                        </div>
                    </div>
                </div>}
                <div className="users-option fs-14">
                    <div className="header-options-switching-keys">
                        <div className="switch-to-host">
                            <div className='fs14 lh18 pad-all12 rounded-full bold switch-to-host'>
                                switch to hosting</div>
                        </div>
                        <div className="language-option fs14 pad-all12">
                            <GrLanguage />
                        </div>
                    </div>

                    <div onClick={()=>setIsMenuOpen(!isMenuOpen)} className="login-menu rounded-full">
                        <span className='menu fs-14 lh-20'>
                            <AiOutlineMenu />
                        </span>
                        <span className='person mar-l12 fs12'>
                            <IoPersonCircleSharp />
                        </span>
                        
                    </div>
                        
                </div>
            </main>
            {isMenuOpen && <LoginMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>}
            <div className='cover-filter full'>
                <div className={openSearchBar? "open": ''}></div>
            </div>
           {!openSearchBar && <div className="line full"></div>}
            <SearchBar onToSearch={onToSearch} onClickOutSideTheBar={onClickOutSideTheBar} />
            {(!stay && origin!=='dashboard') && <SecondaryFilter onToSearch={onToSearch} />}
            
        </>
    )
}