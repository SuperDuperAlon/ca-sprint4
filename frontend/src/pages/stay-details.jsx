import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { StayDetailsHostInfo } from "../cmps/stay-details/stay-details-host-info";
import { StayDetailsGallery } from "../cmps/stay-details/stay-details-gallery";
import { StayDetailsLocationInfo } from "../cmps/stay-details/stay-details-locations-info";
import { StayDetailsOrderModal } from "../cmps/stay-details/stay-details-reservation-modal";
import { StayDetailsReviews } from "../cmps/stay-details/stay-details-reviews";
import { StayDetailsHostDetails } from "../cmps/stay-details/stay-details-host-details";
import { StayDetailsMap } from "../cmps/stay-details/stay-details-map";
import { StayDetailsCarousel } from "../cmps/stay-details/stay-details-carousel";
import { orderService } from "../services/order.service";
import { stayService } from "../services/stay.service";
// import { BasicModal } from "../cmps/modal";
import { AppHeader } from "../cmps/app-header";
import { InnerNavStay } from "../cmps/stay-details/stay-details-inner-nav";
import React from "react";
import { StayDetailsMobileFooter } from "../cmps/stay-details/stay-details-mobile-footer";
import { useSelector } from "react-redux";
import { SEARCH_BAR_OPEN } from "../store/stay.reducer";
import { store } from "../store/store";

export function StayDetails() {
  // const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
  const openSearchBar = useSelector(storeState => storeState.stayModule.searchModalOpen)
  const { stayId } = useParams();
  const [stay, setStay] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

// console.log(width);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    isMobileReady();
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("resize", isMobileReady);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function isMobileReady(width) {

    if (width > 768) {
      console.log("we entered desktop");
      setIsMobile(false);
    } else {
      console.log("we entered mobile");
      setIsMobile(true);
    }
  }

  useEffect(() => {
    loadStay();
  }, []);

  async function loadStay() {
    console.log(stayId);
    try {
      const stay = await stayService.getById(stayId);
      setStay(stay);
    } catch (err) {
      console.log(err);
    }
  }

  function onClickOutSideTheBar(event) {
    event.preventDefault()
    if (!openSearchBar) return
    store.dispatch({
        type: SEARCH_BAR_OPEN,
        open: false,
    })
}
  // async function onAddOrder() {
  //   try {
  //     console.log("this is a test frm details");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  if (!stay) return console.log("no map");
  else
    return (
      <section className="details-layout full">
        {!isMobile && (
          <>
            <div className=" app-header details-layout full">
              <AppHeader stay={stay} />
            </div>
            <StayDetailsLocationInfo stay={stay} />
            <StayDetailsGallery stay={stay} />
            <InnerNavStay />
            <div className="stay-details-midsection">
              <StayDetailsHostInfo stay={stay} isMobile={isMobile} />
              <StayDetailsOrderModal stay={stay} />
            </div>
            {/* <BasicModal /> */}
            <StayDetailsReviews stay={stay} />
            <StayDetailsMap stay={stay} />
            <StayDetailsHostDetails stay={stay} />
            {openSearchBar && <div className="black-screen full"
              onClick={onClickOutSideTheBar}
            ></div>}
          </>
        )}

        {isMobile && (
          <>
            <StayDetailsCarousel imgs={stay.imgUrls}/>
            <StayDetailsLocationInfo stay={stay} isMobile={isMobile} />
            <StayDetailsHostInfo stay={stay} isMobile={isMobile} />
            <StayDetailsReviews stay={stay} isMobile={isMobile} />
            <StayDetailsHostDetails stay={stay} isMobile={isMobile} />
            <StayDetailsMobileFooter stay={stay}/>
          </>
        )}

        {/* {isMobile && } */}
      </section>
    );
}
