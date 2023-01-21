
export const filterService={
    getEmptyFilter,
    getDateToFilter,
    getParamsToObj,
    showChosenDate
}

function  getDateToFilter(date){
    console.log('date:', date)
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
        where: null,
        checkIn: null,
        checkOut: null,
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        }
    }
}
   function showChosenDate(date) {
        if (!date) {return ""}
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return month+' '+day
    }
