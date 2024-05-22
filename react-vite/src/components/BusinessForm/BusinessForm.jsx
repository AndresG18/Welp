import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createBusinessThunk } from '../../redux/business'
import { editBusinessThunk } from '../../redux/business';
import React from 'react';
const BusinessForm = ({ bus }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category_id, setCategoryId] = useState(bus ? bus.category_id : '')
    const [name, setName] = useState(bus ? bus.name : '');
    const [address, setAddress] = useState(bus ? bus.address : '');
    const [city, setCity] = useState(bus ? bus.city : '');
    const [state, setState] = useState(bus ? bus.state : '');
    const [hours, setHours] = useState(bus ? bus.hours : '');
    const [description, setDescription] = useState(bus ? bus.description : '');
    const [previewImage, setPreviewImage] = useState(bus ? bus.previewImage : '');
    const [price, setPrice] = useState(bus? bus.price : '')
    const [errors, setErrors] = useState({});

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (!user) navigate('/')
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const busObj = {
            name,
            category_id ,
            address,
            city ,
            state ,
            hours ,
            description,
            price,
            preview_image:previewImage,
        }
        console.log()
        const data = bus ? await dispatch(editBusinessThunk(bus.id,busObj)) : await dispatch(createBusinessThunk(busObj))
        if (data.errors){

            setErrors(data.errors)
        }
        console.log(Object.values(errors).length > 0)
        console.log(errors.name)
    }

    return (
        <div className='busForm'>
            <h1 className=''>{bus ? 'Update your business' : 'Create a business'}</h1>
            <form onSubmit={handleSubmit}>
                <section className='form-section'>
                    <h3>{"What will be the name of your business?"}</h3>
                    <input type='text'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder='Name' >
                    </input>
                </section>
                {errors.name && <p className="error">{errors.name}</p>}
                <section className='form-section'>
                    <h3>{"What is the business category?"}</h3>
                    <select value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value={null}>Select one</option>
                        <option value={1}>Bakery</option>
                        <option value={2}>Restaurant</option>
                        <option value={3}>Cafe</option>
                        <option value={4}>Store</option>
                    </select>
                </section>
                {errors.category_id && <p className="error">{errors.category_id}</p>}
                <section className='form-section'>
                    <h3>Set your business location</h3>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </section>
                <section className='form-section'>
                    <h3>{"Set your business address"}</h3>
                    <input type='text'
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        placeholder='Address' >
                    </input>
                </section>
                {errors.address && <p className="error">{errors.address}</p>}
                <section className='form-section'>
                    <h3>{"Set your business hours"}</h3>
                    <input type='text'
                        value={hours}
                        onChange={(e) => { setHours(e.target.value) }}
                        placeholder='ex: 7am - 8pm' >
                    </input>
                </section>
                {errors.hours && <p className="error">{errors.hours}</p>}
                <section className='form-section'>
                    <h3>{"What is your business about?"}</h3>
                    <textarea type='text'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        placeholder='Description' >
                    </textarea>
                </section>
                {errors.description && <p className="error">{errors.description}</p>}
                <section className='form-section'>
                    <h3>{"What is the price range of your business?"}</h3>
                    <ul>
                        <li> $ = 10 - 15 </li>
                        <li> $$ = 15 - 40 </li>
                        <li> $$$ = 40 + </li>
                    </ul>
                    <select value={price} onChange={(e) => setPrice(e.target.value)}>
                        <option value={null}>Select one</option>
                        <option value={'Low'}>$ </option>
                        <option value={"Medium"}>$$</option>
                        <option value={"High"}>$$$</option>
                    </select>
                </section>
                {errors.price && <p className="error">{errors.price}</p>}
                <section className='form-section'>
                    <h3>{"What will be your business's preview image?"}</h3>
                    <input type='text'
                        value={previewImage}
                        onChange={(e) => { setPreviewImage(e.target.value) }}
                        placeholder='URL' >
                    </input>
                </section>
                {errors.preview_image && <p className="error">{errors.preview_image}</p>}
                <button type='submit'>
                    {bus ? `Update Business ` : `Create Business`}
                </button>
            </form>
        </div>
    );
};

export default BusinessForm;
