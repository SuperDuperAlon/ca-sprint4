export function AirCoverModal({ closeAirCoverModal, stay }) {
    function BlockModal(ev) {
      ev.stopPropagation();
      return null;
    }
  
    if (!stay) return console.log("wait");
    else
      return (
        <>
          <div className="black-screen full" onClick={closeAirCoverModal}>
            <div className="modal" onClick={(ev) => BlockModal(ev)}>
              <h1>AirCoverModal</h1>
            </div>
          </div>
        </>
      );
  }