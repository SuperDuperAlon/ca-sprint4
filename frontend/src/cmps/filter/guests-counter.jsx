export function GuestsCounter({filter,onCountChange}){

    
    return(
        <div className="guests-modal-open">
        <div className="guest">
            <div className="guestCategory">
                <h3>Adult</h3>
                <h5>Ages 13 or above</h5>
            </div>
            <div className="counter">
                <button className="btu-counter" onClick={() => onCountChange('adults', -1)}>-</button>
                {filter.guests.adults}
                <button className="btu-counter" onClick={() => onCountChange('adults', 1)}>+</button>
            </div>
        </div>
        <div className="guest">
            <div className="guestCategory">
                <h3>Children</h3>
                <h5>Ages 2–12</h5>
            </div>
            <div className="counter">
                <button className="btu-counter" onClick={() => onCountChange('children', -1)}>-</button>
                {filter.guests.children}
                <button className="btu-counter" onClick={() => onCountChange('children', 1)}>+</button>
            </div>
        </div>
        <div className="guest">
            <div className="guestCategory">
                <h3>Infants</h3>
                <h5>Under 2</h5>
            </div>
            <div className="counter">
                <button className="btu-counter" onClick={() => onCountChange('infants', -1)}>-</button>
                {filter.guests.infants}
                <button className="btu-counter" onClick={() => onCountChange('infants', 1)}>+</button>
            </div>
        </div>
        <div className="guest">
            <div className="guestCategory">
                <h3>Pets</h3>
                <h5 className="pet">Bringing a service animal?</h5>
            </div>
            <div className="counter">
                <button className="btu-counter" onClick={() => onCountChange('pets', -1)}>-</button>
                {filter.guests.pets}
                <button className="btu-counter" onClick={() => onCountChange('pets', 1)}>+</button>
            </div>
        </div>
    </div>
    )
        
}














