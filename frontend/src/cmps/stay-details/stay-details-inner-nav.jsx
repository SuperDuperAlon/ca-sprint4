import { useEffect } from "react"

export function InnerNavStay() {
  const links = ["photos", "amenities", "reviews", "location"]

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
  }, [])

  return (
    <div className="stay-header-inner-nav">
      <div className="stay-inner-container details-layout full">
        <ul className="stay-inner-nav clean-list">
          {links.map((link) => (
            <li>
              <a href={'#' + link} className="capitalize">{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
