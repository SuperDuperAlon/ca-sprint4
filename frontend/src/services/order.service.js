// import { storageService } from './async-storage.service.js'
import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"
import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = "order_db"
_createOrders()

export const orderService = {
  query,
  getById,
  save,
  remove,
  // addOrderMsg,
  getEmptyOrder,
  getOrders
}
window.cs = orderService

async function query(filterBy) {
  try {
    let data= await storageService.query(STORAGE_KEY)
    const regex = new RegExp(filterBy, 'i')
    data = data.filter(order => regex.test(order.hostId) )
    return data
  } catch (err) {
    console.log(err)
  }

  // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
  // return httpService.get(`order/${orderId}`)
}

async function getOrders(hostId){
  try{
    let data= await storageService.query(STORAGE_KEY)
    const regex = new RegExp(hostId, 'i')
    data = data.filter(order => regex.test(order.hostId) )
    return data 
  }catch(err){
    console.log(err)
  }
}

async function remove(orderId) {
  await storageService.remove(STORAGE_KEY, orderId)
  // return httpService.delete(`order/${orderId}`)
}
async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
    // savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    // Later, owner is set by the backend
    // order.owner = userService.getLoggedinUser()
    savedOrder = await storageService.post(STORAGE_KEY, order)
    // savedOrder = await httpService.post('order', order)
  }
  return savedOrder
}

// async function addOrderMsg(orderId, txt) {
//     const savedMsg = await httpService.post(`order/${orderId}/msg`, {txt})
//     return savedMsg
// }

function getEmptyOrder() {
  return {
    _id: "",
    hostId: "",
    buyer: {
      _id: "",
      fullname: "",
    },
    totalPrice: "",
    startDate: "",
    endDate: "",
    guests: {
      adults: "",
      children: "",
      infants:"",
      pets: "",
    },
    stay: {
      _id: "",
      name: "",
      price: "",
    },
    msgs: [],
    status: "pending", // pending, approved
  }
}

function _createOrders() {
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  if (!orders || !orders.length) {
    // orders = [
    //   {
    //     "hostId: "622f3402e36c59e6164facbf",
    //     'buyer': {
    //       "_id": "622f3402e36c59e6164facbe",
    //       "fullname": "Christina",
    //     },
    //     "totalPrice": 1900,
    //     "startDate": "01/20/2022",
    //     "endDate": "01/10/2022",
    //     "guests": {
    //       "adults": 2,
    //       "kids": 1,
    //     },
    //     "stay": {
    //       "_id": "622f337a75c7d36e498aab0b",
    //       "name": "Elegant Flat in the Center",
    //       "price": 190.0,
    //     },
    //     "msgs": [],
    //     "status": "pending", 
    //   },
    //   {
  
    //     "hostId": "622f3402e36c59e6164facbf",
    //     "buyer": {
    //       "_id": "622f3402e36c59e6164facc0",
    //       "fullname": "Paula",
    //     },
    //     "totalPrice": 950,
    //     "startDate": "01/05/2023",
    //     "endDate": "01/09/2023",
    //     "guests": {
    //       "adults": 2,
    //       "kids": 1,
    //     },
    //     "stay": {
    //       "_id": "622f337a75c7d36e498aab0b",
    //       "name": "Elegant Flat in the Center",
    //       "price": 190.0,
    //     },
    //     "msgs": [],
    //     "status": "complete", 
    //   },
    //   {
    //     "hostId": "622f3402e36c59e6164facbf",
    //     "buyer": {
    //       "_id": "622f3402e36c59e6164facc2",
    //       "fullname": "Andrius",
    //     },
    //     "totalPrice": "780",
    //     "startDate": "01/05/2023",
    //     "endDate": "01/09/2023",
    //     "guests": {
    //       "adults": "2",
    //       "kids": "1",
    //     },
    //     "stay": {
    //       "_id": "622f337b75c7d36e498aabac",
    //       "name": "Ultra Comfy Flat & Perfect Location",
    //       "price": "195",
    //     },
    //     "msgs": [],
    //     "status": "complete", 
    //   },
    //   {
    //     "hostId": "622f3402e36c59e6164facbf",
    //     "buyer": {
    //       "_id": "622f3402e36c59e6164facc4",
    //       "fullname": "Patricia",
    //     },
    //     "totalPrice": "585",
    //     "startDate": "12/27/2022",
    //     "endDate": "12/30/2022",
    //     "guests": {
    //       "adults": "2",
    //       "kids": "1",
    //     },
    //     "stay": {
    //       "_id": "622f337b75c7d36e498aabac",
    //       "name": "Ultra Comfy Flat & Perfect Location",
    //       "price": "195",
    //     },
    //     "msgs": [],
    //     "status": "complete",
    //   },
    //   {
    //     "hostId": "622f3402e36c59e6164facbf",
    //     "buyer": {
    //       "_id": "622f3402e36c59e6164facbb",
    //       "fullname": "Michael",
    //     },
    //     "totalPrice": "1330",
    //     "startDate": "12/20/2022",
    //     "endDate": "12/27/2022",
    //     "guests": {
    //       "adults": 2,
    //       "kids": 1,
    //     },
    //     "stay": {
    //       "_id": "622f337a75c7d36e498aab0b",
    //       "name": "Elegant Flat in the Center",
    //       "price": 190,
    //     },
    //     "msgs": [],
    //     "status": "complete", 
    //   },
    //   {
    //     "hostId": "622f3402e36c59e6164facbf",
    //     "buyer": {
    //       "_id": "622f3402e36c59e6164facbc",
    //       "fullname": "Héloïse",
    //     },
    //     "totalPrice": 1330,
    //     "startDate": "11/20/2022",
    //     "endDate": "11/27/2022",
    //     "guests": {
    //       "adults": 2,
    //       "kids": 1,
    //     },
    //     "stay": {
    //       "_id": "622f337a75c7d36e498aab0b",
    //       "name": "Elegant Flat in the Center",
    //       "price": 190,
    //     },
    //     "msgs": [],
    //     "status": "complete", 
    //   }
    // ]
    utilService.saveToStorage(STORAGE_KEY, orders)
  }
}
