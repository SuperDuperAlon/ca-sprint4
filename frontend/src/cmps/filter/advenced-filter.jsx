import { useState } from "react"

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Calender } from "./calender";
import { filterService } from "../../services/filterService";

import { onSelectedFilter } from "../../store/filter.action";
import { Link, useNavigate, useParams } from "react-router-dom"
import { store } from "../../store/store";
import { useSelector } from "react-redux";
import { SET_CHECK_IN_DATE } from "../../store/filter.reducer";



export function AdvancedFilter() {

    const [onActive, setOnActive] = useState(false)
    const orderPrefernce=useSelector(storeState => storeState.filterModule.filter)
    const [travelOption, setTravelOption]= useState(filterService.getEmptyFilter)
    const navigate = useNavigate()

   
    function onClickingOption(option) {
        setOnActive(option)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setTravelOption({ ...travelOption, [field]: value })
    }

    function onFilterSubmit(event){
        event.preventDefault()
        onSelectedFilter(travelOption)
        const filter=travelOption
        console.log('getDateToFilter(filter.checkOut):',filterService.getDateToFilter(filter.checkOut) )
        const checkOut=filterService.getDateToFilter(filter.checkOut)
        const checkIn=filterService.getDateToFilter(filter.checkIn)
        const queryParams = 
        `where=${filter.where}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${filter.guests.adults}&children=${filter.guests.children}`
    
        navigate(`/${queryParams}`)
        
        
    }

    return (
        <section className="flex justify-center advanced-filter">
            <main className="search-option-bar">
                <form className="flex" onSubmit={onFilterSubmit}>
                    {/* <div className="where" onClick={() => onClickingOption("where")}> */}
                        
                    <label htmlFor="whereTo">where </label>
                        <input 
                        id='whereTo'
                        name="where"
                        type="text" 
                        placeholder="Search destination" 
                        value={travelOption.where} 
                        onChange={handleChange}
                        onClick={() => onClickingOption("where")}
                        />
                       
                    {/* </div> */}
                    {/* <div className="checkIn" onClick={() => onClickingOption("checkIn")} > */}
                    <Calender 
                    // onChangeDates={onChangeDates}
                    />
                        {/* checkIn  */}
                        {/* {checkIn && showChosenDate(checkIn)} */}
                    {/* </div> */}
                    {/* <div className="checkOut" onClick={() => onClickingOption("checkOut")}>
                        checkOut 
                        { travelOption?._d && showChosenDate(checkOut)}
                    </div> */}
                    <div className="who" onClick={() => onClickingOption("who")}>
                        who
                    </div>
                    <button>fly</button>
                </form>
                {/* <whereToGo onChangeLocation={onChangeLocation}/> */}
                {/* <GuestOption />  */}
            </main>
        </section>
    )
}