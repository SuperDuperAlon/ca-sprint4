export function StayDetailsGallery({ stay }) {
  // console.log(stay);
  if (!stay) return
  else
    return (
      <section className="stay-details-gallery">
        <h1>This is the place of the images - Test</h1>
        {stay.imgUrls.map((gaga) => {
          return <img src={require(`../../assets/img/${gaga}.jpg`)} alt="" />
        })}
      </section>
    )
}

// {/* /* // <img src={`../../assets/img/${img}.jpg`} alt="image" />;
// //
// // <ul>
// //   <li>{img}</li>
// // </ul>; */}
