import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { filterService } from "../../services/filterService";

export function StayDetailsMobileFooter({ stay }) {
  // console.log(stay);
  // const [filterBy, setFilterBy] = useState(
  //   filterService.getParamsToObj(filter)
  // );
  // const navigate = useNavigate();
  // const { stayId, filter } = useParams();

function onReserve() {
    // const queryParams = `checkIn=${filterBy.checkIn}&checkOut=${filterBy.checkOut}&adults=${filterBy.adults}&children=${filterBy.children}&infants=${filterBy.infants}&pets=${filterBy.pets}`;
    // navigate(`/book/stay/${stay._id}/${queryParams}`);
  }


    return (
      // <section className="details-layout">
      <div className="stay-details-mobile-footer details-layout">
        <div className="flex row space-between">
          <div>
            <div className="fs16 fw600">
              ${stay.price} <span className="fs14">night</span>
            </div>
            <div className="fs14">
              <button className="link">{stay.reviews.length} reviews</button>
            </div>
          </div>
          <div>
            <button
              className="reserve-btn"
              onClick={() => {
                onReserve();
              }}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
      // </section>
    );
}
