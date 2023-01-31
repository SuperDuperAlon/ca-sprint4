import { Link } from "react-router-dom";
import { MdStar } from "react-icons/md";

export function StayDetailsHostDetails({ stay }) {
  if (!stay) return console.log("booboo");
  else
    return (
      <section className="stay-details-host-details mar-b24 ">
        <div className="img-desc">
          <div className="avatar-lg mar-r8">
            {" "}
            <img
              src={require("../../assets/img/people/0.jpg")}
              alt="avatar-lg"
            />
          </div>
          <div className="flex column justify-center mar-b24">
            <div className="lh26 fw600 fs22">
              Hosted by {stay.host.fullname}
            </div>
            <div className="lh18 fs14 grey-71 pad-t8">Joined in March 2016</div>
          </div>
        </div>
        <div className="host-details">
          <div>
            <div className="fw600 mar-b24">
              <MdStar />
              <button className="link">
                <Link to="#">{stay.reviews.length} reviews</Link>{" "}
              </button>
            </div>
            <div className="lh24 mar-b24">{stay.host.about}</div>
            <div>
              {stay.host.isSuperhost && (
                <>
                  <div className="fw600 mar-b8">
                    {stay.host.fullname} is a Superhost
                  </div>
                  <div>
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                  </div>
                </>
              )}

              {!stay.host.isSuperhost && <></>}
            </div>
          </div>
          <div className="flex column mar-b8">
            <div className="mar-b32">
              <div>
                Languages: English, Français, Italiano, Русский, Español, Türkçe
              </div>
              <div>Response rate: 100%</div>
              <div>Response time: {stay.host.responseTime}</div>
            </div>
            <div>
              <button className="white-open-btn">Contact Host</button>
            </div>
          </div>
        </div>
      </section>
    );
}
