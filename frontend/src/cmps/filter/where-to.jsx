import { useSelector } from "react-redux";
import { SET_WHERE_TO_LOOK } from "../../store/order.reducer";
import { store } from "../../store/store";

export function WhereTo() {
    const where = useSelector(storeState => storeState.orderModule.where)
    function handleChange(ev) {
        ev.preventDefault()
        const value = ev.target.value
        store.dispatch({
            type:SET_WHERE_TO_LOOK,
            value
          })
    }

    return (
        <section className="search-title">
            {/* <label htmlFor="where">Where</label> */}
            <input 
            type="text" 
            name="where" 
            id="where"
            value={where}
            placeholder="Search destinations"
            onChange={handleChange}
            />
        </section>
    )
}

