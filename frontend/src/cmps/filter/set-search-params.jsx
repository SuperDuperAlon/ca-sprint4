import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { filterService } from "../../services/filterService"


export function SetSearchParams({}){

    let checkIn = useSelector(storeState => storeState.orderModule.checkIn)
    let checkOut = useSelector(storeState => storeState.orderModule.checkOut)
    let guests = useSelector(storeState => storeState.orderModule.guests)
    let where = useSelector(storeState => storeState.orderModule.where)

    const navigate = useNavigate()


    function setSearch(event){
        event.preventDefault()


      
        checkOut=filterService.getDateToFilter(checkOut)
        checkIn=filterService.getDateToFilter(checkIn)
        const queryParams = 
        `where=${where}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests.adults}&children=${guests.children}`
    
        navigate(`/${queryParams}`)

    }
    // return (
    //     // <button onClick={setSearch}>fly</button>
    // )
}