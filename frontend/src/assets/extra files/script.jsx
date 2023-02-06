const [isMobile, setIsMobile] = useState(false)
const MOBILE_WIDTH = 687

useEffect(() => {
  window.addEventListener("resize", updateDimensions)
  return () => window.removeEventListener("resize", updateDimensions)
}, [])

//   Listens to changes in Screensize and sets the state to Mobile or Desktop / Tablet
function updateDimensions() {
  setIsMobile(window.innerWidth < MOBILE_WIDTH)
}

// Reusable application to the functions
{
  isMobile ? (
    <>
      <StayDetailsCarousel />
      <StayDetailsLocationInfo isMobile={isMobile} />
      <StayDetailsHostInfo isMobile={isMobile} />
      <StayDetailsReviews isMobile={isMobile} />
      <StayDetailsHostDetails isMobile={isMobile} />
      <StayDetailsMobileFooter />
    </>
  ) : (
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