import { StayDeatilsHostInfo } from "../cmps/stay-details/stay-details-host-info";
import { StayDetailsGallery } from "../cmps/stay-details/stay-details-gallery";

import { StayDeatilsLocationInfo } from "../cmps/stay-details/stay-details-locations-info";

import { StayDetailsReservationModal } from "../cmps/stay-details/stay-details-reservation-modal";
import { StayDetailsReviews } from "../cmps/stay-details/stay-details-reviews";
import {StayDetailsHostDetails} from '../cmps/stay-details/stay-details-host-details'

import { StayDetailsMap } from "../cmps/stay-details/stay-details-map";
export function StayDetails() {
  return (
    <section>
      <StayDeatilsLocationInfo />
      <StayDetailsGallery />
      <StayDeatilsHostInfo />
      <StayDetailsReservationModal />
      <StayDetailsReviews />
      <StayDetailsMap />
      <StayDetailsHostDetails />
    </section>
  );
}
