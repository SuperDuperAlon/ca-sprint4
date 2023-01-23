export const filterService={
    getEmptyFilter,
    getDateToFilter,
    getParamsToObj,
    showChosenDate
}

function  getDateToFilter(date){
    if (!date) return null
    console.log('date:', date)
    const day=date.getDate()
    const month=date.getMonth()+1
    const year=date.getFullYear()
    return year+'-'+month+'-'+day
}

function getParamsToObj(filterBy) {
    let query = filterBy.split('&').map(x => x.split('=').map(y => y.trim()))
        .reduce((a, x) => {
            a[x[0]] = x[1];
            if (a[x[0]]==='null'){
                a[x[0]]=null
            }
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
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        label:null
    }
}
   function showChosenDate(date) {
       if (!date) {return ""}
       date=new Date(date)  
        console.log('date:', date)      
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return month+' '+day
    }
