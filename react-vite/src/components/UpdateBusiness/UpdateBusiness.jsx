import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getBusinessByIdThunk, updateBusinessThunk} from '../../store/businesses';   // check names


function UpdateBusiness(){
    const redirect = useNavigate();
    const spot = useSelector(state => state.businesses.business.busById)

    const {busId} = useParams()
    // const [isLoaded, setIsLoaded] = useState(false)
    const [address, setAddress] = useState('')          // (business?.address || '')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [mainImg, setMainImg] = useState('')
    const [inputError, setInputError] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        async function getBusData(){
           await dispatch(getBusinessByIdThunk(busId));
        //    setIsLoaded(true);
        }
        getBusData();
    }, [dispatch, busId]);

    useEffect(() => {
        if(bus){
            setAddress(bus.address)
            setCity(bus.city)
            setState(bus.state)
            setDescription(bus.description)
            setName(bus.name)
            setPrice(bus.price)
            setMainImg(bus.businessImages[0].url)
        }
    }, [bus])

    function handleErrors(){
        const errorObj = {};
        if(!address) errorObj.err = 'Address is required'
        if(!city) errorObj.err = 'City is required'
        if(!state) errorObj.err = 'State is required'
        if(!name) errorObj.err = 'Name is required'
        if(price < 1) errorObj.err = 'Price per night is required'
        if(description.length < 30) errorObj.description = 'Description needs 30 or more characters'
        if(!mainImg) errorObj.mainImg = 'Preview image is required'
        setInputError(errorObj)
        
        if(inputError.err){
            return true;
        }
        return false;
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        if(handleErrors() === true){
            return;
        }
        const updatedObj = {address, city, state, description, name, price, mainImg}
        await dispatch(updateSpot(busId, updatedObj))
        redirect(`/${bus.id}`)
    }

    return(
        <form onSubmit={handleSubmit}>
        <h1 style={{fontSize: '40px'}}>Update your business</h1>
        <div id='update-bus-form-section1'>
            <h3 className='update-section-form-title' style={{fontSize: '30px'}}>Business location</h3>
            <label htmlFor="address"><input id="address" type="text" style={{height: '30px', width: '300px', fontSize: '25px'}} value={address} onChange={e => setAddress(e.target.value)}/></label>
            <label htmlFor="city"><input id="city" type="text" style={{height: '30px', width: '300px', fontSize: '25px'}} value={city} onChange={e => setCity(e.target.value)}/></label>
            <label htmlFor="state"><input id="state" type="text" style={{height: '30px', width: '300px', fontSize: '25px'}} value={state} onChange={e => setState(e.target.value)}/></label>
        </div>

        <div id='update-bus-form-section2'>
            <h3 className='update-section-form-title' style={{fontSize: '30px'}}>Business description</h3>
            <label htmlFor="description"><textarea id="description" rows='2' cols='150' style={{fontSize: '25px'}} value={description}
            onChange={e => setDescription(e.target.value)}/></label>
        </div>

        <div id='update-bus-form-section3'>
            <h3 className='update-section-form-title' style={{fontSize: '30px'}}>Business name</h3>
            <label htmlFor="bus-name"><input id="bus-name" type="text" style={{height: '30px', width: '300px', fontSize: '25px'}} value={name} onChange={e => setName(e.target.value)}/></label>
        </div>

        <div id='update-bus-form-section4'>
            <h3 className='update-section-form-title' style={{fontSize: '30px'}}>Business price</h3>
            <label htmlFor="price"><input id="price" type="number" style={{height: '30px', width: '300px', fontSize: '25px'}} value={price} onChange={e => setPrice(e.target.value)}/></label>
        </div>
        {/* <div id='update-spot-form-section5'>
            <h3 className='update-section-form-title'>Liven up your spot with photos</h3>
            <p className='update-section-caption'>Submit a link to at least one photo to publish your spot.</p>
            <label htmlFor="main-img"><input id="main-img" type="text" placeholder="Preview Image URL"/></label>
            <label htmlFor="img1"><input id="img1" type="text" placeholder="Image URL"/></label>
            <label htmlFor="img2"><input id="img2" type="text" placeholder="Image URL"/></label>
            <label htmlFor="img3"><input id="img3" type="text" placeholder="Image URL"/></label>
            <label htmlFor="img4"><input id="img4" type="text" placeholder="Image URL"/></label>

        </div> */}
        <button type='submit' style={{height: '40px', width: '150px', fontSize: '25px', margin: '20px 0px'}}>Update Business</button>
        </form>
    )
}

export default UpdateBusiness;