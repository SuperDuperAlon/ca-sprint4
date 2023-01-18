import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_GUEST_ADULTS } from '../../store/filter.reducer'
import { store } from '../../store/store.js'


export function GuestOption(){


    const filter = useSelector(storeState => storeState.filterModule.filter)
    // console.log('filter:', filter)
    
    function onChangeAdults(change){
        // console.log('change:', change)
        store.dispatch({ type: CHANGE_GUEST_ADULTS, change })
    }
    


    return <>
        <section className="guest-selection">
            <div className="adult">
                {"adult"}
            <button onClick={()=>onChangeAdults(1)}>+</button>
                {filter.guests.adults}
            <button onClick={()=>{onChangeAdults(-1)}}>-</button>
            </div>

            <div className="children">
                {"children"}
            <button>+</button>
                {/* {filter.guests.children} */}
            <button>-</button>
            </div>

            <div className="infants">
                {'infants'}
            <button>+</button>
                {/* {filter.guests.infants} */}
            <button>-</button>
            </div>
            <div className="pets">
                {"pets"}
            <button>+</button>
                {/* {filter.guests.pets} */}
            <button>-</button>
            </div>

        </section>
    </>
}