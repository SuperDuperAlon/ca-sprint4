import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import { useSelector } from "react-redux";
import { SET_CHECK_IN_DATE, SET_CHECK_OUT_DATE } from "../../store/filter.reducer";
import { store } from "../../store/store";

export function Calender({}) {
    const [focusedInput, setFocusedInput] = useState();
    const filter=useSelector(storeState => storeState.filterModule.filter)
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
          startDate={filter.checkIn}
          startDateId="start-date"
          endDate={filter.checkOut}
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


