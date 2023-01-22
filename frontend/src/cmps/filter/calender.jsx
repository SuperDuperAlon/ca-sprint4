import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
export function Calender ({filterBy, onChangeDate}){

    // const [filterBy, setFilterBy] = useState(filterService.getEmptyFilter())

    // const onChangeDate = (dates) => {
    //     const checkIn = dates[0]
    //     if(dates[0]){
    //         getFilter('checkIn', checkIn)
    //     }
    //     const checkOut = dates[1]
    //     if(dates[1]){
    //         getFilter('checkOut', checkOut)
    //     }
    //     setFilterBy({ ...filterBy, checkOut, checkIn })  
    // }className="dayPickerModel">
    console.log(filterBy);
    return(<DatePicker
            selected={filterBy.checkIn}
            onChange={onChangeDate}
            startDate={filterBy.checkIn}
            endDate={filterBy.checkOut}
            monthsShown={2}
            selectsRange
            open={true}
            // inline
            className="dayPicker"
        // inline
        />
    )
    
}