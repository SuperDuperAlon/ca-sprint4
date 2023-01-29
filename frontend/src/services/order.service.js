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
    orders = [
      {
        _id: "o1225",
        hostId: "u102",
        buyer: {
          _id: "u101",
          fullname: "User 1",
        },
        totalPrice: 160,
        startDate: "2025/10/15",
        endDate: "2025/10/17",
        guests: {
          adults: 2,
          kids: 1,
        },
        stay: {
          _id: "h102",
          name: "Milano",
          price: 160.0,
        },
        msgs: [],
        status: "pending", // pending, approved
      },
      {
        _id: "o1227",
        hostId: "u102",
        buyer: {
          _id: "u102",
          fullname: "User 1",
        },
        totalPrice: 160,
        startDate: "2025/10/15",
        endDate: "2025/10/17",
        guests: {
          adults: 2,
          kids: 1,
        },
        stay: {
          _id: "h102",
          name: "House Of Uncle My",
          price: 80.0,
        },
        msgs: [],
        status: "pending", // pending, approved
      },
      {
        _id: "o1229",
        hostId: "u102",
        buyer: {
          _id: "u103",
          fullname: "User 1",
        },
        totalPrice: 160,
        startDate: "2025/10/15",
        endDate: "2025/10/17",
        guests: {
          adults: 2,
          kids: 1,
        },
        stay: {
          _id: "h102",
          name: "House Of Uncle My",
          price: 80.0,
        },
        msgs: [],
        status: "pending", // pending, approved
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, orders)
  }
}
