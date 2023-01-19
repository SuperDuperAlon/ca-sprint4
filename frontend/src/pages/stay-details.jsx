import {useState, useEffect} from "react"
import { useParams } from 'react-router-dom'



import { StayDetailsHostInfo } from "../cmps/stay-details/stay-details-host-info";
import { StayDetailsGallery } from "../cmps/stay-details/stay-details-gallery";
import { StayDetailsLocationInfo } from "../cmps/stay-details/stay-details-locations-info";
import { StayDetailsOrderModal } from "../cmps/stay-details/stay-details-reservation-modal";
import { StayDetailsReviews } from "../cmps/stay-details/stay-details-reviews";
import { StayDetailsHostDetails } from "../cmps/stay-details/stay-details-host-details";
import { StayDetailsMap } from "../cmps/stay-details/stay-details-map";
import {orderService} from "../services/order.service"
import { stayService } from "../services/stay.service";
import React from "react";



export function StayDetails() {

  // const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)

console.log(stayId);

useEffect(() => {
  loadStay()
}, [])

  async function loadStay() {
    console.log(stayId);
    const stay = await stayService.getById(stayId)
    setStay(stay)
  }


  console.log(stay);

  // async function onAddOrder() {
  //   try {
  //     console.log('this is a test frm details');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  return (
    <section className="details-layout">
      <h1 className="flex justify-center">App Header</h1>
      <StayDetailsLocationInfo stay={stay}/>
      <StayDetailsGallery stay={stay}/>
      <div className="stay-details-midsection">
        <StayDetailsHostInfo stay={stay}/>
        <StayDetailsOrderModal stay={stay}/>
      </div>

      <StayDetailsReviews stay={stay}/>
      <StayDetailsMap stay={stay}/>
      <StayDetailsHostDetails stay={stay} />
    </section>
  );
}
