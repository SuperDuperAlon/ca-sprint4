// import { storageService } from './async-storage.service.js'
import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"
import { storageService } from "./async-storage.service.js"
import { filterService } from "./filterService.js"
import { stayData } from "./stay.data.js"
// import { filterService } from "./filterService.js"
import axios from "axios"

const STORAGE_KEY = "stay_db"
const BASE_URL = "stay/"
// _createStays()

export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
  getEmptyStay,
  setDefaultLabelFilter,
  getListings,
}
window.cs = stayService;

async function getListings(hostId) {
  try {
    let data = await storageService.query(STORAGE_KEY);

    const regex = new RegExp(hostId, "i");
    data = data.filter((listing) => regex.test(listing.host._id));
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function query(filterBy) {
  const queryParams = `?where=${filterBy.where}`;
  const stays = await httpService.get(BASE_URL + queryParams);
  // console.log(stays);
  return stays

  // let data= await storageService.query(STORAGE_KEY)
  // let data = await httpService.get(STORAGE_KEY, filterBy)
  // console.log(data);
  // if (!filterBy) return data.slice(0,30)
  // filterBy=filterService.getParamsToObj(filterBy)
  //   if (filterBy?.where)
  //       {
  //           const regex = new RegExp(filterBy.where, 'i')
  //           data = data.filter(place => regex.test(place.loc.country) || regex.test(place.loc.city)
  //           || regex.test(place.loc.address)
  //           )

  //       }
  //   if (filterBy?.label)
  //       {
  //           const regex = new RegExp(filterBy.label, 'i')
  //           data = data.filter(place => regex.test(place.labels))
  //       }
  //   if (filterBy?.guests)
  //       {
  //           data = data.filter(place => place.capacity>=filterBy.guests)
  //       }
  //   return data.slice(0,30)

  // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stayId) {
  // return storageService.get(STORAGE_KEY, stayId)
  return httpService.get(`stay/${stayId}`);
}

async function remove(stayId) {
  // await storageService.remove(STORAGE_KEY, stayId)
  return httpService.delete(`stay/${stayId}`);
}
async function save(stay) {
  var savedStay
  if (stay._id) {
    // savedStay = await storageService.put(STORAGE_KEY, stay)
    savedStay = await httpService.put(`stay/${stay._id}`, stay);
  } else {
    // Later, owner is set by the backend
    // stay.owner = userService.getLoggedinUser()
    // savedStay = await storageService.post(STORAGE_KEY, stay)
    savedStay = await httpService.post("stay", stay);
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt });
  return savedMsg
}

// function trySomething(){
//     console.log(utilService.getRandomIntInclusive(4,5).toFixed(2))
// }

function setDefaultLabelFilter() {
  return { label: "" }
}

function getEmptyStay() {
  return {
    name: "",
    type: "",
    imgUrls: ["s101/0"],
    price: "",
    summary: "",
    capacity: "",
    beds: "",
    menities: [],
    labels: [],
    host: {},
    loc: {
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: "",
      lng: "",
    },
    reviews: [],
    // "likedByUsers": ['mini-user']
  }
}

function _createStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY);
  if (!stays || !stays.length) {
    stays = stayData.getStayData();

    //     stays = [
    //       {
    //       "_id": "s101",
    //       "name": "Unikt designat ekologiskt naturhus, off-grid",
    //       "type": "House",
    //       "imgUrls": ["s101/0", "s101/1","s101/2","s101/3", "s101/4"],
    //       "price": 327,
    //       "summary": "Welcome to the future's house, off-grid with its own energy and food production. One of the world's most environmentally friendly and sustainable houses. Here you can enjoy a wax house garden with Mediterranean plants. On a mountain lake with mile-wide views of Lake Vänern, the house is close to the beach, boat harbor and beautiful nature nearby.",
    //       "capacity": 8,
    //       "beds" : 3,
    //       "amenities": [
    //           "TV",
    //           "Wifi",
    //           "Kitchen",
    //           "Smoking allowed",
    //           "Pets allowed",
    //           "Cooking basics"
    //       ],
    //       "labels": [
    //           "Top of the world",
    //           "Trending",
    //           "Play",
    //           "Tropical"
    //       ],
    //       "host": {
    //           "_id": "u101",
    //           "fullname": "Davit Pok",
    //           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    //       },
    //       "loc": {
    //           "country": "Sweden",
    //           "countryCode": "SE",
    //           "city": "Brålanda",
    //           "address": "Västra Götalands län",
    //           "lat": 62,
    //           "lng": 15
    //       },
    //       "reviews": [
    //           {
    //           "id": "madeId",
    //           "txt": "Very helpful hosts. Cooked traditional...",
    //           "rate": 4,
    //           "by": {
    //               "_id": "u102",
    //               "fullname": "user2",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           },
    //           {
    //               "id": "madeId",
    //               "txt": "Very nice hostes, wasnt clean",
    //               "rate": 3,
    //               "by": {
    //                   "_id": "u102",
    //                   "fullname": "user2",
    //                   "imgUrl": "/img/img2.jpg"
    //               }
    //               }
    //       ],
    //       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    //       },
    //       {
    //       "_id": "s102",
    //       "name": "Cabane Drommen - L'Arbre à Cabane",
    //       "type": "House",
    //       "imgUrls": ["s102/0", "s102/1","s102/2","s102/3", "s102/4"],
    //       "price": 51,
    //       "summary": "Discover the magical world of the Drommen hut, unique in France. With 4 levels : the living room, then the toilet, then the bedroom. Guests can dine on the perched terrace.",
    //       "capacity": 2,
    //       "amenities": [
    //           "Free parking on premises",
    //           "Hair dryer",
    //           "Private patio or balcony"
    //       ],
    //       "labels": [
    //           "Top of the world",
    //           "Trending",
    //           "Play",
    //           "Tropical"
    //       ],
    //       "host": {
    //           "_id": "u102",
    //           "fullname": "Dudi Du",
    //           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    //       },
    //       "loc": {
    //           "country": "France",
    //           "countryCode": "FR",
    //           "city": "Guyonvelle",
    //           "address": "Grand Est",
    //           "lat": 47.855,
    //           "lng": 5.8
    //       },
    //       "reviews": [
    //           {
    //           "id": "madeId",
    //           "txt": "Very helpful hosts. Cooked traditional...",
    //           "rate": 4,
    //           "by": {
    //               "_id": "u102",
    //               "fullname": "user2",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           }
    //       ],
    //       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    //       },
    //       {
    //       "_id": "s103",
    //       "name": "Wonderful villa surrounded by sea on three sides",
    //       "type": "House",
    //       "imgUrls": ["s103/0", "s103/1","s103/2","s103/3","s103/4"],
    //       "price": 1842,
    //       "summary": "Located in the Limanagzi region of Kaş, which is very rare in the world, our villa, which is surrounded by the sea, has 4 bedrooms, a private pool, a private chef and a waiter. In our villa, which is not on the road, our private captain boat is available 24 hours a day to bring our guests to and from Kaş. Our guests are included in the prices. Our chef and waiter will prepare and serve you only when you receive your food and drinks",
    //       "capacity": 8,
    //       "amenities": [
    //           "Dedicated workspace",
    //           "Pets allowed",
    //           "Private pool",
    //           "HDTV with Netflix"
    //       ],
    //       "labels": [
    //           "Amazing Pools",
    //           "Trending",
    //           "Beach"
    //       ],
    //       "host": {
    //           "_id": "u104",
    //           "fullname": "Mehmet Muhammed",
    //           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    //       },
    //       "loc": {
    //           "country": "Turkey",
    //           "countryCode": "TR",
    //           "city": "Antalya",
    //           "address": "Bayındır",
    //           "lat": 38.9637,
    //           "lng": 35.2433
    //       },
    //       "reviews": [
    //           {
    //           "id": "madeId",
    //           "txt": "A nice, clean house. Great people",
    //           "rate": 4,
    //           "by": {
    //               "_id": "u102",
    //               "fullname": "Dudi Du",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           },
    //           {
    //           "id": "madeId",
    //           "txt": "Poorly cleaned, not many facilities",
    //           "rate": 2,
    //           "by": {
    //               "_id": "u105",
    //               "fullname": "Dumbledore",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           }
    //       ],
    //       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    //       },
    //       {
    //       "_id": "s104",
    //       "name": "Exclusive & Private Island Resort: Floral Island",
    //       "type": "Resort",
    //       "imgUrls": ["s104/0", "s104/1","s104/2","s104/3","s104/4"],
    //       "price": 771,
    //       "summary": "Located in the Limanagzi region of Kaş, which is very rare in the world, our villa, which is surrounded by the sea, has 4 bedrooms, a private pool, a private chef and a waiter. In our villa, which is not on the road, our private captain boat is available 24 hours a day to bring our guests to and from Kaş. Our guests are included in the prices. Our chef and waiter will prepare and serve you only when you receive your food and drinks",
    //       "capacity": 16,
    //       "amenities": [
    //           "Bay view",
    //           "Beach access – Beachfront",
    //           "Wifi",
    //           "Kitchen"
    //       ],
    //       "labels": [
    //           "Amazing Pools",
    //           "Amazing views",
    //           "Beach",
    //           "Beachfront"
    //       ],
    //       "host": {
    //           "_id": "u105",
    //           "fullname": "Philipe",
    //           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    //       },
    //       "loc": {
    //           "country": "Philippines",
    //           "countryCode": "PH",
    //           "city": "El Nido",
    //           "address": "MIMAROPA",
    //           "lat":  14.599512,
    //           "lng": 121.262634
    //       },
    //       "reviews": [
    //           {
    //           "id": "madeId",
    //           "txt": "A nice, clean house. Great people",
    //           "rate": 4,
    //           "by": {
    //               "_id": "u102",
    //               "fullname": "Dudi Du",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           },
    //           {
    //           "id": "madeId",
    //           "txt": "Poorly cleaned, not many facilities",
    //           "rate": 2,
    //           "by": {
    //               "_id": "u105",
    //               "fullname": "Dumbledore",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           }
    //       ],
    //       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    //       },
    //       {
    //       "_id": "s105",
    //       "name": "EInvisible House Joshua Tree | Modern Masterpiece",
    //       "type": "House",
    //       "imgUrls": ["s105/0", "s105/1","s105/2","s105/3","s105/4"],
    //       "price": 771,
    //       "summary": "Welcome to Invisible House. Re-launched in November 2022 as a joint venture with Fieldtrip Hospitality. Imagine a piece of modern art…one of the most spectacular homes in the world on all of Airbnb” - Brian Chesky, CEO of Airbnb",
    //       "capacity": 5,
    //       "amenities": [
    //           "Bay view",
    //           "Beach access – Beachfront",
    //           "Wifi",
    //           "Kitchen"
    //       ],
    //       "labels": [
    //           "Trending",
    //           "Amazing views",
    //           "Desert",
    //           "OMG"
    //       ],
    //       "host": {
    //           "_id": "u105",
    //           "fullname": "Philipe",
    //           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    //       },
    //       "loc": {
    //           "country": "Philippines",
    //           "countryCode": "PH",
    //           "city": "El Nido",
    //           "address": "MIMAROPA",
    //           "lat":  14.599512,
    //           "lng": 121.262634
    //       },
    //       "reviews": [
    //           {
    //           "id": "madeId",
    //           "txt": "A nice, clean house. Great people",
    //           "rate": 5,
    //           "by": {
    //               "_id": "u102",
    //               "fullname": "Dudi Du",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           },
    //           {
    //           "id": "madeId",
    //           "txt": "Poorly cleaned, not many facilities",
    //           "rate": 4,
    //           "by": {
    //               "_id": "u105",
    //               "fullname": "Dumbledore",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           }
    //       ],
    //       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    //       },
    //       {
    //       "_id": "s106",
    //       "name": "EInvisible House Joshua Tree | Modern Masterpiece",
    //       "type": "House",
    //       "imgUrls": ["s106/0", "s106/1","s106/2","s106/3","s106/4"],
    //       "price": 771,
    //       "summary": "Welcome to Invisible House. Re-launched in November 2022 as a joint venture with Fieldtrip Hospitality. Imagine a piece of modern art…one of the most spectacular homes in the world on all of Airbnb” - Brian Chesky, CEO of Airbnb",
    //       "capacity": 5,
    //       "amenities": [
    //           "Bay view",
    //           "Beach access – Beachfront",
    //           "Wifi",
    //           "Kitchen"
    //       ],
    //       "labels": [
    //           "Trending",
    //           "Amazing views",
    //           "Desert",
    //           "OMG"
    //       ],
    //       "host": {
    //           "_id": "u105",
    //           "fullname": "Philipe",
    //           "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    //       },
    //       "loc": {
    //           "country": "Philippines",
    //           "countryCode": "PH",
    //           "city": "El Nido",
    //           "address": "MIMAROPA",
    //           "lat":  14.599512,
    //           "lng": 121.262634
    //       },
    //       "reviews": [
    //           {
    //           "id": "madeId",
    //           "txt": "A nice, clean house. Great people",
    //           "rate": 5,
    //           "by": {
    //               "_id": "u102",
    //               "fullname": "Dudi Du",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           },
    //           {
    //           "id": "madeId",
    //           "txt": "Poorly cleaned, not many facilities",
    //           "rate": 4,
    //           "by": {
    //               "_id": "u105",
    //               "fullname": "Dumbledore",
    //               "imgUrl": "/img/img2.jpg"
    //           }
    //           }
    //       ],
    //       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    //       }
    //   ]

    utilService.saveToStorage(STORAGE_KEY, stays);
  }
}

// function getEmptyStay() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }
