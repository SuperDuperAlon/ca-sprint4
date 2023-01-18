import { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export function StayDetailsReservationModal() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

  return (
    <section className="reservation">
      <div className="reservation-modal">
        <div className="reservation-info">
          price review reviews

        </div>
        <div className="App">
      <DateRangePicker
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
    </div>

      </div>
      ₪1,174 night ₪1,174 per night 4.88 · 303 reviews CHECK-IN 3/14/2023
      CHECKOUT 3/17/2023 GUESTS 1 guest Reserve You won't be charged yet ₪1,174
      x 3 nights Show price breakdown ₪3,523 Service fee Show price breakdown
      ₪497 Total ₪4,020
    </section>
  );
}
