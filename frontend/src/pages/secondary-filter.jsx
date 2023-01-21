
import { useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { filterService } from "../services/filterService";
import { stayService } from "../services/stay.service";

export function SecondaryFilter({queryToParams}){
    const labels = ['Cabins', 'Islands', 'Amazing Pools', 'Ski-in-out', 'Beach', 'Luxe', 'Mansions', 'Amazing Views', 'Boats', 'Tropical', 'Top of the world', 'Countryside', 'OMG', 'Desert']
    let { filterBy } = useParams()

    
    function onFilter(label){
        
        if (filterBy){
            filterBy= filterService.getParamsToObj(filterBy)
        } else{
            filterBy=filterService.getEmptyFilter()
        }
        filterBy.label=label

        queryToParams(filterBy)


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