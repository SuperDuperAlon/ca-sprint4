export function StayDetailsGallery({ stay }) {
  if (!stay) return
  else
    return (
      <section className="stay-details-gallery">
        <div className="gallery">
          {stay.imgUrls.map((img, idx) => {
           return <img className={`gallery-item-${idx}`} src={img} alt=""/>
          })}
        </div>
      </section>
    )
}