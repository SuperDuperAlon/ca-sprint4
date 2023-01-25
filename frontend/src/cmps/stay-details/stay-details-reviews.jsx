import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { CustomizedProgressBars } from "../reusable/progress-bar"
import {MdStar} from "react-icons/md"

export function StayDetailsReviews({ stay }) {
  if (!stay) return console.log("loading")
  else
    return (
      <section className="stay-details-reviews">
        <div className="fs22 fw600 mar-b32 flex align-center"><MdStar />4.88 · 303 Reviews</div>
        <div className="details-review-ratings mar-b16">
          <div className="review-rating">
            <div className="review-attr-type"> Cleanliness</div>
            <div className="review-attr-rate fw600 fs12">
              {" "}
              <CustomizedProgressBars />
              <div className="mar-l8">4.8</div>
            </div>
          </div>
          <div className="review-rating">
            <div className="review-attr-type"> Cleanliness</div>
            <div className="review-attr-rate fw600 fs12">
              {" "}
              <CustomizedProgressBars />
              <div className="mar-l8">4.8</div>
            </div>
          </div>
          <div className="review-rating">
            <div className="review-attr-type"> Cleanliness</div>
            <div className="review-attr-rate fw600 fs12">
              <CustomizedProgressBars />
              <div className="mar-l8">4.8</div>
            </div>
          </div>
        </div>
        <div className="details-review-reviews mar-t16">
          {stay.reviews.map((review) => {
            return (
              <div className="review-feedback" key={review.id}>
                <div className="review-feedback-personal mar-b12">
                  <div className="avatar-md mar-r8">
                    <img
                      src={require("../../assets/img/other/DOGE.jpg")}
                      alt="avatar-md"
                    />
                  </div>
                  <div className="review-feedback-personal-reviewer">
                    <div className="review-name fw600">
                      {review.by.fullname}
                    </div>
                    <div className="review-date grey-71 fs14">October 2022</div>
                  </div>
                </div>
                <div className="review-description">{review.txt}</div>
                <div className="mar-t8">
                  <button className="link ">Show More</button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
}
