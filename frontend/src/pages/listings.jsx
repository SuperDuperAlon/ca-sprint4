import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImgCarousel } from "../cmps/img-carousel"
import { stayService } from "../services/stay.service"
import { AiFillStar } from "react-icons/ai"
import { AppHeader } from "../cmps/app-header"

export function Listings(){
    const { hostId } = useParams()
    const [listings, setListings] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        // loadOrders(host)
        // loadHost(hostId)
        loadListings()
    },[])

    async function loadListings(){
        try{
            const listings = await stayService.getListings(hostId)
            setListings(listings)
        }
        catch (err){
            console.log(err)
        }
    
    }

    if (!listings) return <div>Loading...</div>
    return <section className="listings-main">
        <AppHeader origin={'dashboard'}/>
        <nav>
                <button className='dashboard-btn mar-r8' onClick={()=>navigate(`/dashboard/${hostId}`)}>Reservations</button>
                <button className='dashboard-btn ' onClick={()=>navigate(`/listings/${hostId}`)}>Listings</button>
            </nav>
           <div className="listings"> 
        <ul className="stay-list">
        {listings.map((stay) => (
          <li
            className="stay-preview"
            key={stay._id}
          >
            {/* <button onClick={(ev)=>onRemoveStay(ev,stay._id)} className="remove-btn">X</button> */}
            <ImgCarousel imgs={stay.imgUrls} />
            {/* <img className="stay-img" src={require(`../assets/img/${stay.imgUrls[0]}.jpg`)} /> */}
            <div className="flex space-between">
              <h4>
                {stay.type} in {stay.loc.city}
              </h4>
              <h4>
                {!!stay.reviews.length && (
                  <span className="flex center">
                    <AiFillStar />{" "}
                    {`${stay.reviewsRate}`}
                    {/* {stay.reviews.reduce(
                      (acc, review) => review.rate + acc,0) / stay.reviews.length }
                    {" "}({stay.reviews.length}) */}
                  </span>
                )}
              </h4>
            </div>
            <p className="over-flow">{stay.name}</p>
            <p>{stay.beds > 1 ? stay.beds + ' beds' : stay.beds + ' bed'} </p>
            {/* <p>
              {utilService.getDistanceFromLatLonInKm(
                31.771959,
                35.217018,
                stay.loc.lat,
                stay.loc.lng
              )}{" "}
              kilometers away
            </p>
            <p>{utilService.randomDate(new Date(), new Date(2024, 0, 1))}</p> */}
            <h4 className="pad-t8">
              ${stay.price} <span>night</span>
            </h4>
            {/* <button onClick={(ev)=>onEditStay(ev,stay)}>Edit</button> */}
          </li>
        ))}
      </ul>
      </div>
    </section>

}