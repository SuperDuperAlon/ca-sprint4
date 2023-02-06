import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMap } from "../reusable/google-map";

// const AnyReactComponent = ({ text }) => <div>{text}</div>

export function StayDetailsMap({ stay, isMobile }) {

  // var coordinates = {
  //   lat: stay.loc.lat,
  //   lng: stay.loc.lan,
  // };
  const zoom = 16;

  if (!stay) return;
  else
    return (
      <section className="stay-details-map">  
        {!isMobile && (
          <>
            <div className="lh26 fs22 fw600 mar-b24">Where You'll Be</div>
            <GoogleMap stay={stay} isMobile={isMobile} />

            <div className="fw600 mar-b16">
              {stay.loc.address}, {stay.loc.city}, {stay.loc.country}
            </div>
            <div className="mar-b16">{stay.summary}</div>
            <button className="link">Show more</button>
          </>
        )}

        {isMobile && (
          <>
            <div className="lh26 fs22 fw600 mar-b24">Where You'll Be</div>
            <GoogleMap stay={stay} isMobile={isMobile} />
          </>
        )}
      </section>
    );
}
