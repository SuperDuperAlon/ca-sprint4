export function SaveToWishlistModal({ closeSaveToWishlistModal, stay }) {
    function BlockModal(ev) {
      ev.stopPropagation();
      return null;
    }
  
    if (!stay) return console.log("wait");
    else
      return (
        <>
          <div className="black-screen full" onClick={closeSaveToWishlistModal}>
            <div className="modal" onClick={(ev) => BlockModal(ev)}>
              <h1>closeSaveToWishlistModal</h1>
            </div>
          </div>
        </>
      );
  }