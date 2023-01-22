export function StayDetailsGallery({ stay }) {
  console.log(stay);
  if (!stay) return;
  else
    return (
      <section className="stay-details-gallery">
        {/* <img src={require(`../../assets/img/s101/0.jpg`)} alt="" />; */}
        <section className="gallery">
          {stay.imgUrls.map((gaga, idx) => {
           return <img className={`gallery-item-${idx}`} src={require(`../../assets/img/${gaga}.jpg`)} alt=""/>
          })}
        </section>
      </section>
    );
}

// {/* /* // <img src={`../../assets/img/${img}.jpg`} alt="image" />;
// //
// // <ul>
// //   <li>{img}</li>
// // </ul>; */}
