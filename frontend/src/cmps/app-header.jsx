import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useState } from 'react'

import { GrLanguage } from 'react-icons/gr'
import { FiSearch } from 'react-icons/fi'

export function AppHeader() {

    const [isStaySerachBarOpen, setIsStaySerachBarOpen] = useState(false)

    useEffect(() => {

    }, [isStaySerachBarOpen])

    function onChangeStaySerachBar(option) {
        // setIsStaySerachBarOpen=true

    }


    return (
        <header className="app-header">
            <main className='main-header'>

                <div className="logo">
                    AnyWhere
                </div>

                <nav className='rounded-full'>
                    <NavLink key={"anywhere"} onClick={() => onChangeStaySerachBar('anywhere')}>
                        <p>anywhere</p>
                    </NavLink>
                    <p className="seprertor">|</p>
                    <NavLink key={"anyWeek"} onClick={() => onChangeStaySerachBar('anyWeek')}>
                        <p>any week</p>
                    </NavLink>
                    <p className="seprertor">|</p>
                    <NavLink key={"addguests"} onClick={() => onChangeStaySerachBar('addguests')}>
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