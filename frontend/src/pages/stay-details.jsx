import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { StayDetailsHostInfo } from "../cmps/stay-details/stay-details-host-info"
import { StayDetailsGallery } from "../cmps/stay-details/stay-details-gallery"
import { StayDetailsLocationInfo } from "../cmps/stay-details/stay-details-locations-info"
import { StayDetailsOrderModal } from "../cmps/stay-details/stay-details-reservation-modal"
import { StayDetailsReviews } from "../cmps/stay-details/stay-details-reviews"
import { StayDetailsHostDetails } from "../cmps/stay-details/stay-details-host-details"
import { StayDetailsMap } from "../cmps/stay-details/stay-details-map"
import { StayDetailsCarousel } from "../cmps/stay-details/stay-details-carousel"
import { stayService } from "../services/stay.service"
import { AppHeader } from "../cmps/app-header"
import { InnerNavStay } from "../cmps/stay-details/stay-details-inner-nav"
import React from "react"
import { StayDetailsMobileFooter } from "../cmps/stay-details/stay-details-mobile-footer"
import { useSelector } from "react-redux"
import { SEARCH_BAR_OPEN } from "../store/stay.reducer"
import { store } from "../store/store"

export function StayDetails() {
  const openSearchBar = useSelector(
    (storeState) => storeState.stayModule.searchModalOpen
  )
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 687)

  const MOBILE_WIDTH = 687

  useEffect(() => {
    loadStay()
  }, [])

  useEffect(() => {
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  function updateDimensions() {
    setIsMobile(window.innerWidth < MOBILE_WIDTH)
  }

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log(err)
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

  if (!stay) return <div></div>;
    return (
      <section className="details-layout full">
        {!isMobile && (
          <>
            <div className="app-header details-layout full">
              <AppHeader stay={stay} />
            </div>
            <StayDetailsLocationInfo stay={stay} />
            <StayDetailsGallery stay={stay} />
            <InnerNavStay />
            <div className="stay-details-midsection">
              <StayDetailsHostInfo stay={stay} isMobile={isMobile} />
              <StayDetailsOrderModal stay={stay} />
            </div>
            <StayDetailsReviews stay={stay} />
            <StayDetailsMap stay={stay} />
            <StayDetailsHostDetails stay={stay} />
            {openSearchBar && (
              <div
                className="black-screen full"
                onClick={onClickOutSideTheBar}
              ></div>
            )}
          </>
        )}

        {isMobile && (
          <>
            <StayDetailsCarousel imgs={stay.imgUrls} />
            <StayDetailsLocationInfo stay={stay} isMobile={isMobile} />
            <StayDetailsHostInfo stay={stay} isMobile={isMobile} />
            <StayDetailsMap stay={stay} />
            <StayDetailsReviews stay={stay} isMobile={isMobile} />
            <StayDetailsHostDetails stay={stay} isMobile={isMobile} />
            <StayDetailsMobileFooter stay={stay} />
          </>
        )}
      </section>
    )
}
