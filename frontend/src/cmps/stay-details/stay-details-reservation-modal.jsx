import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { OrderPreferences } from "../order-preferences";
import { orderService } from "../../services/order.service";
import { Calendar } from "../calendar";
import { addOrder } from "../../store/order.actions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function StayDetailsOrderModal({ stay }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState();

  // let checkIn = useSelector(storeState => storeState.orderModule.checkIn)
  // let checkOut = useSelector(storeState => storeState.orderModule.checkOut)
  // let guests = useSelector(storeState => storeState.orderModule.guests)
  // let where = useSelector(storeState => storeState.orderModule.where)

  // console.log(startDate);
  // console.log(endDate);

  async function onAddOrder() {
    console.log("test");
    try {
      await addOrder();
    } catch (err) {
      console.log("there was an error", err);
    }
  }

  if (!stay) return ;
  else
    return (
      <section className="order-form-container">
      <section className="order-form">
        <div className="order-info mar-b24">
          <div className="fs22 fw600">
            ${stay.price} <span className="fs16">night</span>{" "}
          </div>
          <div className="fs14 fw600">
            *4.7 ·<button className="sml-review-btn"><Link to={`/review/`}>3 reviews</Link> </button>{" "}
          </div>
        </div>
        <div className="set-dates">
          <div className="order-details-setting mar-b16">
            <button className="order-form-btn up">
              <div className="upp-left-14-600">check-in</div>
              <div className="upp-left-14-600">checkout</div>
            </button>
            <button className="order-form-btn down">
              <div className="upp-left-14-600">guests</div>
            </button>
          </div>
        </div>
        <button
          className="reserve-btn mar-b16"
          onClick={() => {
            onAddOrder();
          }}
        >
          Reserve
          {/* <Link to={`/book/stays`}>Reserve</Link> */}
        </button>
        <div className="order-form-msg mar-b24">You won't be charged yet</div>
        <div className="order-form-pricing mar-b24">
          <div>${stay.price} x 3 nights </div>
          <div>${stay.price * 3}</div>
        </div>
        <div className="order-form-total-price">
          <div>Total</div>
          <div>${stay.price * 3}</div>
        </div>
        <div className="App">
          {/* <Calendar />
          <OrderPreferences /> */}
        </div>
      </section>
      </section>
    );
}
