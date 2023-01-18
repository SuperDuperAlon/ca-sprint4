import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

export function AppHeader() {
    // const user = useSelector(storeState => storeState.userModule.user)

    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch(err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }

    return (
        <header className="app-header">
            <main className='main-header'>

                <div className="logo">
                    AnyWhere
                </div>

                <nav>
                    <NavLink key={"anywhere"}>
                        <p>anywhere</p>
                    </NavLink>
                    <NavLink key={"anyWeek"}>
                        <p>any week</p>
                    </NavLink>
                    <NavLink key={"addguests"}>
                        <p>addguests</p>
                    </NavLink>

                    <div className="serachIcon">
                        <img src="../assets/img/icons/search.png" alt="serach" />
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
                        <span className="material-symbols-outlined">
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