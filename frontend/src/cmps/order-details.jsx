import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { orderService } from "../services/order.service"

export function OrderDetails() {

    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
  
    useEffect(() => {
      loadOrder()
    }, [])
  
    async function loadOrder() {
      try {
        const order = await orderService.getById(orderId)
        setOrder(order)
      } catch (err) {
        console.log(err)
      }
    }
    return <h1>Order Details Page</h1>
}