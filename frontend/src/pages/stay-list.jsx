import { ImgCarousel } from "../cmps/img-carousel";
import { utilService } from "../services/util.service";
import { IoIosStar } from "react-icons/io";




export function StayList({stays, onRemoveStay, onEditStay, onOpenStay}){
    return <section >
        <ul className="stay-list full">
                    {stays.map(stay =>
                        <li onClick={(ev)=>onOpenStay(ev,stay)} className="stay-preview" key={stay._id}>
                            {/* <button onClick={(ev)=>onRemoveStay(ev,stay._id)} className="remove-btn">X</button> */}
                            <ImgCarousel imgs={stay.imgUrls}/> 
                            {/* <img className="stay-img" src={require(`../assets/img/${stay.imgUrls[0]}.jpg`)} /> */}
                            <div className='flex space-between'>
                                <h4>{stay.loc.city}, {stay.loc.country}</h4>
                                <h4>{!!stay.reviews.length && <span className="flex center"><IoIosStar/> {stay.reviews.reduce((acc, review) => review.rate + acc, 0) / stay.reviews.length}</span>}</h4>
                            </div>
                            <p>{utilService.getDistanceFromLatLonInKm(31.771959, 35.217018, stay.loc.lat, stay.loc.lng)} kilometers away</p>
                            <p>{utilService.randomDate(new Date(), new Date(2024, 0, 1))}</p>
                            <h4>${stay.price} <span>night</span>
                            <button onClick={(ev)=>onEditStay(ev,stay)}>Edit</button></h4>


                        </li>)
                    }
                </ul>
    </section>
}