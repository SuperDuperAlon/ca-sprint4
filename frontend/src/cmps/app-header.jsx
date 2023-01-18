import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useState } from 'react'

export function AppHeader() {

    const [isStaySerachBarOpen, setIsStaySerachBarOpen]=useState(false)

    useEffect(() => {
        
    }, [isStaySerachBarOpen])

    function onChangeStaySerachBar(option){
        // setIsStaySerachBarOpen=true

    }

    
    return (
        <header className="app-header">
            <main className='main-header'>

                <div className="logo">
                    AnyWhere
                </div>

                <nav>
                    <NavLink key={"anywhere"} onClick={()=>onChangeStaySerachBar('anywhere')}>
                        <p>anywhere</p>
                    </NavLink>
                    <p className="seprertor">|</p>
                    <NavLink key={"anyWeek"} onClick={()=>onChangeStaySerachBar('anyWeek')}>
                        <p>any week</p>
                    </NavLink>
                    <p className="seprertor">|</p>
                    <NavLink key={"addguests"} onClick={()=>onChangeStaySerachBar('addguests')}>
                        <p>add guests</p>
                    </NavLink>

                    <div className="serachIcon">
                        <img src={require("../assets/img/icons/search.png")} alt="serach" />
                    </div>
                </nav>

                <div className="usersOpstion">
                    <div className="switchToHost">
                        <p>switch to hosting</p>
                    </div>
                    <div className="languageOpstion">
                        <span className="material-symbols-outlined">
                            language
                        </span>
                    </div>
                    <div className="loginMenu">
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                        <span className=" img material-symbols-outlined">
                            person
                        </span>

                    </div>
                </div>

                {/* <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav> */}
            </main>
        </header>
    )
}