export function ReviewModal({ closeReviewModal, stay }) {
  function BlockModal(ev) {
    ev.stopPropagation();
    return null;
  }

  if (!stay) return console.log("wait");
  else
    return (
      <>
        <div className="black-screen full" onClick={closeReviewModal}>
          {console.log(stay)}
          <div className="modal" onClick={(ev) => BlockModal(ev)}>
            <h3>Reviews</h3>
            {stay.reviews.txt?.map((item) => (
               <h2>{item}</h2>
            ))}
          </div>
        </div>
      </>
    );
}
