import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service"
import { addStay, updateStay } from "../store/stay.actions"

export function StayEdit(){

    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const navigate = useNavigate()
    const { stayId } = useParams()

    useEffect(() => {
        if (!stayId) return
        loadStay()
    }, [])

    function loadStay() {
        stayService.getById(stayId)
            .then((stay) => setStayToEdit(stay))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/')
            })
    }

    function handleChange({target}){
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (field === 'country' || field === 'city' || field === 'lat' || field === 'lng'){
            setStayToEdit((prevStay) => ({ ...prevStay, loc: {...prevStay.loc, [field]: value} }))
        }
        else setStayToEdit((prevStay) => ({ ...prevStay, [field]: value }))
    }

    async function onSaveStay(ev){
        ev.preventDefault()

        try{
            if(stayToEdit._id){
                const savedStay = await updateStay(stayToEdit)
            }else{
                const savedStay = await addStay(stayToEdit)
            }
            navigate('/')
        }catch(err){
            console.log(err)
        }              
    }

    return <section className="stay-edit">
        <form onSubmit={onSaveStay}>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Name of stay:"
                    value={stayToEdit.name}
                    onChange={handleChange}
                />
                <input type="text"
                    name="type"
                    id="type"
                    placeholder="Type of stay"
                    value={stayToEdit.type}
                    onChange={handleChange}
                />
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={stayToEdit.price}
                    onChange={handleChange}
                />
                <input type="text"
                    name="summary"
                    id="summary"
                    placeholder="Summary"
                    value={stayToEdit.summary}
                    onChange={handleChange}
                />
                <input type="number"
                    name="capacity"
                    id="capacity"
                    placeholder="Guests"
                    value={stayToEdit.capacity}
                    onChange={handleChange}
                />
                <input type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    value={stayToEdit.loc.country}
                    onChange={handleChange}
                />
                <input type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={stayToEdit.loc.city}
                    onChange={handleChange}
                />
                <input type="number"
                    name="lat"
                    id="lat"
                    placeholder="Latitude"
                    value={stayToEdit.loc.lat}
                    onChange={handleChange}
                />
                <input type="number"
                    name="lng"
                    id="lng"
                    placeholder="Longitude"
                    value={stayToEdit.loc.lng}
                    onChange={handleChange}
                />

                <div>
                    <button>{stayToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>

    </section>

}

