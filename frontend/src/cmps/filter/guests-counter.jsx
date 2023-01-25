export function GuestsCounter({filter,onCountChange}){
    return(
        <div className="guests-modal-open">
        <div className="guest">
            <div className="guest-category">
                <h3>Adult</h3>
                <h5>Ages 13 or above</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" onClick={() => onCountChange('adults', -1)}>-</button>
                {filter.guests.adults}
                <button className="btn-counter" onClick={() => onCountChange('adults', 1)}>+</button>
            </div>
        </div>
        <div className="guest">
            <div className="guest-category">
                <h3>Children</h3>
                <h5>Ages 2–12</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" onClick={() => onCountChange('children', -1)}>-</button>
                {filter.guests.children}
                <button className="btn-counter" onClick={() => onCountChange('children', 1)}>+</button>
            </div>
        </div>
        <div className="guest">
            <div className="guest-category">
                <h3>Infants</h3>
                <h5>Under 2</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" onClick={() => onCountChange('infants', -1)}>-</button>
                {filter.guests.infants}
                <button className="btn-counter" onClick={() => onCountChange('infants', 1)}>+</button>
            </div>
        </div>
        <div className="guest">
            <div className="guest-category">
                <h3>Pets</h3>
                <h5 className="pet">Bringing a service animal?</h5>
            </div>
            <div className="counter">
                <button className="btn-counter" onClick={() => onCountChange('pets', -1)}>-</button>
                {filter.guests.pets}
                <button className="btn-counter" onClick={() => onCountChange('pets', 1)}>+</button>
            </div>
        </div>
    </div>
    )   
}














