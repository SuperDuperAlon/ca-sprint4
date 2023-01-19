import { useState } from "react";
import { Link } from "react-router-dom";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { OrderPrefernces } from "../order-prefernces";
import { reservationService } from "../../services/reservation.service";
import { Calendar } from "../calendar";

export function StayDetailsReservationModal() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();

  console.log(startDate);
  console.log(endDate);

  function addOrder() {
    console.log(startDate, endDate);
  }

  return (
    <section className="order-form">
      <div className="reservation-modal">
        <div className="reservation-info">$200 *4.7 9 -reviews</div>
        <div className="set-dates"></div>
        <div className="set-guests"></div>
        <button onClick={addOrder}>
        Reserve
        {/* <Link to={`/book/stays`}>Reserve</Link> */}
      </button>
      <div className="order-form-pricing"></div>
      <div className="order-form-total-price"></div>
      </div>
      ₪1,174 night ₪1,174 per night 4.88 · 303 reviews CHECK-IN 3/14/2023
      CHECKOUT 3/17/2023 GUESTS 1 guest Reserve You won't be charged yet ₪1,174
      x 3 nights Show price breakdown ₪3,523 Service fee Show price breakdown
      ₪497 Total ₪4,020

      <div className="App">
        <Calendar />
        <OrderPrefernces />
      </div>
    </section>
  );
}
