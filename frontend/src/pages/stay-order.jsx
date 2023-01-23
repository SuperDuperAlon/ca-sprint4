import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { filterService } from "../services/filterService"
import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"
import { SiAirbnb } from 'react-icons/si'

export function StayOrder() {

    const { filterBy, id } = useParams()
    const [orderDetails, setOrderDetails] = useState(filterService.getParamsToObj(filterBy))
    const [stay, setStay] = useState(null)
    const [indexChecked, setIndexChecked] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadStay();
    }, [])

    console.log(stay);
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
            console.log(err);
        }
    }

    function getFullPrice() {
        const { price } = stay
        return price * (new Date(orderDetails.checkOut) - new Date(orderDetails.checkIn)) / (1000 * 60 * 60 * 24)
    }
    function getPriceCalculation(){
        const countDays = (new Date(orderDetails.checkOut) - new Date(orderDetails.checkIn)) / (1000 * 60 * 60 * 24)
        const strCalc = `$${stay.price.toLocaleString()} X ${countDays}`
        return countDays>1 ? strCalc + ' nights' : strCalc + ' night'
    }

    function getReviewsAvg(){
        let sum = 0
        stay.reviews.map(review =>  sum += review.rate)
        return sum/stay.reviews.length
    }

    if (!stay) return <div>loading...</div>
    return <section className="stay-order">
        <header className="header">
            <div className="logo-general" onClick={() => navigate('/')}>
                <h3>anypl<span className="Alogo"><SiAirbnb /></span>ce</h3>
            </div>
        </header>
        <div className="confirm fs32 bold">
            <button className="clean-btn fs32 pad-r32">{'<'}</button>
            Confirm and pay
        </div>
        <div className="main-order">

            <div className="order-details-container">
                <div className="changed-content">
                    <div className="bold mar-b8">This is a rare find.</div>
                    <div>Mega's place is usually booked.</div>
                </div>
                <div>
                    <div className="fs22 bold pad-b24">Your trip</div>
                    <div className="dates-container flex space-between pad-b24">
                        <div><span className="bold">Dates</span>
                            <div className="mar-t8">{utilService.getShortDate(orderDetails.checkIn, orderDetails.checkOut)}</div>
                        </div>
                        <div className="bold under-line">Edit</div>
                    </div>
                    <div className="guests-container flex space-between pad-b24 ">
                        <div><span className="bold">Guests</span>
                            <div className="mar-t8">{getGuests()}</div>
                        </div>
                        <div className="bold under-line">Edit</div>
                    </div>
                    <div className="payment-container mar-b24">
                        <div className="pad-t32 pad-b24 fs22 bold">Choose how to pay</div>
                            <label for="0">
                         <div onClick={()=>setIndexChecked(0)} className={indexChecked === 0 ? `full-pay-option checked` : `full-pay-option`}>
                            <div className="flex space-between bold">
                            <div>Pay in full</div>
                            <div className="flex center">${getFullPrice().toLocaleString()} <input className="radio-btn" id="0" name="payment-plan-option" type="radio" value="0"/></div>
                            </div>
                            <div className="grey-71 mar-t8">Pay the total now and you're all set.</div>
                        </div>
                            </label>
                            <label for="1">
                        <div onClick={()=>setIndexChecked(1)} className={indexChecked === 1 ? `half-pay-option checked` : `half-pay-option`}>
                            <div className="flex space-between bold">
                                <div>Pay part now, part later</div>
                                <div className="flex center">${(getFullPrice() / 2).toLocaleString()} <input className="radio-btn" id="1" name="payment-plan-option" type="radio" value="1"/></div>
                                
                            </div>
                            <div className="grey-71 mar-t8">Pay ${(getFullPrice() / 2).toLocaleString()} now, and the rest will be automatically charged to the same payment method on Sep 27, 2023. No extra fees.</div>
                        </div>
                            </label>
                    </div>

                </div>
                <div className="login-sign-up">
                    <div className="fs22 bold pad-b24">Log in or sign up to book</div>
                    <form>
                    <input className="login-input up"
                            type="text"
                            name="userName"
                            id="userName"
                            // value={filter?.where || ""
                            placeholder="User name"
                                // onChange={handleChange}
                            />
                    <input className="login-input down"
                            type="password"
                            name="password"
                            id="password"
                            // value={filter?.where || ""
                            placeholder="Password"
                                // onChange={handleChange}
                            />
                    <button className="reserve-btn full-width fs16">
                        Reserve
                    </button>
                    </form>
                </div>

            </div>

            <div className="details">
                <div className="details-modal">
                <div className="stay-details">
                    <img src={require(`../assets/img/${stay.imgUrls[0]}.jpg`)} alt=""/>
                    <div>
                        <div className="fs12 grey-71">Entire place</div>
                        <div className="fs14 mar-t4 pad-b24">{stay.name}</div>
                        <div className="fs12">{getReviewsAvg()} ({stay.reviews.length} reviews)</div>
                    </div>
                    </div> 
                    <div>Your booking is protected by 
                        <img src="https://a0.muscache.com/pictures/aircover/aircover-logo/original/56683a2f-f11b-43f6-8af7-a1b3861b2c85.svg"/>
                    </div>  
                    <div className="price-details">
                        Price details
                        <div>
                            <div>{getPriceCalculation()}</div>
                            <div>${getFullPrice().toLocaleString()}</div>
                        </div>
                        <div>
                            <div>Service fee</div>
                            <div>$12</div>
                        </div>
                        <div>
                            <div>Total (USD)</div>
                            <div>${(getFullPrice()+12).toLocaleString()}</div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </section>
}