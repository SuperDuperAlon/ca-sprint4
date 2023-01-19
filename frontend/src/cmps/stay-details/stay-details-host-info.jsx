import { Link } from "react-router-dom";

export function StayDetailsHostInfo() {
  return (
    <section className="stay-details-host-info">
      <div className="basic-info">
        <div className="host-info">
          <div className="fs22 fw600">Treehouse hosted by Torstein</div>
          <div> 2 guests · 1 bedroom · 1 bed · Half-bath</div>
        </div>
        <div className="host-avatar">image</div>
      </div>
      <div className="host">
        <div className="host-content">
          <div className="fw600">Torstein is a Superhost</div>
          <div className="fs14 dark-content">
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </div>
        </div>
        <div className="host-content">
          <div className="fw600"> Great location</div>
          <div className="fs14 dark-content">
            100% of recent guests gave the location a 5-star rating.
          </div>
        </div>
        <div className="host-content">
          <div className="fw600">Dive right in</div>
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
        <div className="fw600">Learn more</div>
      </div>
      <div className="description">
        <div className="">Some info is shown in its original language.</div>
        <div className="">
          Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel
          close to nature in ultimate comfort. Enjoy the view of the epic
          mountain range of Blegja and the Førdefjord. Feel the true Norwegian
          countryside calmness of birds chirping, rivers flowing and trees in
          the wind. Explore the countryside area, walk down to the fjord and
          take a swim, hike the surrounding mountains, relax with a good book &
          meditate. Enjoy the unique Birdbox experience. #Birdboxing
        </div>
        <div className="fw600">Show more</div>
      </div>
      <div className="bedding">
        <div className="fw600">Where you'll sleep </div>
        <div className="bedding-desc">
        <div className="fw600">Bedroom </div>
        <div className="">1 king bed</div>
        </div>
      </div>
      <div className="amenities">
      <div className="fs22 fw600">What this place offers </div>
      <div className="">Free parking on premises Pets allowed Long term
        stays allowed Unavailable: Carbon monoxide alarmCarbon monoxide alarm</div>
        <button className="fw600"><Link to={`/amenities/`}>
        Show all 9 amenities</Link>
        </button>
      </div>
      <div className="calendar">
      <div className="fw600">3 nights in Forde</div> Mar 14, 2023 - Mar 17, 2023 Calendar1 
      </div>
    </section>
  );
}
