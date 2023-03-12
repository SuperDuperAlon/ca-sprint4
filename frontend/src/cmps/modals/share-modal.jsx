export function ShareModal({ closeShareModal, stay }) {
    function BlockModal(ev) {
      ev.stopPropagation();
      return null;
    }
  
    if (!stay) return console.log("wait");
    else
      return (
        <>
          <div className="black-screen full" onClick={closeShareModal}>
            <div className="modal" onClick={(ev) => BlockModal(ev)}>
              <h1>ShareModal</h1>
            </div>
          </div>
        </>
      );
  }