import { useState } from "react"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Calender } from "./calender";


export function AdvancedFilter() {

    const [selectedOption, setSelectedOption] = useState(null)

    function onClickingOption(option) {
        setSelectedOption(option)
    }


    return (
        <section className="flex justify-center advanced-filter">
            <main className="search-option-bar">
                <nav className="flex">
                    <div className="where" onClick={() => onClickingOption("where")}>
                        where
                    </div>
                    <div className="checkIn" onClick={() => onClickingOption("checkIn")}>
                        checkIn
                    </div>
                    <div className="checkOut" onClick={() => onClickingOption("checkOut")}>
                        checkOut
                    </div>
                    <div className="who" onClick={() => onClickingOption("who")}>
                        who
                    </div>
                </nav>
                <div className="set-options">
                 <Calender/>
                </div>
            </main>
        </section>
    )
}