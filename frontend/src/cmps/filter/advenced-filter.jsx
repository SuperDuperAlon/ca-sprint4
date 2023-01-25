import { useState } from "react"
import { CalendarMain } from "./calendar"
import { filterService } from "../../services/filterService"
import { onSelectedFilter } from "../../store/filter.action"
import { Link, useNavigate, useParams } from "react-router-dom"
import { store } from "../../store/store"
import { useSelector } from "react-redux"
import { SET_CHECK_IN_DATE } from "../../store/filter.reducer"

export function AdvancedFilter() {
    const [onActive, setOnActive] = useState(false)
    const orderPreference=useSelector(storeState => storeState.filterModule.filter)
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
            
                    <CalendarMain />

                    <div className="who" onClick={() => onClickingOption("who")}>
                        who
                    </div>
                    <button>fly</button>
                </form>
            </main>
        </section>
    )
}