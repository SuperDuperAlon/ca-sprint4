import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
export function Calender ({filter, onChangeDate}){

    return(
    <DatePicker
        selected={filter.checkIn}
        onChange={onChangeDate}
        startDate={filter.checkIn}
        endDate={filter.checkOut}
        monthsShown={2}
        selectsRange
        open={true}
        inline
        className="dayPicker"
    // inline
    />

    )
    
}