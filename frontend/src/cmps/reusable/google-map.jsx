import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { RiMapPin2Fill } from "react-icons/ri";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({stay}) {

  var style = { color: "#ff5a5f", fontSize: "3rem" }
  
  const defaultProps = {
    center: {
      lat: stay.loc.lat,
      lng: stay.loc.lng
    },
    zoom: 11,
    icon: <RiMapPin2Fill style={style}/>
  };



  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "480px", width: "100%", margin: "auto", marginBottom:"1.5rem" }}>
 <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAxfggEQ7yAD7Ld4fc_f-haJusL3eGqHzU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text={defaultProps.icon}
        />
      </GoogleMapReact>
    </div>
  );
}