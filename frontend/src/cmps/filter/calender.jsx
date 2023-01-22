import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
export function Calender ({filterBy, onChangeDate}){

    return(
        <DatePicker
            selected={filterBy.checkIn}
            onChange={onChangeDate}
            startDate={filterBy.checkIn}
            endDate={filterBy.checkOut}
            monthsShown={2}
            selectsRange
            open={true}
            inline
            className="dayPicker"
        />
    )
    
}