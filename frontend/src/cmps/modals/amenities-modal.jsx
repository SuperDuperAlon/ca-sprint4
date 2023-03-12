export function AmenitiesModal({closeAmenitiesModal, stay}) {

  function BlockModal(ev) {
    ev.stopPropagation()
    return null
  }

  if (!stay) return console.log('wait');
else return (
    <>
      <div className="black-screen full" onClick={closeAmenitiesModal}>
        <div className="modal" onClick={(ev) => BlockModal(ev)}>
  {        console.log(stay)}
  
          <h1>amenities Modal</h1>
        </div>
      </div>
    </>
  );
}
