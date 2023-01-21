import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function StayDetailsMap({ stay }) {
  console.log(stay);

  var coordinates = {
    lat: stay.loc.lat,
    lng: stay.loc.lng,
  };
  const zoom = 13;

  {
    console.log(coordinates);
  }

  if (!stay) return;
  else return (
      // Important! Always set the container height explicitly
      <div style={{ height: "70vh", width: "90%", margin: "auto" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAxfggEQ7yAD7Ld4fc_f-haJusL3eGqHzU" }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={zoom}
          // onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        ></GoogleMapReact>
      </div>
    );
}
