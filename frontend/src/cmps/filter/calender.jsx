import React, { useEffect, useState } from "react";
// import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";

export function Calender({onChangeDates}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState();
    

    useEffect(()=>{
      onChangeDates(startDate,endDate)
    },[startDate,endDate])

    return (
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
    );
}

   

