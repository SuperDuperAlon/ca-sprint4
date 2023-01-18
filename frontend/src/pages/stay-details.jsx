import { StayDetailsHostInfo } from "../cmps/stay-details/stay-details-host-info";
import { StayDetailsGallery } from "../cmps/stay-details/stay-details-gallery";

import { StayDetailsLocationInfo } from "../cmps/stay-details/stay-details-locations-info";

import { StayDetailsReservationModal } from "../cmps/stay-details/stay-details-reservation-modal";
import { StayDetailsReviews } from "../cmps/stay-details/stay-details-reviews";
import {StayDetailsHostDetails} from '../cmps/stay-details/stay-details-host-details'

import { StayDetailsMap } from "../cmps/stay-details/stay-details-map";
export function StayDetails() {
  return (
    <section className="details-layout">
      <h1 className="flex justify-center">App Header</h1>
      <StayDetailsLocationInfo />
      <StayDetailsGallery />
      <StayDetailsHostInfo />
      <StayDetailsReservationModal />
      <StayDetailsReviews />
      <StayDetailsMap />
      <StayDetailsHostDetails />
    </section>
  );
}
