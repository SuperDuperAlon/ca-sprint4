import { Link } from "react-router-dom";

export function StayDetailsLocationInfo() {
  return (
    <div className="details-locations-info">
      <div className="info-header fs26">
        Amazing view of fjord & mountains glamping Birdbox{" "}
      </div>
      <div className="secondary-info fs14">
        <div className="locations-attr">
          4.88 · <Link to={`/reviews/`}>303 reviews</Link> · 󰀃 Superhost ·
          <Link to={`/location/`}>Forde, Vestland fylke, Norway</Link>
        </div>
        <div className="actions">
          <button>Share</button>
          <button>Save</button>{" "}
        </div>
      </div>
    </div>
  );
}
