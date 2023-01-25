// import { ArrowLeft, ArrowRight, Search, LogoFull } from "../services/svg.service"

import React, { useEffect } from "react"

export function InnerNavStay() {
  useEffect(() => {
    const header = document.querySelector(".stay-header-inner-nav")
    const nav = document.querySelector(".stay-inner-container")

    const headerObserver = new IntersectionObserver(onHeaderObserved, {
      rootMargin: "0px 0px 200px",
    })

    headerObserver.observe(header)

    function onHeaderObserved(entries) {
      entries.forEach((entry) => {
        nav.style.position = entry.isIntersecting ? "static" : "fixed"
        nav.style.height = entry.isIntersecting ? "0" : "81px"
        nav.style.visibility = entry.isIntersecting ? "collapse" : "visible"
        nav.style.top = 0
      })
    }
  }, []) // <-- empty array means 'run once'

  return (
    <div className="stay-header-inner-nav">
      <div className="stay-inner-container details-layout">
        <ul className="stay-inner-nav clean-list">
          <li>
            <a href="#">Photos</a>
          </li>
          <li>
            <a href="#">Amenities</a>
          </li>
          <li>
            <a href="#">Reviews</a>
          </li>
          <li>
            <a href="#">Location</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
