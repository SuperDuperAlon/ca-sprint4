import {useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { LoginSignup } from "./login-signup"
import { userService } from '../services/user.service'
import { logout } from '../store/user.actions'
import { useNavigate } from 'react-router'

export function LoginMenu({isMenuOpen ,setIsMenuOpen}) {
  const [open, setOpen] = useState(false)
  const [isClickedSignUp, setIsClickedSignUp] = useState(false)
  const [loggedInUser, setIsLoggedInUser] = useState(userService.getLoggedinUser())
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  console.log(open)

  function handleOpen(isSignup){
    
    setOpen(true)
    setIsClickedSignUp(isSignup)
    // setIsMenuOpen(false)
  }

  function onClickedLogin(loggedInUser){
    setOpen(false)
    setIsLoggedInUser(loggedInUser)
  }

  async function onLogOut(){
    try{
        const loggedInUser = await logout()
        setIsLoggedInUser(false)
        
    } catch (err){
        console.log(err)
    }
    
}
 

  return (
    <div className="login-header">
      {/* <button onClick={handleOpen}>Open modal</button> */}
      {!loggedInUser && 
      <section className="login-menu-open"> 
         <div onClick={()=>handleOpen(true)} className="nav-btn border-bottom">Sign up</div>
        <div onClick={()=>handleOpen(false)} className="nav-btn">Log in</div>
     </section>}
      {loggedInUser && <section className="login-menu-open">
         <div className="nav-btn">Wish list</div>
        <div onClick={()=> navigate(`/dashboard/${loggedInUser._id}`)} className="nav-btn border-bottom">Dashboard</div>
        <div onClick={onLogOut} className="nav-btn">Log out</div>
     </section>}

      <Modal 
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='login-sign-up'><LoginSignup onClickedLogin={onClickedLogin} isClickedSignUp={isClickedSignUp}/></div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}