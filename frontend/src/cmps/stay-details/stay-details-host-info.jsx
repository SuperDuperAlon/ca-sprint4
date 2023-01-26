import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKingBed } from "react-icons/md";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CalendarMain } from "../filter/calendar";
import { filterService } from "../../services/filterService";
import { StayDetailsMap } from "./stay-details-map";

export function StayDetailsHostInfo({ stay, isMobile }) {
  console.log(isMobile);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const handleOpenReviewModal = () => setReviewModalOpen(true);
  const handleCloseReviewModal = () => setReviewModalOpen(false);
  const [filter, setFilter] = useState(filterService.getEmptyFilter());

  function onChangeDate(dates) {
    const checkIn = dates[0];
    const checkOut = dates[1];
    setFilter({ ...filter, checkOut, checkIn });
  }

  if (!stay) return;
  else
    return (
      <section className="stay-details-host-info">
        {!isMobile && (
          <>
            <div className="basic-info">
              <div className="host-info">
                <div className="fs22 fw600 mar-b8">
                  {stay.name} hosted by {stay.host.fullname}
                </div>
                <div> {`2 guests · ${stay.bedrooms > 1 ? stay.bedrooms + ' bedrooms' : stay.bedrooms + ' bedroom'} · ${stay.beds > 1 ? stay.beds + ' beds' : stay.beds+' bed'} · ${stay.bathrooms > 1 ? stay.bathrooms + ' bathrooms' : stay.bathrooms + ' bathroom'}`}</div>
              </div>
              <div className="avatar-lg">
                <img
                  src={require("../../assets/img/other/DOGE.jpg")}
                  alt="avatar-lg"
                />
              </div>
            </div>
            <div className="host">
              <div className="host-content">
                <div className="fw600 mar-b4">
                  {stay.host.fullname} is a Superhost
                </div>
                <div className="fs14 dark-content">
                  Superhosts are experienced, highly rated hosts who are
                  committed to providing great stays for guests.
                </div>
              </div>
              <div className="host-content">
                <div className="fw600 mar-b4"> Great location</div>
                <div className="fs14 dark-content">
                  100% of recent guests gave the location a 5-star rating.
                </div>
              </div>
              <div className="host-content">
                <div className="fw600 mar-b4">Dive right in</div>
                <div className="fs14 dark-content">
                  Free cancellation before Mar 21.
                </div>
              </div>
            </div>

            <div className="air-cover">
              <div className="air-cover-logo pink fw600">
                AIR<span className="dark-header">COVER</span>
              </div>
              <div className="fs16 dark-content">
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </div>
              <button className="link">Learn more</button>
            </div>
            <div className="room-description">
              <div className="lh24 mar-b16">
                Relax, rejuvenate and unplug in this unique contemporary
                Birdbox. Feel close to nature in ultimate comfort. Enjoy the
                view of the epic mountain range of Blegja and the Førdefjord.
                Feel the true Norwegian countryside calmness of birds chirping,
                rivers flowing and trees in the wind. Explore the countryside
                area, walk down to the fjord and take a swim, hike the
                surrounding mountains, relax with a good book & meditate. Enjoy
                the unique Birdbox experience. #Birdboxing
              </div>
              <button className="link">Show more</button>
            </div>
            <div className="bedding">
              <div className="fw600 fs22 pad-b24">Where you'll sleep </div>
              <div className="bedding-desc-rect">
                <div className="icon mar-b16">
                  <MdOutlineKingBed style={{ fontSize: "1.5rem" }} />
                </div>
                <div className="fw600 mar-b8">Bedroom </div>
                <div className="fs14">1 king bed</div>
              </div>
            </div>
            <div className="stay-details-amenities">
              <div className="fs22 fw600 mar-b24">What this place offers </div>
              <div className="amenities-list">
                {stay.amenities.map((amenities) => {
                  return <div>{amenities}</div>;
                })}
              </div>
              <button className="white-open-btn">
                <Link to={`/amenities/`}>Show all 9 amenities</Link>
              </button>
            </div>

            <div className="calendar">
              <div className="fw600 fs22">3 nights in Forde</div>
              <div className="day-picker-modal inner">
                <CalendarMain filterBy={filter} onChangeDate={onChangeDate} />
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <>
            <div className="basic-info">
              <div className="host-info">
                <div className="fs22 fw600 mar-b8">
                  {stay.name} hosted by {stay.host.fullname}
                </div>
                <div> 2 guests · 1 bedroom · 1 bed · Half-bath</div>
              </div>
              <div className="avatar-lg">
                <img
                  src={require("../../assets/img/other/DOGE.jpg")}
                  alt="avatar-lg"
                />
              </div>
            </div>
            <div className="host">
              <div className="host-content">
                <div className="fw600 mar-b4">
                  {stay.host.fullname} is a Superhost
                </div>
                <div className="fs14 dark-content">
                  Superhosts are experienced, highly rated hosts who are
                  committed to providing great stays for guests.
                </div>
              </div>
              <div className="host-content">
                <div className="fw600 mar-b4"> Great location</div>
                <div className="fs14 dark-content">
                  100% of recent guests gave the location a 5-star rating.
                </div>
              </div>
              <div className="host-content">
                <div className="fw600 mar-b4">Dive right in</div>
                <div className="fs14 dark-content">
                  Free cancellation before Mar 21.
                </div>
              </div>
            </div>

            <div className="air-cover">
              <div className="air-cover-logo pink fw600">
                AIR<span className="dark-header">COVER</span>
              </div>
              <div className="fs14 dark-content">
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </div>
              <button className="link fs14">Learn more</button>
            </div>

            <div className="room-description">
              <div className="lh24 mar-b16">
                Relax, rejuvenate and unplug in this unique contemporary
                Birdbox. Feel close to nature in ultimate comfort. Enjoy the
                view of the epic mountain range of Blegja and the Førdefjord.
                Feel the true Norwegian countryside calmness of birds chirping,
                rivers flowing and trees in the wind. Explore the countryside
                area, walk down to the fjord and take a swim, hike the
                surrounding mountains, relax with a good book & meditate. Enjoy
                the unique Birdbox experience. #Birdboxing
              </div>
              <button className="link">Show more</button>
            </div>

            <div className="bedding">
              <div className="fw600 fs22 pad-b24">Where you'll sleep </div>
              <div className="bedding-desc-rect">
                <div className="icon mar-b16">
                  <MdOutlineKingBed style={{ fontSize: "1.5rem" }} />
                </div>
                <div className="fw600">Bedroom </div>
                <div className="fs14">1 king bed</div>
              </div>
            </div>

            <div className="stay-details-amenities">
              <div className="fs22 fw600 mar-b24">What this place offers </div>
              <div className="amenities-list">
                {stay.amenities.map((amenities, idx) => {
                  if(idx < 6) return <div>{amenities}</div>;
                })}
              </div>
              <button className="white-open-btn">
                <Link to={`/amenities/`}>Show all {stay.amenities.length} amenities</Link>
              </button>
            </div>
            <div>
              <StayDetailsMap stay={stay} isMobile={isMobile}/>
            </div>

            <div className="calendar">
              <div className="fw600 fs22">3 nights in Forde</div>
              <div className="day-picker-modal inner">
                <CalendarMain filterBy={filter} onChangeDate={onChangeDate} />
              </div>
            </div>
          </>
        )}
      </section>
    );
}

// require("../../assets/img/other/DOGE.jpg")