
// import { ScrollingCarousel } from "@trendyol-js/react-carousel"
import React, { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { filterService } from "../services/filterService"
import { stayService } from "../services/stay.service"
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { FiFilter } from "react-icons/fi"
import { CgOptions } from "react-icons/cg"

export function SecondaryFilter({onToSearch}){
    const labels = ['Cabins', 'Islands', 'Amazing Pools', 'Ski-in-out', 'Beach', 'Luxe', 'Mansions', 'Amazing Views', 'Boats', 'Tropical', 'Top of the world', 'Countryside', 'OMG', 'Desert', 'Play', 'Trending', 'Vineyards', 'Tiny homes', 'Bed & breakfasts', 'Private rooms','Castles', 'Beachfront', 'Design', 'Iconic cities', 'National parks', 'Off-the-grid']
    const [labelFilter, setLabelFilter] = useState(null)
    const [clickedLabel, setClickedLabel] = useState(null)
    const navigate = useNavigate()
    let { filterBy } = useParams()
    const filterPrams = useRef(filterBy)


    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //   setValue(newValue)
    // }

    
    function onFilter(label){

        setClickedLabel(label)
        
        if (filterBy){
            filterBy= filterService.getParamsToObj(filterBy)
        } else{
            filterBy=filterService.getEmptyFilter()
        }
        filterBy.label=label

        onToSearch(filterBy)


    }
    // flex space-between center
    return <section className="secondary-filter flex ">

<Box sx={ {  width:'' , bgcolor: 'white' , borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
            value={0}
            // onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example">
            <Tab label = {labels.map((label,index)=> <div onClick={()=>onFilter(label)} key={index} className={label === clickedLabel ? "icons-container flex column center clicked-label" :"icons-container flex column center" }>
                    <div className="icons-img"><img src={require(`../assets/img/filter-icons/${label}.jpg`)}/></div>
                    <div className="label">{label}</div>
                </div>)} />

        </Tabs>
        </Box>

        <button className="extra-filters-container fs116 flex-center"><CgOptions/>Filters</button>
        
    </section>
}