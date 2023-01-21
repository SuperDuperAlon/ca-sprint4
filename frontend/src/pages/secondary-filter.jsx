
import { useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { stayService } from "../services/stay.service";

export function SecondaryFilter(){
    const labels = ['Cabins', 'Islands', 'Amazing Pools', 'Ski-in-out', 'Beach', 'Luxe', 'Mansions', 'Amazing Views', 'Boats', 'Tropical', 'Top of the world', 'Countryside', 'OMG', 'Desert']
    const [labelFilter, setLabelFilter] = useState(null)
    const navigate = useNavigate()
    const { filterBy } = useParams()
    const filterPrams = useRef(filterBy)


    function onFilter(label){
        setLabelFilter(label)

        console.log(filterPrams)
        let currFilterParams
        if (filterBy) {
            currFilterParams = filterPrams.current + `&label=${label}`
        }
        else  {
            currFilterParams = `where=''&checkIn=''&checkOut=''&label=${label}`
        }
        // console.log(currFilterParams)
        // console.log(filterByParams)
        navigate(`/${currFilterParams}`)

    }

    return <section className="secondary-filter flex space-between center">
        {<div className="arrows">{"<"}</div>}
        {labels.map(label=> <div onClick={()=>onFilter(label)} className="icons-container flex column center ">
            <div className="icons-img"><img src={require(`../assets/img/filter-icons/${label}.jpg`)}/></div>
            <div className="label">{label}</div>
        </div>)}
        { <div className="arrows">{">"}</div>}
        <button className="extra-filters-container"><FiFilter/> Filters</button>
        
    </section>
}