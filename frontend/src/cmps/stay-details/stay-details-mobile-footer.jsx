export function StayDetailsMobileFooter({ stay }) {
  return (
    // <section className="details-layout">
    <div className="stay-details-mobile-footer details-layout">
      <div className="flex row space-between">
        <div>
          <div className="fs16 fw600">
            $337 <span className="fs14">night</span>
          </div>
          <div className="fs14">
            <button className="link">303 reviews</button>
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
