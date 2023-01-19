
import { FiFilter } from "react-icons/fi";

export function SecondaryFilter(){
    const labels = ['Cabins', 'Islands', 'Amazing Pools', 'Ski-in-out', 'Beach', 'Luxe', 'Mansions', 'Amazing Views', 'Boats', 'Tropical', 'Top of the world', 'Countryside', 'OMG', 'Desert']
    
    function onFilter(label){
        

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