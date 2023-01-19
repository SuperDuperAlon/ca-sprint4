
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import * as React from 'react';
import { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calendar() {

  // const [value, setValue] = useState([null, null]);

  // return (
  //   <LocalizationProvider
  //     dateAdapter={AdapterDayjs}
  //     localeText={{ start: 'Check-in', end: 'Check-out' }}
  //   >
  //     <DateRangePicker
  //       value={value}
  //       onChange={(newValue) => {
  //         setValue(newValue);
  //       }}
  //       renderInput={(startProps, endProps) => (
  //         <React.Fragment>
  //           <TextField {...startProps} />
  //           <Box sx={{ mx: 2 }}> to </Box>
  //           <TextField {...endProps} />
  //         </React.Fragment>
  //       )}
  //     />
  //   </LocalizationProvider>
  // );


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
  );
 }




