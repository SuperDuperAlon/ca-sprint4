export function StayDetailsGallery({ stay }) {
  if (!stay) return
  else
    return (
      <section className="stay-details-gallery">
        <section className="gallery">
          {stay.imgUrls.map((img, idx) => {
           return <img className={`gallery-item-${idx}`} src={img} alt=""/>
          })}
        </section>
      </section>
    )
}