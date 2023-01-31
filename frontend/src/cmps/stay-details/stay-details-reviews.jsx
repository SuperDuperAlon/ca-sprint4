import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CustomizedProgressBars } from "../reusable/progress-bar";
import { MdStar } from "react-icons/md";
import { utilService } from "../../services/util.service";

export function StayDetailsReviews({ stay, isMobile }) {
  // const checkDate = getMonthYear('2017-01-07T05:00:00.000Z')
  // console.log(checkDate);
  if (!stay) return console.log("loading");
  else
    return (
      <section className="stay-details-reviews">
        {!isMobile && (
          <>
            <div className="fs22 fw600 mar-b32 flex align-center">
              <MdStar />
              4.88 · {stay.reviews.length} reviews
            </div>
            <div className="details-review-ratings mar-b16">
              <div className="review-rating">
                <div className="review-attr-type"> Cleanliness</div>
                <div className="review-attr-rate fw600 fs12">
                  <CustomizedProgressBars bar={4.8} />
                  <div className="mar-l8">4.8</div>
                </div>
              </div>
              <div className="review-rating">
                <div className="review-attr-type"> Accuracy</div>
                <div className="review-attr-rate fw600 fs12">
                  <CustomizedProgressBars bar={4.7} />
                  <div className="mar-l8">4.7</div>
                </div>
              </div>
              <div className="review-rating">
                <div className="review-attr-type"> Communication</div>
                <div className="review-attr-rate fw600 fs12">
                  <CustomizedProgressBars bar={4.6} />
                  <div className="mar-l8">4.6</div>
                </div>
              </div>
              <div className="review-rating">
                <div className="review-attr-type"> Location</div>
                <div className="review-attr-rate fw600 fs12">
                  <CustomizedProgressBars bar={4.9} />
                  <div className="mar-l8">4.9</div>
                </div>
              </div>
              <div className="review-rating">
                <div className="review-attr-type"> Check-in</div>
                <div className="review-attr-rate fw600 fs12">
                  <CustomizedProgressBars bar={4.8} />
                  <div className="mar-l8">4.8</div>
                </div>
              </div>
              <div className="review-rating">
                <div className="review-attr-type"> Value</div>
                <div className="review-attr-rate fw600 fs12">
                  <CustomizedProgressBars bar={5} />
                  <div className="mar-l8">5</div>
                </div>
              </div>
            </div>
            <div className="details-review-feedback mar-b16">
              <div className="details-review-reviews mar-t16">
                {stay.reviews.map((review, idx) => {
                  if (idx < 6) {
                    return (
                      <div
                        className="review-feedback flex column mar-b16"
                        key={review.id}
                      >
                        <div className="review-feedback-personal mar-b12 flex">
                          <div className="avatar-md mar-r8">
                            <img
                              src={require(`../../assets/img/people/${idx+1}.jpg`)}
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
                            <button className="link ">Show More</button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </>
        )}

        {isMobile && (
          <>
            <div className="fs22 fw600 mar-b32 flex align-center">
              <MdStar />
              4.88 · {stay.reviews.length} reviews
            </div>
            <div className="details-review-feedback mar-t16">
              {stay.reviews.map((review, idx) => {
                if (idx < 4) {
                  return (
                    <div
                      className="review-feedback flex column  mar-b24"
                      key={review.id}
                    >
                      <div className="review-feedback-personal mar-b12 flex">
                        <div className="avatar-md mar-r8">
                          <img src={require(`../../assets/img/people/${idx+1}.jpg`)} />
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
                      <div className="review-description">{review.txt}</div>
                      <div className="mar-t8">
                        <button className="link ">Show More</button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </>
        )}
      </section>
    );
}
