import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { filterService } from "../services/filterService"
import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"
import { SiAirbnb } from 'react-icons/si'
import { AiFillStar } from 'react-icons/ai'
import { orderService } from "../services/order.service"
import { addOrder, updateOrder } from "../store/order.actions"
import { LoginSignup } from "../cmps/login-signup"
import { useRef } from "react"
import { userService } from "../services/user.service"
import { logout } from "../store/user.actions"
import { socketService, SOCKET_EVENT_ORDER_APPROVED } from "../services/socket.service"


export function StayOrder() {

    const { filterBy, id } = useParams()
    const [orderDetails, setOrderDetails] = useState(filterService.getParamsToObj(filterBy))
    const [stay, setStay] = useState(null)
    const [indexChecked, setIndexChecked] = useState(0)
    const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
    const [isLoggedInUser, setIsLoggedInUser] = useState(false)
    const [isConfirm, setIsConfirm]  = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const navigate = useNavigate()
    const confirmInterval = useRef(null)

    useEffect(()=>{
        socketService.on(SOCKET_EVENT_ORDER_APPROVED,gotMsg)
    },[])

    useEffect(() => {
        // Clear the interval when the component unmounts
        return () => clearTimeout(confirmInterval.current);
      }, [])

    useEffect(() => {
        loadStay()
        loggedInUser && setIsLoggedInUser(true)
    }, [])

  
    // console.log(loggedInUser)


    // function loadLoggedInUser(){
    //     if (loggedInUser) set(isLoggedInUser) 
    // }

    async function onClickedLogin(loggedInUser) {
        setIsLoggedInUser(true)

        // const order = {
        //     _id: '' ,
        //     hostId: stay.host._id,
        //     buyer: {
        //         _id: loggedInUser._id,
        //         fullname: loggedInUser.fullname
        //     },
        //     totalPrice: getFullPrice(),
        //     startDate: orderDetails.checkIn,
        //     endDate: orderDetails.checkOut,
        //     guests: {
        //         adults: orderDetails.adults,
        //         children: orderDetails.children,
        //         infants: orderDetails.infants,
        //         pets: orderDetails.pets
        //     },
        //     stay: {
        //         _id: stay._id,
        //         name: stay._id.name,
        //         price: stay.price
        //     },
        //     msgs: [],
        //     status: "pending"
        // }
        // console.log(order)

    }

    async function onLogOut(){
        try{
            const loggedInUser = await logout()
            setIsLoggedInUser(false)
            
        } catch (err){
            console.log(err)
        }
    }

    // function onLogin() {
    //     setIsLoggedInUser(true)
    // }

    function getGuests() {
        const totalGuests = `${+orderDetails.adults + +orderDetails.children} guests`
        const pet = orderDetails.pets ? `, ${orderDetails.pets} pets` : ''
        const infants = orderDetails.infants ? `, ${orderDetails.infants} infants` : ''
        // const guestsSum = `${totalGuests} `
        return `${totalGuests}${pet}${infants}`
    }

    async function loadStay() {
        try {
            const stay = await stayService.getById(id)
            setStay(stay)
        } catch (err) {
            console.log(err)
        }
    }

    function getFullPrice() {
        const { price } = stay
        return price * (new Date(orderDetails.checkOut) - new Date(orderDetails.checkIn)) / (1000 * 60 * 60 * 24)
    }
    function getPriceCalculation() {
        const countDays = (new Date(orderDetails.checkOut) - new Date(orderDetails.checkIn)) / (1000 * 60 * 60 * 24)
        const strCalc = `$${stay.price.toLocaleString()} X ${countDays}`
        return countDays > 1 ? strCalc + ' nights' : strCalc + ' night'
    }

    async function confirmOrder(){
        orderToEdit.hostId = stay.host._id
        orderToEdit.totalPrice = getFullPrice()
        orderToEdit.startDate = orderDetails.checkIn
        orderToEdit.endDate = orderDetails.checkOut
        orderToEdit.guests.adults = orderDetails.adults
        orderToEdit.guests.children = orderDetails.children
        orderToEdit.guests.infants = orderDetails.infants
        orderToEdit.guests.pets = orderDetails.pets
        orderToEdit.stay._id = stay._id
        orderToEdit.stay.name = stay.name
        orderToEdit.stay.price = stay.price
        orderToEdit.buyer._id = loggedInUser._id
        orderToEdit.buyer.fullname = loggedInUser.fullname

        // setOrderToEdit(order)

        try {
            if (orderToEdit._id) {
                const savedOrder = await updateOrder(orderToEdit)
            } else {
                const savedOrder = await addOrder(orderToEdit)
                console.log("order saved", savedOrder)
            }
            confirmInterval.current = setTimeout( () => setIsConfirm(true) ,2000) 
        } catch (err) {
            console.log(err)
        }
           
    }

    function gotMsg(){
        console.log('got in dashboard:')
    }

    if (!stay) return <div>loading...</div>
    return <section className="stay-order">
        <header className="header">
            <div className="logo-general" onClick={() => navigate('/')}>
                <h3><span className="airbnb-icon"><SiAirbnb /></span>anyplce</h3>
            </div>
        </header>
        <button onClick={onLogOut}></button> 
        {!isConfirm &&<div className="confirm fs32 bold">
            <button className="clean-btn fs32 pad-r32">{'<'}</button>
            Confirm and pay
            <button disable className="clean-btn fs32 pad-r32"></button>
        </div>}
        {isConfirm && orderToEdit.status=== 'approved' ? <div className="confirm fs32 bold">
            <button onClick={()=>navigate('/')} className="clean-btn fs32 pad-r32">{'<'}</button>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" />
            Reservation success!
        </div> : <div></div>}
        <div className="main-order">

            <div className="order-details-container">
                <div className="changed-content flex space-between">
                    <div>
                        <div className="bold mar-b8">This is a rare find.</div>
                        <div>Mega's place is usually booked.</div>
                    </div>
                    <section className="icon-svg"><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><g stroke="none"><path d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z" fill-opacity=".2"></path><path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path></g></svg></section>
                </div>
                <div>
                    <div className="fs22 bold pad-b24">Your trip</div>
                    <div className="dates-container flex space-between pad-b24">
                        <div><span className="bold">Dates</span>
                            <div className="mar-t8">{utilService.getShortDate(orderDetails.checkIn, orderDetails.checkOut)}</div>
                        </div>
                        <div className="bold under-line">Edit</div>
                    </div>
                    <div className={isLoggedInUser ? "guests-container flex space-between pad-b38 border-bottom" : "guests-container flex space-between pad-b24"}>
                        <div><span className="bold">Guests</span>
                            <div className="mar-t8">{getGuests()}</div>
                        </div>
                        <div className="bold under-line">Edit</div>
                    </div>
                    {/* {isLoggedInUser && <button onClick={confirmOrder} className="reserve-btn full-width fs16 confirm-btn">Confirm</button>} */}
                    {isLoggedInUser && <button onClick={confirmOrder} className="reserve-btn full-width fs16 confirm-btn">{!isConfirm ? <>Confirm</>: <>Pending</>}</button>}
                    {!isLoggedInUser && <div className="payment-container mar-b24">
                        <div className="pad-t32 pad-b24 fs22 bold">Choose how to pay</div>
                        <label htmlFor="0">
                            <div onClick={() => setIndexChecked(0)} className={indexChecked === 0 ? `full-pay-option checked` : `full-pay-option`}>
                                <div className="flex space-between bold">
                                    <div>Pay in full</div>
                                    <div className="flex center">${getFullPrice().toLocaleString()} <input className="radio-btn" id="0" name="payment-plan-option" type="radio" value="0" checked /></div>
                                </div>
                                <div className="grey-71 mar-t8">Pay the total now and you're all set.</div>
                            </div>
                        </label>
                        <label htmlFor="1">
                            <div onClick={() => setIndexChecked(1)} className={indexChecked === 1 ? `half-pay-option checked` : `half-pay-option`}>
                                <div className="flex space-between bold">
                                    <div>Pay part now, part later</div>
                                    <div className="flex center">${(getFullPrice() / 2).toLocaleString()} <input className="radio-btn" id="1" name="payment-plan-option" type="radio" value="1" /></div>

                                </div>
                                <div className="grey-71 mar-t8">Pay ${(getFullPrice() / 2).toLocaleString()} now, and the rest will be automatically charged to the same payment method on Sep 27, 2023. No extra fees.</div>
                            </div>
                        </label>
                    </div>}

                </div>
                {!isLoggedInUser && <div className="login-sign-up">
                    <LoginSignup onClickedLogin={onClickedLogin} />
                </div>}

            </div>

            <div className="details">
                <div className="details-modal">
                    <div className="stay-details">
                        <img src={stay.imgUrls[0]} alt="" />
                        <div>
                            <div className="fs12 grey-71">Entire place</div>
                            <div className="fs14 mar-t4 pad-b24">{stay.name}</div>
                            <div className="fs12 flex center"><AiFillStar /> <div><span className="bold">{stay.reviewsRate}</span> <span className="grey-71">({stay.reviews.length} reviews)</span></div></div>
                        </div>
                    </div>
                    <div className="protection">Your booking is protected by
                        <img src="https://a0.muscache.com/pictures/aircover/aircover-logo/original/56683a2f-f11b-43f6-8af7-a1b3861b2c85.svg" />
                    </div>
                    <div className="price-details">
                        <div className="bold pad-b24 pad-t24 fs22">Price details</div>
                        <div className="flex space-between pad-b16">
                            <div>{getPriceCalculation()}</div>
                            <div>${getFullPrice().toLocaleString()}</div>
                        </div>
                        <div className="flex space-between pad-b24 border-bottom">
                            <div className="under-line">Service fee</div>
                            <div>$12</div>
                        </div>
                        <div className="flex space-between pad-t16 bold last-div">
                            <div>Total (USD)</div>
                            <div>${(getFullPrice() + 12).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}