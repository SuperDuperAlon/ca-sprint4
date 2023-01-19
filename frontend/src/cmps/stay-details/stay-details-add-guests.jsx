import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  COUNT_ADULTS,
  COUNT_CHILDREN,
  COUNT_INFANTS,
  COUNT_PETS,
  CHANGE_COUNT,
} from "../../store/reserve.reducer";

export function AddGuests() {
  const dispatch = useDispatch();
  const count = useSelector((storeState) => storeState.reserveModule.count);
  const adultsCount = useSelector(
    (storeState) => storeState.reserveModule.adultsCount
  );
  const childrenCount = useSelector(
    (storeState) => storeState.reserveModule.childrenCount
  );
  const infantCount = useSelector(
    (storeState) => storeState.reserveModule.infantCount
  );
  const petsCount = useSelector(
    (storeState) => storeState.reserveModule.petsCount
  );

  //   function changeCount(diff) {
  //     console.log("Changing count by:", diff);
  //     dispatch({ type: CHANGE_COUNT, diff });
  //   }

  function countAdults(diff) {
    console.log("Changing count by:", diff);
    dispatch({ type: CHANGE_COUNT, diff });
    dispatch({ type: COUNT_ADULTS, diff });
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
      <button>
        <Link to={`/book/stays`}>Reserve</Link>
      </button>
    </section>
  );
}
