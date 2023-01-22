import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { orderService } from "../services/order.service"
import { addOrder, updateOrder } from "../store/order.actions"

export function OrderEdit(){

    const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
    const navigate = useNavigate()
    const { orderId } = useParams()

    useEffect(() => {
        if (!orderId) return
        loadOrder()
    }, [])

    function loadOrder() {
        orderService.getById(orderId)
            .then((order) => setOrderToEdit(order))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/')
            })
    }
    
}