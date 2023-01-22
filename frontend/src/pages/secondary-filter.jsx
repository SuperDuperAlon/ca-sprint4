
// import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { filterService } from "../services/filterService";
import { stayService } from "../services/stay.service";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export function SecondaryFilter(){
    const labels = ['Cabins', 'Islands', 'Amazing Pools', 'Ski-in-out', 'Beach', 'Luxe', 'Mansions', 'Amazing Views', 'Boats', 'Tropical', 'Top of the world', 'Countryside', 'OMG', 'Desert', 'Play', 'Trending', 'Vineyards', 'Tiny homes', 'Bed & breakfasts']
    const [labelFilter, setLabelFilter] = useState(null)
    const [clickedLabel, setClickedLabel] = useState(null)
    const navigate = useNavigate()
    const { filterBy } = useParams()
    const filterPrams = useRef(filterBy)


    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //   setValue(newValue);
    // };

    
    function onFilter(label){
        
        if (filterBy){
            filterBy= filterService.getParamsToObj(filterBy)
        } else{
            filterBy=filterService.getEmptyFilter()
        }
        filterBy.label=label

        filterService.queryToParams(filterBy)


    }
    // flex space-between center
    return <section className="secondary-filter flex center">
        {/* {<div className="arrows">{"<"}</div>}
                {labels.map((label,index)=> <div onClick={()=>onFilter(label)} key={index} className={label === clickedLabel ? "icons-container flex column center clicked-label" :"icons-container flex column center" }>
                    <div className="icons-img"><img src={require(`../assets/img/filter-icons/${label}.jpg`)}/></div>
                    <div className="label">{label}</div>
                </div>)}
        { <div className="arrows">{">"}</div>} */}

<Box sx={ {maxWidth: { xs: 200, sm: '100vw' }, bgcolor: 'white' }}>
        <Tabs
            // value={value}
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

        <button className="extra-filters-container"><FiFilter/> Filters</button>
        
    </section>
}