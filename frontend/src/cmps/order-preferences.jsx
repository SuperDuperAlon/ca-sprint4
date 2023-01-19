import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  COUNT_ADULTS,
  COUNT_CHILDREN,
  COUNT_INFANTS,
  COUNT_PETS,
  CHANGE_COUNT,
} from "../store/order.reducer";

export function OrderPreferences() {
  const dispatch = useDispatch();
  const count = useSelector((storeState) => storeState.orderModule.count);
  const adultsCount = useSelector(
    (storeState) => storeState.orderModule.guests.adults
  );
  const childrenCount = useSelector(
    (storeState) => storeState.orderModule.guests.children
  );
  const infantCount = useSelector(
    (storeState) => storeState.orderModule.guests.infants
  );
  const petsCount = useSelector(
    (storeState) => storeState.orderModule.guests.pets
  );

  function changeCount(diff) {
    console.log("Changing count by:", diff);
    dispatch({ type: CHANGE_COUNT, diff });
  }

  function countAdults(diff) {
    console.log("Changing count by:", diff);
    dispatch({ type: CHANGE_COUNT, diff });
    dispatch({ type: COUNT_ADULTS, diff });
    console.log(adultsCount);
  }

  function countChildren(diff) {
    console.log("Changing count by:", diff);
    dispatch({ type: CHANGE_COUNT, diff });
    dispatch({ type: COUNT_CHILDREN, diff });
  }

  function countInfants(diff) {
    console.log("Changing count by:", diff);
    dispatch({ type: CHANGE_COUNT, diff });
    dispatch({ type: COUNT_INFANTS, diff });
  }

  function countPets(diff) {
    console.log("Changing count by:", diff);
    dispatch({ type: CHANGE_COUNT, diff });
    dispatch({ type: COUNT_PETS, diff });
  }
  return (
    <section>
      {count}
      <div className="guest-count">
        Adults
        <button
          onClick={() => {
            countAdults(-1);
          }}
        >
          -1
        </button>
        {adultsCount}
        <button
          onClick={() => {
            countAdults(1);
          }}
        >
          +
        </button>
      </div>
      <div className="guest-count">
        Children
        <button
          onClick={() => {
            countChildren(-1);
          }}
        >
          -1
        </button>
        {childrenCount}
        <button
          onClick={() => {
            countChildren(1);
          }}
        >
          +
        </button>
      </div>
      <div className="guest-count">
        Infants
        <button
          onClick={() => {
            countInfants(-1);
          }}
        >
          -1
        </button>
        {infantCount}
        <button
          onClick={() => {
            countInfants(1);
          }}
        >
          +
        </button>
      </div>
      <div className="guest-count">
        Pets
        <button
          onClick={() => {
            countPets(-1);
          }}
        >
          -
        </button>
        {petsCount}
        <button
          onClick={() => {
            countPets(1);
          }}
        >
          +
        </button>
      </div>
    </section>
  );
}
