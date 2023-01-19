import { useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { OrderPreferences } from "../order-preferences";
import { orderService } from "../../services/order.service";
import { Calendar } from "../calendar";
import { addOrder } from "../../store/order.actions";

export function StayDetailsOrderModal() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState();

  // let checkIn = useSelector(storeState => storeState.orderModule.checkIn)
  // let checkOut = useSelector(storeState => storeState.orderModule.checkOut)
  // let guests = useSelector(storeState => storeState.orderModule.guests)
  // let where = useSelector(storeState => storeState.orderModule.where)

  console.log(startDate);
  console.log(endDate);

  async function onAddOrder() {
    console.log('test');
    try {
      await addOrder();
    } catch (err) {
      console.log("there was an error", err);
    }
  }

  return (
    <section className="order-form">
      <div className="order-info">
        <div className="fs22 fw600">$200  <span className="fs14">night</span> </div>
        <div className="fs14"><span className="fw600">*4.7</span> 9 -reviews</div>
      </div>
      <div className="set-dates">
        <div>
          <div>checkin</div>
          <div>date</div>
        </div>

        <div>
          <div>checkout</div>
          <div>date</div>
        </div>
      </div>
      <div className="set-guests">
        <div>
          <div>checkin</div>
          <div>date</div>
        </div>
      </div>
      <button className="reserve-btn" onClick={() => {onAddOrder()}}>
        Reserve
        {/* <Link to={`/book/stays`}>Reserve</Link> */}
      </button>
      <div className="order-form-msg">You won't be charged yet</div>
      <div className="order-form-pricing">
        <div> ₪1,174 x 3 nights </div>
        <div>₪4,020</div>
      </div>
      <div className="order-form-total-price">
        <div>Total</div>
        <div>₪4,020</div>
      </div>
      <div className="App">
        <Calendar />
        <OrderPreferences />
      </div>
    </section>
  );
}
