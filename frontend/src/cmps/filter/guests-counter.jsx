// 
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'


export function GuestsCounter({filter,onCountChange ,parentCmp}){

    
    return(
        <div className="guests-modal-open">
        <div className="guest">
            <div className="guest-category">
                <h3>Adult</h3>
                <h5>Ages 13 or above</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" disabled={ filter.adults===1} onClick={() => onCountChange('adults', -1)}><AiOutlineMinus/></button>
                {filter.adults}
                <button className="btn-counter" onClick={() => onCountChange('adults', 1)}><AiOutlinePlus/></button>
            </div>
        </div>
        <div className="guest">
            <div className="guest-category">
                <h3>Children</h3>
                <h5>Ages 2–12</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" disabled={!filter.children} onClick={() => onCountChange('children', -1)}><AiOutlineMinus/></button>
                {filter.children}
                <button className="btn-counter" onClick={() => onCountChange('children', 1)}><AiOutlinePlus/></button>
            </div>
        </div>
        <div className="guest">
            <div className="guest-category">
                <h3>Infants</h3>
                <h5>Under 2</h5>
            </div>
            <div className="counter">
                <button className="btn-counter"  disabled={!filter.infants} onClick={() => onCountChange('infants', -1)}><AiOutlineMinus/></button>
                {filter.infants}
                <button className="btn-counter" onClick={() => onCountChange('infants', 1)}><AiOutlinePlus/></button>
            </div>
        </div>
        <div className="guest">
            <div className="guest-category">
                <h3>Pets</h3>
                <h5>Bringing a service animal?</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" disabled={!filter.pets} onClick={() => onCountChange('pets', -1)}><AiOutlineMinus/></button>
                {filter.pets}
                <button className="btn-counter" onClick={() => onCountChange('pets', 1)}><AiOutlinePlus/></button>
            </div>
        </div>
    </div>
    )
        
}