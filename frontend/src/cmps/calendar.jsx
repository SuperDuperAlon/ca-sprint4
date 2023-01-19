
import * as React from 'react';
import { useState } from 'react';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calendar() {
  // const [focusedInput, setFocusedInput] = useState();
  // const checkIn = useSelector((storeState) => storeState.orderModule.checkIn);
  // const checkOut = useSelector((storeState) => storeState.orderModule.checkOut);
  // function setStartDate(date) {
  //   if (!!date) {
  //     store.dispatch({
  //       type: SET_CHECK_IN_DATE,
  //       date,
  //     });
  //   }
  // }
  
  // function setEndDate(date) {
  //   if (!!date) {
  //     store.dispatch({
  //       type: SET_CHECK_OUT_DATE,
  //       date,
  //     });
  //   }
  // }




  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
 
  return (
    <div>
      <DatePicker
        placeholderText="Select Date"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={date => setStartDate(date)}
      />
      <DatePicker
        placeholderText="Select Date"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        onChange={date => setEndDate(date)}
      />
    </div>
  )
 }




