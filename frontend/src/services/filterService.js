export const filterService={
    getEmptyFilter,
    getDateToFilter,
    getParamsToObj,
    showChosenDate,
    getReginImg
}

function  getDateToFilter(date){
    if (!date) return null
    const day=date.getDate()
    const month=date.getMonth()+1
    const year=date.getFullYear()
    return year+'-'+month+'-'+day
}

function getParamsToObj(filterBy) {
    let query = filterBy.split('&').map(x => x.split('=').map(y => y.trim()))
        .reduce((a, x) => {
            
            a[x[0]] = x[1]
            if (a[x[0]]==='null'){
                a[x[0]]=null
            } if ( x[0] === 'adults' || x[0] === 'infants' || x[0] === 'children' || x[0] === 'pets' ){
                a[x[0]] = +a[x[0]]
            }
            else if ((x[0] === 'checkIn' || x[0] === 'checkOut') && a[x[0]]!==null){
                a[x[0]] = new Date(a[x[0]])
                
            }
            return a
        }, {})
        console.log(query);
    return query
}




function getEmptyFilter() {
    return {
        where: '',
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
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return month+' '+day
    }

    function getReginImg(){
        return[
            {
                src:"https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg",
                label:'I’m flexible'
            },
            {
                src:"https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320",
                label:'Middle East'
            },
            {
                src:"https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320",
                label:'Italy'
            },
            {
                src:"https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320",
                label:'United States'
            },
            {
                src:"https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320",
                label:'France'
            },
            {
                src:"https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320",
                label:'Africa'
            }
        ]
    }