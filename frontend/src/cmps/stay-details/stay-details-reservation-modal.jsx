import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { OrderPreferences } from "../order-preferences";
import { orderService } from "../../services/order.service";
import { addOrder } from "../../store/order.actions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Calender } from "../filter/calender";
import { filterService } from "../../services/filterService";
import {MdStar} from "react-icons/md";
import {BiChevronDown, BiChevronUp} from "react-icons/bi";
import { GuestsCounter } from "../filter/guests-counter";

export function StayDetailsOrderModal({ stay }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState();
  const [isDateClicked, setIsDateClicked] = useState(false)
  const [isGuestsClicked, setIsGuestsClicked] = useState(false)
  const [filterBy, setFilterBy] = useState(filterService.getEmptyFilter())
  const navigate = useNavigate()

  // let checkIn = useSelector(storeState => storeState.orderModule.checkIn)
  // let checkOut = useSelector(storeState => storeState.orderModule.checkOut)
  // let guests = useSelector(storeState => storeState.orderModule.guests)
  // let where = useSelector(storeState => storeState.orderModule.where)

  // console.log(startDate);
  // console.log(endDate);

  async function onReserve() {

    console.log(filterBy);

    const queryParams = 
        `checkIn=${filterBy.checkIn}&checkOut=${filterBy.checkOut}&adults=${filterBy.guests.adults}&children=${filterBy.guests.children}&infants=${filterBy.guests.infants}&pets=${filterBy.guests.pets}`

    navigate(`/book/stay/${stay._id}/${queryParams}`)

    // console.log("test");
    // try {
    //   await addOrder();
    // } catch (err) {
    //   console.log("there was an error", err);
    // }
  }

  function calculateDays(){
    const days = (new Date(filterBy.checkOut)-new Date(filterBy.checkIn))/(1000 * 60 * 60 * 24)
    return days>1 ? days+ ' nights' : days + ' night'
  }

  function onChangeDate(dates){
        const checkIn = dates[0]
        const checkOut = dates[1]
        if(dates[1]){
            toggleDatePicker()
        }
        setFilterBy({ ...filterBy, checkOut, checkIn })  
  }

  function toggleDatePicker(){
      isDateClicked ? setIsDateClicked(false): setIsDateClicked(true)
  }

  function onCountChange(field, diff) {
    const prevGuests = { ...filterBy.guests, ...filterBy.guests[field] = filterBy.guests[field] + diff }
    setFilterBy({ ...filterBy, prevGuests })
}

  console.log(filterBy);
  if (!stay) return 
  else return (
      <section className="order-form-container">
      <section className="order-form">
        <div className="order-info mar-b24">
          <div className="fs22 fw600">
            ${stay.price} <span className="fs16">night</span>{" "}
          </div>
          <div className="fs14 fw600">
          <MdStar />4.7 ·<button className="sml-review-btn"><Link to={`/review/`}>3 reviews</Link> </button>{" "}
          </div>
        </div>
        <div className="set-dates">
          <div className="order-details-setting mar-b16">
            <button className="order-form-btn up" onClick={toggleDatePicker}>
              <div className="date-container flex column">
                <div className="upp-left-14-600 bold fs9">CHECK-IN</div>
                  <div className="upp-left-14-600 mar-r8">{filterBy.checkIn ? new Date(filterBy.checkIn).toLocaleDateString(): <span className="grey-71">Add date</span>}</div>
              </div>
              <div className="date-container flex column">
                <div className="upp-left-14-600 bold fs9">CHECKOUT</div>
                  <div className="upp-left-14-600">{filterBy.checkOut ? new Date(filterBy.checkOut).toLocaleDateString(): <span className="grey-71">Add date</span>}</div>
              </div>
              
            </button>
            
              {isDateClicked && <div className="day-picker-model"> 
              <Calender filterBy={filterBy} onChangeDate={onChangeDate} />
              </div>}
            <button className="order-form-btn down flex space-between center" onClick={()=>setIsGuestsClicked(!isGuestsClicked)}>
              <div className="date-container flex column guests">
                <div className="upp-left-14-600 bold fs9">GUESTS</div>
                  <div className="upp-left-14-600 fs14 ">
                    {(filterBy?.guests.adults>1 || filterBy?.guests.children>0)? filterBy.guests.adults+ filterBy.guests.children + ' guests' : '1 guest'} 
                    </div>                                       
                                    {/* }
                {filterBy.guests && <div className="upp-left-14-600 bold fs12">{filterBy.guests}</div>} */}
              </div>
                {isGuestsClicked ? <BiChevronUp className="guests-arrow"/> : <BiChevronDown className="guests-arrow"/>}
            </button>
              {isGuestsClicked && <div className="guests-counter-container details-guest"><GuestsCounter filter={filterBy} onCountChange={onCountChange}/></div>}
          </div>
        </div>
        <button
          className="reserve-btn mar-b16"
          onClick={() => {
            onReserve();
          }}
        >
          Reserve
          {/* <Link to={`/book/stays`}>Reserve</Link> */}
        </button>
        <div className="order-form-msg mar-b24">You won't be charged yet</div>
        <div className="order-form-pricing mar-b24">
          <div className="under-line">${stay.price} x {calculateDays()} </div>
          <div>${stay.price * (new Date(filterBy.checkOut)-new Date(filterBy.checkIn))/(1000 * 60 * 60 * 24) }</div>
        </div>
        <div className="order-form-pricing mar-b24">
          <div className="under-line">Service fee</div>
          <div>$12</div>
        </div>
        <div className="order-form-total-price">
          <div>Total</div>
          <div>${stay.price * (new Date(filterBy.checkOut)-new Date(filterBy.checkIn))/(1000 * 60 * 60 * 24)}</div>
        </div>
        <div>
          {/* <OrderPreferences /> */}
        </div>
      </section>
      </section>
    )
}
