
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'


const STORAGE_KEY = 'stay_db'
_createStays()

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    getEmptyStay
    
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    return storageService.query(STORAGE_KEY)
    // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
    // return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
    // return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
        // savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        // Later, owner is set by the backend
        // stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
        // savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, {txt})
    return savedMsg
}

function getEmptyStay(){
    return{
            _id : '',
            name: '',
            type: '',
            imgUrls: ["s101/0"],
            price: '',
            summary: '',
            capacity: '',
            beds : '',
            menities: [
            ],
            labels: [
            ],
            host: {
            },
            loc: {
                country: '',
                countryCode: '',
                city: '',
                address: '',
                lat: '',
                lng: ''
            },
            reviews: [
            ],
            // "likedByUsers": ['mini-user']
    }
}

function _createStays(){
    let stays = utilService.loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        stays = [
            {
            "_id": "s101",
            "name": "Unikt designat ekologiskt naturhus, off-grid",
            "type": "House",
            "imgUrls": ["s101/0", "../assets/img/s101/1.jpg","../assets/img/s101/2.jpg","../assets/img/s101/3.jpg"],
            "price": 327,
            "summary": "Welcome to the future's house, off-grid with its own energy and food production. One of the world's most environmentally friendly and sustainable houses. Here you can enjoy a wax house garden with Mediterranean plants. On a mountain lake with mile-wide views of Lake Vänern, the house is close to the beach, boat harbor and beautiful nature nearby.",
            "capacity": 8,
            "beds" : 3,
            "amenities": [
                "TV",
                "Wifi",
                "Kitchen",
                "Smoking allowed",
                "Pets allowed",
                "Cooking basics"
            ],
            "labels": [
                "Top of the world",
                "Trending",
                "Play",
                "Tropical"
            ],
            "host": {
                "_id": "u101",
                "fullname": "Davit Pok",
                "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
            },
            "loc": {
                "country": "Sweden",
                "countryCode": "SE",
                "city": "Brålanda",
                "address": "Västra Götalands län",
                "lat": 62,
                "lng": 15
            },
            "reviews": [
                {
                "id": "madeId",
                "txt": "Very helpful hosts. Cooked traditional...",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullname": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
                },
                {
                    "id": "madeId",
                    "txt": "Very nice hostes, wasnt clean",
                    "rate": 3,
                    "by": {
                        "_id": "u102",
                        "fullname": "user2",
                        "imgUrl": "/img/img2.jpg"
                    }
                    }
            ],
            "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            },
            {
            "_id": "s102",
            "name": "Cabane Drommen - L'Arbre à Cabane",
            "type": "House",
            "imgUrls": ["s102/0", "../assets/img/s102/1.jpg","../assets/img/s102/2.jpg","../assets/img/s102/3.jpg"],
            "price": 51,
            "summary": "Discover the magical world of the Drommen hut, unique in France. With 4 levels : the living room, then the toilet, then the bedroom. Guests can dine on the perched terrace.",
            "capacity": 2,
            "amenities": [
                "Free parking on premises",
                "Hair dryer",
                "Private patio or balcony"
            ],
            "labels": [
                "Top of the world",
                "Trending",
                "Play",
                "Tropical"
            ],
            "host": {
                "_id": "u102",
                "fullname": "Dudi Du",
                "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
            },
            "loc": {
                "country": "France",
                "countryCode": "FR",
                "city": "Guyonvelle",
                "address": "Grand Est",
                "lat": 47.855,
                "lng": 5.8
            },
            "reviews": [
                {
                "id": "madeId",
                "txt": "Very helpful hosts. Cooked traditional...",
                "rate": 4,
                "by": {
                    "_id": "u102",
                    "fullname": "user2",
                    "imgUrl": "/img/img2.jpg"
                }
                }
            ],
            "likedByUsers": ['mini-user'] // for user-wishlist : use $in
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}
// function getEmptyStay() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }





