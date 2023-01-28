export function StayDetailsMobileFooter({ stay }) {
  return (
    // <section className="details-layout">
    <div className="stay-details-mobile-footer details-layout">
      <div className="flex row space-between">
        <div>
          <div className="fs16 fw600">
            ${stay.price} <span className="fs14">night</span>
          </div>
          <div className="fs14">
            <button className="link">{stay.reviews.length} reviews</button>
          </div>
        </div>
        <div>
          <button className="reserve-btn">Reserve</button>
        </div>
      </div>
    </div>
    // </section>
  );
}
