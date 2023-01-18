
export const filterService={
    getEmptyFilter,
}

function getEmptyFilter() {
    return {
        where: '',
        checkIn: '',
        checkOut: '',
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        }
    }
}

