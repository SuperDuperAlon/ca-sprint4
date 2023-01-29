const [isMobile, setIsMobile] = useState(false)
const [width, setWidth] = useState(window.innerWidth)

useEffect(() => {
  window.addEventListener('resize', updateDimensions)
  return () => window.removeEventListener('resize', updateDimensions)
}, [])

//   Listens to changes in Screensize
function updateDimensions() {
  setWidth(window.innerWidth)
  isMobileReady(window.innerWidth)
}

//   Sets state to Mobile or Desktop / Tablet
function isMobileReady(width) {
  if (width > 687) {
    setIsMobile(false)
  } else if (width < 687) {
    setIsMobile(true)
  }
}

// Reusable application to the functions
{
  !isMobile && (
    <>
      <StayDetailsLocationInfo isMobile={isMobile} />
      <StayDetailsGallery />
      <InnerNavStay />
      <StayDetailsHostInfo isMobile={isMobile} />
      <StayDetailsOrderModal />
      <StayDetailsReviews isMobile={isMobile} />
      <StayDetailsMap />
      <StayDetailsHostDetails isMobile={isMobile} />
    </>
  )
}
{
  isMobile && (
    <>
      <StayDetailsCarousel />
      <StayDetailsLocationInfo isMobile={isMobile} />
      <StayDetailsHostInfo isMobile={isMobile} />
      <StayDetailsReviews isMobile={isMobile} />
      <StayDetailsHostDetails isMobile={isMobile} />
      <StayDetailsMobileFooter />
    </>
  )
}
