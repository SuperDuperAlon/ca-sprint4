import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function CalendarMain({ filterBy, onChangeDate, num, type }) {
  const [width, setWidth] = useState(window.innerWidth);

  var numOfCalendar;
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  //   if (type==='main-details' && width > 1280) {
  //     console.log(num);
  //     numOfCalendar = 2;
  //   } else if (type==='main-details' && width < 1280) {
  //     numOfCalendar = 1;
  //   }

  if (type === "search-bar") {
    if (width > 850) {
      numOfCalendar = 2;
    } else if (width < 850) {
      numOfCalendar = 1;
    }
  } else {
    numOfCalendar = 2;
  }
//    else if (type === "order-form-details") {
//     if (width > 745) {
//       numOfCalendar = 2;
//     } else if (width < 745) {
//       numOfCalendar = 1;
//     }
//   }

  return (
    <DatePicker
      selected={filterBy.checkIn}
      onChange={onChangeDate}
      startDate={filterBy.checkIn}
      endDate={filterBy.checkOut}
      monthsShown={numOfCalendar}
      selectsRange
      open={true}
      inline
      className="dayPicker"
    />
  );
}
