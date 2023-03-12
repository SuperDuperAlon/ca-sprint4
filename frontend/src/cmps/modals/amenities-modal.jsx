export function AmenitiesModal({ closeAmenitiesModal, stay }) {
  function BlockModal(ev) {
    ev.stopPropagation();
    return null;
  }

  if (!stay) return console.log("wait");
  else
    return (
      <>
        <div className="black-screen full" onClick={closeAmenitiesModal}>
          <div className="modal" onClick={(ev) => BlockModal(ev)}>
      <h3>What this place offers</h3>
            {stay.amenities.map((item) => (
              <li>{item}</li>
            ))}
          </div>
        </div>
      </>
    );
}
