import { useState } from "react"

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Calender } from "./calender";
import { filterService } from "../../services/filterServce";

import { GuestOption } from "./guest-option";


export function AdvancedFilter() {

    const [onActive, setOnActive] = useState(false)
    const [travelOption, setTravelOption]= useState(filterService.getEmptyFilter)
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)

    function onClickingOption(option) {
        setOnActive(option)
    }

    function onChangeDates(dateIn, dataOut) {
        if  (!!dateIn){
            setTravelOption({...travelOption , checkIn:dateIn._d})
        }
        if (!!dataOut){
            setTravelOption({...travelOption , checkOut:dataOut._d})
        }
    }

    function showChosenDate(date) {
        const month = date._d.toLocaleString('default', { month: 'short' })
        const day = date._d.getDay()
        return month+' '+day
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setTravelOption({ ...travelOption, [field]: value })
    }

    return (
        <section className="flex justify-center advanced-filter">
            <main className="search-option-bar">
                <nav className="flex">
                    <div className="where" onClick={() => onClickingOption("where")}>
                        where
                        <input 
                        name="where"
                        type="text" 
                        placeholder="Search destination" 
                        value={travelOption.where} 
                        onChange={handleChange}
                        />
                       
                    </div>
                    <div className="checkIn" onClick={() => onClickingOption("checkIn")}>
                        checkIn 
                        {/* {checkIn && showChosenDate(checkIn)} */}
                    </div>
                    <div className="checkOut" onClick={() => onClickingOption("checkOut")}>
                        checkOut 
                        {/* { travelOption?._d && showChosenDate(checkOut)} */}
                    </div>
                    <div className="who" onClick={() => onClickingOption("who")}>
                        who
                    </div>
                </nav>
                <Calender onChangeDates={onChangeDates} />
                {/* <whereToGo onChangeLocation={onChangeLocation}/> */}
                <GuestOption /> 
            </main>
        </section>
    )
}