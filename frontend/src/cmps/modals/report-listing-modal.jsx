export function ReportListingModal({ closeReportListingModal, stay }) {
    function BlockModal(ev) {
      ev.stopPropagation();
      return null;
    }
  
    if (!stay) return console.log("wait");
    else
      return (
        <>
          <div className="black-screen full" onClick={closeReportListingModal}>
            <div className="modal" onClick={(ev) => BlockModal(ev)}>
              <h1>ReportListingModal</h1>
            </div>
          </div>
        </>
      );
  }