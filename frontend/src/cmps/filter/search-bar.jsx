import { useState } from "react";
import { Calendar } from "../calendar";
// import { OrderPreferences } from "../order-preferences";
// import { SetSearchParams } from "./set-search-params";
import { WhereTo } from "./where-to";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SetSearchParams } from "./set-search-params";


export function SearchBar() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };
    return (
        // <Calendar />   
        <div className="flex justify-center align-center search-bar">
            <div className="location">
                <p>Where</p>
                <WhereTo />
            </div>
            <div className="check-in">
                <p>Check in</p>
                <DatePicker
                    monthsShown={2}
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    // inline
                    
                />
            </div>
            <div className="guests">
                <p>Guests</p>
                <input type='text' placeholder="Add guests" />
                <span><i className="lni lni-search-alt"></i></span>
                <SetSearchParams />
            </div>
            
        </div>
    )
}


//   return (
//     <div>
//     </div>
//   );
//  }