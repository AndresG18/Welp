import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createBusinessThunk} from '../../store/businesses';     // check thunk name

function CreateBusiness(){
    const dispatch = useDispatch();
    const redirect = useNavigate();

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [mainImg, setMainImg] = useState('')
    const [smImg1, setSmImg1] = useState('')
    const [smImg2, setSmImg2] = useState('')
    const [smImg3, setSmImg3] = useState('')
    const [smImg4, setSmImg4] = useState('')
    const [inputError, setInputError] = useState({})

    const hasErrors = () => {
        let errorObj = {};
        if(!address) errorObj.address = 'Address is required'
        if(!city) errorObj.city = 'City is required'
        if(!state) errorObj.state = 'State is required'
        if(!name) errorObj.name = 'Name is required'
        if(!price || price < 1) errorObj.price = 'Price is required, and must be greater than 0'
        if(!description) errorObj.description = 'Description is required'
        if(!mainImg) errorObj.mainImg = 'Preview image is required'
        return errorObj
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newErr = hasErrors()
        setInputError(newErr)
        
        if(Object.keys(newErr).length === 0){
            const userInput = {address, city, state, name, price, description}
            const images = {smImg1, smImg2, smImg3, smImg4}
            const prevImg = mainImg

            // for(let img in images){
            //     if(!img) images[img] = '/chicken-no-img.jpg'
            // }

            const newBusiness = await dispatch(createBusinessThunk(userInput, images, prevImg))
            redirect(`/${newBusiness.id}`)
        }
        // if(Object.keys(newErr).length === 0){
        //     const images = [mainImg, smImg1, smImg2, smImg3, smImg4]
        //     const userInput = {address, city, state, country, name, price, description, lat: 0, lng: 0}
        //     const newSpot = await dispatch(createSpot(userInput, images))
        //     if(newSpot) redirect(`/spots/${newSpot.id}`)
        // }

    }

    return(
        <form onSubmit={handleSubmit}>
        <h1 style={{fontSize: '40px'}}>Add Your Business!</h1>

        <div id='create-bus-form-section1'>
            <h3 className='section-form-title' style={{fontSize: '30px'}}>Business location</h3>
            <label htmlFor="address"><input id="address" type="text" placeholder="Street Address" style={{height: '30px', width: '300px', fontSize: '25px'}} value={address} onChange={e => setAddress(e.target.value)}/></label>
            {inputError.address && <p style={{color: 'red', fontSize: '22px'}}>{inputError.address}</p>}
            <label htmlFor="city"><input id="city" type="text" placeholder="City" style={{height: '30px', width: '300px', fontSize: '25px'}} value={city} onChange={e => setCity(e.target.value)}/></label>
            {inputError.city && <p style={{color: 'red', fontSize: '22px'}}>{inputError.city}</p>}
            <label htmlFor="state"><input id="state" type="text" placeholder="State" style={{height: '30px', width: '300px', fontSize: '25px'}} value={state} onChange={e => setState(e.target.value)}/></label>
            {inputError.state && <p style={{color: 'red', fontSize: '22px'}}>{inputError.state}</p>}
        </div>

        <div id='create-bus-form-section2'>
            <h3 className='section-form-title' style={{fontSize: '30px'}}>Business description</h3>
            <label htmlFor="description"><textarea id="description" rows='2' cols='150' placeholder="?????" style={{fontSize: '25px'}}value={description}
            onChange={e => setDescription(e.target.value)}/></label>
            {inputError.description && <p style={{color: 'red', fontSize: '22px'}}>{inputError.description}</p>}
        </div>

        <div id='create-bus-form-section3'>
            <h3 className='section-form-title' style={{fontSize: '30px'}}>Business name</h3>
            <label htmlFor="bus-name"><input id="bus-name" type="text" placeholder="Name of business" style={{height: '30px', width: '300px', fontSize: '25px'}} value={name} onChange={e => setName(e.target.value)}/></label>
            {inputError.name && <p style={{color: 'red', fontSize: '22px'}}>{inputError.name}</p>}
        </div>

        {/* <div id='create-bus-form-section4'>
            <h3 className='section-form-title' style={{fontSize: '30px'}}>Business price</h3>
            <label htmlFor="price"><input id="price" type="number" placeholder="Price" style={{height: '30px', width: '300px', fontSize: '25px'}} value={price} onChange={e => setPrice(e.target.value)}/></label>
            {inputError.price && <p style={{color: 'red', fontSize: '22px'}}>{inputError.price}</p>}
        </div> */}

        <div id='create-bus-form-section5'>
            <h3 className='section-form-title' style={{fontSize: '30px'}}>Business images</h3>
            <label htmlFor="main-img"><input id="main-img" type="text" placeholder="Preview Image URL" style={{height: '30px', width: '300px', fontSize: '25px'}} value={mainImg} onChange={e => setMainImg(e.target.value)}/></label>
            {inputError.mainImg && <p style={{color: 'red', fontSize: '22px'}}>{inputError.mainImg}</p>}

            <label htmlFor="img1"><input id="img1" type="text" placeholder="Image URL" style={{height: '30px', width: '300px', fontSize: '25px'}}
            value={smImg1 === '' ? '' : smImg1} defaultValue={smImg1 === '' ? '/chicken-no-img.jpg' : undefined} onChange={e => setSmImg1(e.target.value)}/></label>
            <label htmlFor="img2"><input id="img2" type="text" placeholder="Image URL" style={{height: '30px', width: '300px', fontSize: '25px'}}
            value={smImg2 === '' ? '' : smImg2} defaultValue={smImg2 === '' ? '/chicken-no-img.jpg' : undefined} onChange={e => setSmImg2(e.target.value)}/></label>
            <label htmlFor="img3"><input id="img3" type="text" placeholder="Image URL" style={{height: '30px', width: '300px', fontSize: '25px'}}
            value={smImg3 === '' ? '' : smImg3} defaultValue={smImg3 === '' ? '/chicken-no-img.jpg' : undefined} onChange={e => setSmImg3(e.target.value)}/></label>
            <label htmlFor="img4"><input id="img4" type="text" placeholder="Image URL" style={{height: '30px', width: '300px', fontSize: '25px'}}
            value={smImg4 === '' ? '' : smImg4} defaultValue={smImg4 === '' ? '/chicken-no-img.jpg' : undefined} onChange={e => setSmImg4(e.target.value)}/></label>

            {/* <label htmlFor="img1"><input id="img1" type="text" placeholder="Image URL" value={smImg1} onChange={e => setSmImg4(e.target.value)}/></label>
            <label htmlFor="img2"><input id="img2" type="text" placeholder="Image URL" value={smImg2} onChange={e => setSmImg4(e.target.value)}/></label>
            <label htmlFor="img3"><input id="img3" type="text" placeholder="Image URL" value={smImg3} onChange={e => setSmImg4(e.target.value)}/></label>
            <label htmlFor="img4"><input id="img4" type="text" placeholder="Image URL" value={smImg4} onChange={e => setSmImg4(e.target.value)}/></label> */}

        </div>
        <button type='submit' style={{height: '40px', width: '100px', fontSize: '25px', margin: '20px 0px'}}>Add Business</button>
        </form>
    )
}

export default CreateBusiness;