export function SpaceModal({ closeSpaceModal, stay }) {
  function BlockModal(ev) {
    ev.stopPropagation();
    return null;
  }

  if (!stay) return console.log("wait");
  else
    return (
      <>
        <div className="black-screen full" onClick={closeSpaceModal}>
          <div className="modal" onClick={(ev) => BlockModal(ev)}>
            <h1>About the Space</h1>
          </div>
        </div>
      </>
    );
}
