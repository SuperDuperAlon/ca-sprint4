import { Link } from "react-router-dom";

export function StayDetailsLocationInfo() {
  return (
    <div className="details-locations-info">
      <h2 className="info-header fs26">
        Amazing view of fjord & mountains glamping Birdbox{" "}
      </h2>
      <div className="secondary-info fs14">
        <h2 className="locations-attr">
          4.88 · <Link to={`/reviews/`}>303 reviews</Link> · 󰀃 Superhost ·
          <Link to={`/location/`}>Forde, Vestland fylke, Norway</Link>
        </h2>
        <div className="actions">
          <button>Share</button>
          <button>Save</button>{" "}
        </div>
      </div>
    </div>
  );
}
