import { ImgCarousel } from "../cmps/img-carousel"
import { utilService } from "../services/util.service"
import { IoIosStar } from "react-icons/io"
import { AiFillStar } from "react-icons/ai"
import { useRef } from "react";




export function StayList({
  stays,
  onRemoveStay,
  onEditStay,
  onClickOutSideTheBar,
  openSearchBar,
  onOpenStay,
}) {
  return (
    <section>
      <ul className="stay-list">
        {stays.map((stay) => (
          <li
            onClick={(ev) => onOpenStay(ev, stay)}
            className="stay-preview"
            key={stay._id}
          >
            {/* <button onClick={(ev)=>onRemoveStay(ev,stay._id)} className="remove-btn">X</button> */}
            <ImgCarousel imgs={stay.imgUrls} />
            {/* <img className="stay-img" src={require(`../assets/img/${stay.imgUrls[0]}.jpg`)} /> */}
            <div className="flex space-between">
              <h4>
                {stay.type} in {stay.loc.city}
              </h4>
              <h4>
                {!!stay.reviews.length && (
                  <span className="flex center">
                    <AiFillStar />{" "}
                    {stay.reveiwRate? stay.reveiwRate : +(utilService.getRandomFloatInclusive(4,5).toFixed(2))}
                    {/* {stay.reviews.reduce(
                      (acc, review) => review.rate + acc,0) / stay.reviews.length }
                    {" "}({stay.reviews.length}) */}
                  </span>
                )}
              </h4>
            </div>
            <p className="over-flow">{stay.name}</p>
            <p>{stay.beds ? (stay.beds > 1 ? stay.beds + ' beds' : stay.beds + ' bed') : (stay.bedrooms*2+1) + ' beds'} </p>
            {/* <p>
              {utilService.getDistanceFromLatLonInKm(
                31.771959,
                35.217018,
                stay.loc.lat,
                stay.loc.lng
              )}{" "}
              kilometers away
            </p>
            <p>{utilService.randomDate(new Date(), new Date(2024, 0, 1))}</p> */}
            <h4 className="pad-t8">
              ${stay.price} <span>night</span>
            </h4>
            {/* <button onClick={(ev)=>onEditStay(ev,stay)}>Edit</button> */}
          </li>
        ))}
      </ul>
    </section>
  )
}
