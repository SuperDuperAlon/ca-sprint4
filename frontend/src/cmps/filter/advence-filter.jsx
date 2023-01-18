import { useState } from "react"

export function AdvenceFilter(){

    const [selectedOption, setSelectedOption]=useState()

    function onClickingOprion(option){
        setSelectedOption(option)
    }


    return(
        <section className="advanceFilter flex justify-center">
            <main className="searchOptionBar">
                <nav className="flex">
                    <div className="where" onClick={()=>onClickingOprion("where")}>
                        where
                    </div>
                    <div className="checkIn" onClick={()=>onClickingOprion("checkIn")}>
                            checkIn
                    </div>
                    <div className="checkOut" onClick={()=>onClickingOprion("checkOut")}>
                            checkOut
                    </div>
                    <div className="who" onClick={()=>onClickingOprion("who")}>
                            who
                    </div>
                </nav>
                <div className="setOptions">
                    show
                </div>
            </main>
        </section>
        )
}