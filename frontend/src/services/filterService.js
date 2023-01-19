
export const filterService={
    getEmptyFilter,
    getDateToFilter,
    getParamsToObj
}

function  getDateToFilter(date){
    const day=date.getDate()
    const month=date.getMonth()+1
    const year=date.getFullYear()
    return day+'_'+month+'_'+year
}

function getParamsToObj(filterBy) {
    let query = filterBy.split('&').map(x => x.split('=').map(y => y.trim()))
        .reduce((a, x) => {
            a[x[0]] = x[1];
            return a;
        }, {});
    return query
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
   function showChosenDate(date) {
        const month = date._d.toLocaleString('default', { month: 'short' })
        const day = date._d.getDay()
        return month+' '+day
    }
