import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { logout } from '../store/user.actions'

export function LoginSignup({onClickedLogin, isClickedSignUp}) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(isClickedSignUp)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    
    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        }
        catch (err){
            console.log(err)
        }
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        if (!credentials.username) return
        try{
            const loggedInUser = await userService.login(credentials)
            if(loggedInUser){
                onClickedLogin(loggedInUser)
                clearState()
            }
        }
        catch (err){
            console.log(err)
        }
    }

    async function onSignUp(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        try{
            const loggedInUser = await userService.signup(credentials)
            if(loggedInUser){
                onClickedLogin(loggedInUser)
                clearState()
            } 
        } catch (err){
            console.log(err)
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-page">
                 <div className="fs22 bold pad-b24">Log in or sign up to book</div>
                 <div className='flex center pad-b24'>
                        <div className='mar-r4'>{isSignup ? 'Already have an account?' : 'Not a member yet?'}</div>
                        <button onClick={toggleSignup} className='bold under-line clean-btn fs16'>{isSignup ? 'Log in' : 'Sign up'}</button>
                    </div>
                {!isSignup && <form  autoComplete="off" onSubmit={(ev) => onLogin(ev)}>
                    <input className="login-input up"
                        type="text"
                        name="username"
                        id="username"
                        value={credentials.username}
                        placeholder="User name"
                        onChange={handleChange}
                    />
                    <input className="login-input down"
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    
                    <button className="reserve-btn full-width fs16">
                        Continue
                    </button>
                   
                </form>}
                {isSignup && <form  autoComplete="off" className="signup-form" onSubmit={onSignUp}>
                     <input className= "login-input regular"
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                    />
                    <input className= "login-input regular"
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="User name"
                        onChange={handleChange}
                        required
                    />
                    <input className= "login-input regular"
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <ImgUploader onUploaded={onUploaded} />
                    <button className="reserve-btn full-width fs16">Agree and continue</button>
                </form>}
                </div>

    )
}



