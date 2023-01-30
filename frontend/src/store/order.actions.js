import { store } from '../store/store.js'
import { orderService } from "../services/order.service"
import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER, UPDATE_ORDER } from "./order.reducer.js"

// Action Creators:
export function getActionRemoveOrder(orderId) {
  return {
      type: REMOVE_ORDER,
      orderId: orderId
  }
}

export function getActionAddOrder(order) {
  return {
      type: ADD_ORDER,
      order: order
  }
}
export function getActionUpdateOrder(order) {
  return {
      type: UPDATE_ORDER,
      order
  }
}

export async function loadOrders(filter=null) {
  try {
      const orders = await orderService.query(filter)
      store.dispatch({
          type: SET_ORDERS,
          orders: orders
      })
    

  } catch (err) {
      console.log('Cannot load orders', err)
      throw err
  }

}

export async function removeOrder(orderId) {
  try {
      await orderService.remove(orderId)
      store.dispatch(getActionRemoveOrder(orderId))
  } catch (err) {
      console.log('Cannot remove order', err)
      throw err
  }
}

export async function addOrder(order) {
  try {
      const savedOrder = await orderService.save(order)
      console.log('Added order', savedOrder)
      store.dispatch(getActionAddOrder(savedOrder))
      return savedOrder
  } catch (err) {
      console.log('Cannot add order', err)
      throw err
  }
}

export async function updateOrder(order) {
  try{
      const savedOrder = await orderService.save(order)
      store.dispatch(getActionUpdateOrder(savedOrder))
      return savedOrder
  }catch(err) {
      console.log('Cannot save order', err)
      throw err
  }
}