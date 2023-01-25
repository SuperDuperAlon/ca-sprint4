import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
export function CalendarMain ({filterBy, onChangeDate}){

    console.log('filterBy:',filterBy )
    const [width, setWidth] = useState(window.innerWidth)

    let numOfCalendar
    const updateDimensions = () => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    if (width>850){
        numOfCalendar=2
    }else{
        numOfCalendar=1
    }

    return(<DatePicker
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
    )
    
    
}