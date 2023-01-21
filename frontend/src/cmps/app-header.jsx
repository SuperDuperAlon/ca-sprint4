import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useState } from 'react'

import { GrLanguage } from 'react-icons/gr'
import { FiSearch } from 'react-icons/fi'
import { store } from '../store/store'
import { SEARCH_BAR_OPEN } from '../store/stay.reducer'

export function AppHeader() {

    const openSearchBar=useSelector(storeState => storeState.stayModule.searchModalOpen)

    console.log('openSearchBar:',openSearchBar )


    function onChangeStaySearchBar(option) {
        store.dispatch({
            type: SEARCH_BAR_OPEN,
            open:option,
          })
    }

    return (
        <header className="app-header">
            <main className='main-header'>
                <div className="logo">
                    AnyWhere
                </div>

                <div className={!openSearchBar? "whenSearching close": "whenSearching"}>
                    <p>stay</p>
                </div>

                <nav className={!openSearchBar? 'rounded-full navBarHeader': " rounded-full navBarHeader close"}>
                    <NavLink key={"anywhere"} onClick={() => onChangeStaySearchBar('location')}>
                        <p>anywhere</p>
                    </NavLink>
                    <p className="seprertor">|</p>
                    <NavLink key={"anyWeek"} onClick={() => onChangeStaySearchBar('checkIn')}>
                        <p>any week</p>
                    </NavLink>
                    <p className="seprertor">|</p>
                    <NavLink key={"addguests"} onClick={() => onChangeStaySearchBar('guests')}>
                        <p className="addguest">add guests</p>
                    </NavLink>

                    <div className='searchIcon'>
                        <FiSearch />
                    </div>
                </nav>

                <div className="usersOpstion ">
                    <div className="switchToHost">
                        <p>switch to hosting</p>
                    </div>
                    <div className="languageOpstion">
                        <span className="material-symbols-outlined">
                            <GrLanguage />
                        </span>
                    </div>
                    <div className="loginMenu rounded-full">
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                        <span className=" img material-symbols-outlined">
                            person
                        </span>

                    </div>
                </div>
            </main>
        </header>
    )
}