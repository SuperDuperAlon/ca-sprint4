import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiShare, FiHeart } from "react-icons/fi";
import { utilService } from "../../services/util.service";
import { ReviewModal } from "../modals/review-modal";

export function StayDetailsLocationInfo({ stay, isMobile }) {
  // Reviews Modal
  const [reviewModal, setReviewModal] = useState(false);
  const openReviewModal = () => setReviewModal(true);
  const closeReviewModal = () => setReviewModal(false);

  if (!stay) return console.log("lala");
  else
    return (
      <>
        {isMobile ? (
          ""
        ) : (
          <div className="details-locations-info">
            <div className="info-header fs26 fw600 lh30">{stay.name}</div>
            <div className="secondary-info fs14 flex align-center">
              <div className="locations-attr fs14 fw600">
                <div className="align-text-icon">
                  <span className={isMobile ? "fs14" : "fs16"}>
                    <AiFillStar />
{" "}
                  {stay.reveiwRate
                    ? +stay.reveiwRate
                    : +utilService
                    .getRandomFloatInclusive(4, 5)
                    .toFixed(2)}{" "}
                  ·{" "}
                    </span>
                    <span>

                  <button onClick={openReviewModal} className="link">
                    {stay.reviews.length} reviews
                  </button>{" "}
                    </span>
                  <span>
                  ·
                  </span>
                </div>

                {stay.host.isSuperhost && (
                  <div className="fw400">Superhost ·</div>
                )}
                <div className="">
                  <button className="link">{stay.loc.address}</button>
                </div>
              </div>
              {isMobile ? (
                ""
              ) : (
                <div className="details-locations-info-actions fs14 lh18 ">
                  <button className="save-share fw600">
                    <div className="flex align-center">
                      <FiShare />
                    </div>
                    <div className="txt-d-ul mar-l8">Share</div>{" "}
                  </button>
                  <button className="save-share fw600">
                    <div className="flex align-center">
                      <FiHeart />
                    </div>
                    <div className="txt-d-ul mar-l8">Save</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {reviewModal ? (
          <ReviewModal closeReviewModal={closeReviewModal} stay={stay} />
        ) : (
          ""
        )}
      </>
    );
}
