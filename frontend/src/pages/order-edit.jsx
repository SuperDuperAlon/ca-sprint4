import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderService } from "../services/order.service";
import { addOrder, updateOrder } from "../store/order.actions";

export function OrderEdit() {
  const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder());
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    if (!orderId) return;
    loadOrder();
  }, []);

  function loadOrder() {
    orderService
      .getById(orderId)
      .then((order) => setOrderToEdit(order))
      .catch((err) => {
        console.log("Had issues in toy details", err);
        navigate("/");
      });
  }

  async function onSaveOrder(ev) {
    ev.preventDefault();
    // console.log(orderToEdit)
    try {
      if (orderToEdit._id) {
        const savedOrder = await updateOrder(orderToEdit);
      } else {
        const savedOrder = await addOrder(orderToEdit);
        console.log("order saved", savedOrder);
      }
      // showSuccessMsg('Car saved!')
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  function handleDateChange({ target }) {
    let { value, type, name: field } = target;
    console.log(field);
    console.log(value);
    value = type === "number" ? +value : value;
    setOrderToEdit((prevOrder) => ({ ...prevOrder, [field]: value }));
  }

  function handleGuestsChange({ target }) {
    let { value, type, name: field } = target;
    console.log(field);
    console.log(value);
    value = type === "number" ? +value : value;
    // setOrderToEdit((prevOrder) => ({ ...prevOrder, [field]: value }));
        setOrderToEdit((prevOrder) => ({ ...prevOrder, guests: {...prevOrder.guests, [field]: value}}));
  }
  // if (
  //   field === "country" ||
  //   field === "city" ||
  //   field === "lat" ||
  //   field === "lng"
  // ) {
  //   setOrderToEdit((prevOrder) => ({
  //     ...prevOrder,
  //     loc: { ...prevOrder.loc, [field]: value },
  //   }));
  // } else

  console.log(orderToEdit);

  return (
    <section>
      <h1>Order Page</h1>

      <form onSubmit={onSaveOrder}>
        {/* Dates */}
        <input
          type="date"
          name="startDate"
          id="startDate"
          placeholder="Start Date"
          value={orderToEdit.name}
          onChange={handleDateChange}
        />

        <input
          type="date"
          name="endDate"
          id="endDate"
          placeholder="End Date"
          value={orderToEdit.name}
          onChange={handleDateChange}
        />

        {/* Guests */}

        <input
          type="number"
          name="adults"
          id="adults"
          placeholder="adults"
          value={orderToEdit.name}
          onChange={handleGuestsChange}
        />

        <input
          type="number"
          name="kids"
          id="kids"
          placeholder="kids"
          value={orderToEdit.name}
          onChange={handleGuestsChange}
        />

        <input
          type="number"
          name="infants"
          id="infants"
          placeholder="infants"
          value={orderToEdit.name}
          onChange={handleGuestsChange}
        />

        <input
          type="number"
          name="pets"
          id="pets"
          placeholder="pets"
          value={orderToEdit.name}
          onChange={handleGuestsChange}
        />

        <div>
          <button>{orderToEdit._id ? "Save" : "Add"}</button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </section>
  );
}
