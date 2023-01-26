import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FiShare, FiHeart } from "react-icons/fi";
import { MdStar } from "react-icons/md";

export function StayDetailsLocationInfo({ stay, isMobile }) {
  if (!stay) return console.log("lala");
  else
    return (
      <div className="details-locations-info">
        {!isMobile && (
          <>
            <div className="info-header fs26 fw600 lh30">{stay.name}</div>
            <div className="secondary-info fs14 flex align-center">
              <div className="locations-attr fs14 fw600">
                <div className="mar-r8">
                  <span className="fs16">
                    <MdStar />
                  </span>{" "}
                  4.88 · <Link to={`/reviews/`}>303 Reviews</Link>
                </div>
                ·
                <div className="mar-l8">
                  <Link to={`/location/`}>
                    {stay.loc.city}, {stay.loc.address}, {stay.loc.country}
                  </Link>
                </div>
              </div>
              <div className="details-locations-info-actions fs14 lh18 ">
                <button className="save-share fw600">
                  <div>
                    <FiShare />
                  </div>{" "}
                  <div className="txt-d-ul mar-l8">Share</div>{" "}
                </button>
                <button className="save-share fw600">
                  <div>
                    <FiHeart />
                  </div>{" "}
                  <div className="txt-d-ul mar-l8">Save</div>
                </button>
              </div>
            </div>
          </>
        )}

        {isMobile && (
          <>
            <div className="info-header fs26 fw600 lh30">{stay.name}</div>
            <div className="secondary-info fs14 flex align-center">
              <div className="locations-attr fs14 fw600">
                <div className="mar-r8">
                  <span className="fs14">
                    <MdStar />
                  </span>{" "}
                  4.88 · <Link to={`/reviews/`}>303 Reviews</Link>
                </div>·<div className="mar-l8">
                  <Link to={`/location/`}>
                    {stay.loc.city}, {stay.loc.address}, {stay.loc.country}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
}
