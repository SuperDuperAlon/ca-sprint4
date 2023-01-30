import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FiShare, FiHeart } from "react-icons/fi";
import { MdStar } from "react-icons/md";
import { utilService } from "../../services/util.service";


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
                <div className="mar-r4">
                  <span className="fs16">
                    <MdStar />
                  </span>
                  {stay.reveiwRate? stay.reveiwRate : utilService.getRandomFloatInclusive(4,5).toFixed(2)} · <Link to={`/reviews/`}>{stay.reviews.length} reviews</Link>
                </div>
                · {stay.host.isSuperhost && <div className="fw400">Superhost ·</div> }
                <div className="mar-l4">
                  <Link to={`/location/`}>
                     {stay.loc.address}
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
                <div className="mar-r4">
                  <span className="fs14">
                  <AiFillStar />
                  </span>{" "}
                  {stay.reveiwRate ? stay.reveiwRate : utilService.getRandomFloatInclusive(4,5).toFixed(2)} ·
                  <Link to={`/reviews/`}>{stay.reviews.length} Reviews</Link>
                </div>
                ·
                <div className="mar-l4">
                  <Link to={`/location/`}>{stay.loc.address}</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
}
