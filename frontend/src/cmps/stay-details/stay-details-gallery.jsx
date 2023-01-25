export function StayDetailsGallery({ stay }) {
  console.log(stay)
  if (!stay) return
  else
    return (
      <section className="stay-details-gallery">
        {/* <img src={require(`../../assets/img/s101/0.jpg`)} alt="" /> */}
        <section className="gallery">
          {stay.imgUrls.map((img, idx) => {
           return <img className={`gallery-item-${idx}`} src={require(`../../assets/img/${img}.jpg`)} alt=""/>
          })}
        </section>
      </section>
    )
}

// {/* /* // <img src={`../../assets/img/${img}.jpg`} alt="image" />
// //
// // <ul>
// //   <li>{img}</li>
// // </ul> */}
