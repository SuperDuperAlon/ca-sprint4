import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loadOrders, removeOrder } from "../store/order.actions.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export function Orders() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const navigate = useNavigate()

  useEffect(() => {
    loadOrders(null)
  }, [])

  async function onRemoveOrder(ev, orderId) {
    ev.stopPropagation()
    try {
      await removeOrder(orderId)
      showSuccessMsg("Order removed")
    } catch (err) {
      showErrorMsg("Cannot remove order")
    }
  }

  function onOpenOrder(ev, order) {
    ev.stopPropagation()
    navigate(`/orders/${order._id}`)
  }

  async function onEditOrder(ev, order) {
    ev.stopPropagation()
    navigate(`/orders/${order._id}/edit`)
}

  return (
    <section>
      <h1>Orders</h1>
      {orders.map((order) => {
        console.log(order._id)
        return (
          <div key="order.buyer._id">
            {order.buyer.fullname}
            <button onClick={(ev) => onRemoveOrder(ev, order._id)}>
              Remove
            </button>
            <button onClick={(ev) => onOpenOrder(ev, order)}>Open</button>
            <button onClick={(ev) => onEditOrder(ev, order)}>Edit</button>
          </div>
        )
      })}
      <button><Link to="/orders/edit"> Add New</Link></button>
    </section>
  )
}
