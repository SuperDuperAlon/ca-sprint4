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
              src={require("../../assets/img/other/DOGE.jpg")}
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
              63 Reviews
            </div>
            <div className="lh24 mar-b24">
              I am a marine biologist, journalist and photographer and worked
              for Greepeace, WWF International and United Nations Environment
              Program.
            </div>
            <div>
              <div className="fw600 mar-b8">
                {stay.host.fullname} is a Superhost
              </div>
              <div>
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </div>
            </div>
          </div>
          <div className="flex column mar-b8">
            <div className="mar-b32">
              <div>
                Languages: English, Français, Italiano, Русский, Español, Türkçe
              </div>
              <div>Response rate: 100%</div>
              <div>Response time: within an hour</div>
            </div>
            <div>
              <button className="white-open-btn">Contact Host</button>
            </div>
          </div>
        </div>
      </section>
    );
}
