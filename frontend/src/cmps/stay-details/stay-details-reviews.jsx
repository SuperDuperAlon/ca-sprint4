import { useState } from "react";
import { CustomizedProgressBars } from "../reusable/progress-bar";
import { MdStar } from "react-icons/md";
import { utilService } from "../../services/util.service";
import { ReviewModal } from "../modals/review-modal";

export function StayDetailsReviews({ stay, isMobile }) {
  // Reviews Modal
  const [reviewModal, setReviewModal] = useState(false);
  const openReviewModal = () => setReviewModal(true);
  const closeReviewModal = () => setReviewModal(false);

  const reviewRatings = [
    "Cleanliness",
    "Accuracy",
    "Communication",
    "Location",
    "Check In",
    "Value",
  ];
  const idxCondition = isMobile ? 4 : 6;

  if (!stay) return <h1>Loading...</h1>;
  else
    return (
      <section className="stay-details-reviews" id="reviews">
        <div className="fs22 fw600 mar-b32 flex align-center">
          <MdStar />
          {stay.reveiwRate
            ? +stay.reveiwRate
            : +utilService.getRandomFloatInclusive(4, 5).toFixed(2)}
          · {stay.reviews.length} reviews
        </div>
        <div className="details-review-ratings mar-b16">
          {isMobile
            ? ""
            : reviewRatings.map((review) => {
                return (
                  <div className="review-rating">
                    <div className="review-attr-type">{review}</div>
                    <div className="review-attr-rate fw600 fs12">
                      <CustomizedProgressBars bar={4.8} />
                      <div className="mar-l8">4.8</div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="details-review-feedback mar-b16">
          <div className="details-review-reviews mar-t16">
            {stay.reviews.map((review, idx) => {
              if (idx < idxCondition) {
                return (
                  <div
                    className="review-feedback flex column mar-b16"
                    key={review.id}
                  >
                    <div className="review-feedback-personal mar-b12 flex">
                      <div className="avatar-md mar-r8">
                        <img
                          src={require(`../../assets/img/people/${
                            idx + 1
                          }.jpg`)}
                          alt="avatar-md"
                        />
                      </div>
                      <div className="review-feedback-personal-reviewer">
                        <div className="review-name fw600">
                          {review.by.fullname}
                        </div>
                        <div className="review-date grey-71 fs14">
                          {utilService.getMonthYear(review.at.toString())}
                        </div>
                      </div>
                    </div>
                    <div className="flex column space-between">
                      <p className="review-description">{review.txt}</p>
                      <div className="mar-t8">
                        <button className="link" onClick={openReviewModal}>Show More</button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        {reviewModal ? <ReviewModal closeReviewModal={closeReviewModal} stay={stay}/> : ''}
      </section>
    );
}
