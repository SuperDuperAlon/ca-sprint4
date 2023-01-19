import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { SET_CHECK_IN_DATE, SET_CHECK_OUT_DATE } from "../store/order.reducer";
import { store } from "../store/store";
// import "react-dates/lib/css/_datepicker.css";


export function Calendar() {
  const [focusedInput, setFocusedInput] = useState();
  const checkIn=useSelector(storeState => storeState.orderModule.checkIn)
    const checkOut=useSelector(storeState => storeState.orderModule.checkOut)
  function setStartDate(date) {
      if  (!!date){
        store.dispatch({
                    type: SET_CHECK_IN_DATE,
                    date})}
  }  
  function setEndDate(date) {
    if  (!!date){
        store.dispatch({
                    type: SET_CHECK_OUT_DATE,
                    date
                })}
  }

  return (
    <div className="App">
      <DateRangePicker
        startDate={checkIn}
        startDateId="start-date"
        endDate={checkOut}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
    </div>
  );
}

   

