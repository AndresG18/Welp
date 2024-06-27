import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBusinessThunk, editBusinessThunk } from '../../redux/business';
import './BusinessForm.css';

const BusinessForm = ({ bus }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category_id, setCategoryId] = useState(bus ? bus.category_id : '');
    const [name, setName] = useState(bus ? bus.name : '');
    const [address, setAddress] = useState(bus ? bus.address : '');
    const [city, setCity] = useState(bus ? bus.city : '');
    const [state, setState] = useState(bus ? bus.state : '');
    const [hours, setHours] = useState(bus ? bus.hours : '');
    const [description, setDescription] = useState(bus ? bus.description : '');
    const [previewImage, setPreviewImage] = useState(bus ? bus.preview_image : '');
    const [price, setPrice] = useState(bus ? bus.price : '');
    const [latitude, setLatitude] = useState(bus ? bus.latitude : '');
    const [longitude, setLongitude] = useState(bus ? bus.longitude : '');
    const [daysOpen, setDaysOpen] = useState(bus ? bus.days_open : '');
    const [errors, setErrors] = useState({});

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = {};
        if (!category_id) validationErrors.category_id = "Category is required.";
        if (!name || name.length > 30) validationErrors.name = "Name is required and must be 30 characters or less.";
        if (!address || address.length > 40) validationErrors.address = "Address is required and must be 40 characters or less.";
        if (!city || city.length > 20) validationErrors.city = "City is required and must be 20 characters or less.";
        if (!state || state.length > 20) validationErrors.state = "State is required and must be 20 characters or less.";
        if (!description || description.length > 200) validationErrors.description = "Description is required and must be 200 characters or less.";
        if (!price) validationErrors.price = "Price range is required.";
        if (!previewImage) validationErrors.preview_image = "Preview image URL is required.";
        if (!latitude || latitude < -90 || latitude > 90) validationErrors.latitude = "Latitude is required and must be between -90 and 90.";
        if (!longitude || longitude < -180 || longitude > 180) validationErrors.longitude = "Longitude is required and must be between -180 and 180.";
        if (!daysOpen) validationErrors.days_open = "Days of week open are required.";
        if (!hours) validationErrors.hours = "Hours are required.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const busObj = {
            category_id,
            name,
            address,
            city,
            state,
            hours,
            description,
            price,
            preview_image: previewImage,
            latitude,
            longitude,
            days_open: daysOpen
        };

        const data = bus ? await dispatch(editBusinessThunk(bus.id, busObj)) : await dispatch(createBusinessThunk(busObj));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate(`/bus/${data.id}`);
        }
    };

    return (
        <div className='busForm'>
            <h1>{bus ? 'Update your business' : 'Create a business'}</h1>
            <form onSubmit={handleSubmit}>
                <section className='form-section'>
                    <h3>What will be the name of your business?</h3>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </section>
                <section className='form-section'>
                    <h3>What is the business category?</h3>
                    <select value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Select one</option>
                        <option value={1}>Bakery</option>
                        <option value={2}>Restaurant</option>
                        <option value={3}>Cafe</option>
                        <option value={4}>Store</option>
                    </select>
                    {errors.category_id && <p className="error">{errors.category_id}</p>}
                </section>
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
                    <h3>Set your business address</h3>
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                    {errors.address && <p className="error">{errors.address}</p>}
                </section>
                <section className='form-section'>
                    <h3>Set your business hours</h3>
                    <input
                        type='text'
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder='ex: 7am - 8pm'
                    />
                    {errors.hours && <p className="error">{errors.hours}</p>}
                </section>
                <section className='form-section'>
                    <h3>What is your business about?</h3>
                    <textarea
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                    ></textarea>
                    {errors.description && <p className="error">{errors.description}</p>}
                </section>
                <section className='form-section'>
                    <h3>What is the price range of your business?</h3>
                    <ul>
                        <li>$ = 10 - 15</li>
                        <li>$$ = 15 - 40</li>
                        <li>$$$ = 40+</li>
                    </ul>
                    <select value={price} onChange={(e) => setPrice(e.target.value)}>
                        <option value="">Select one</option>
                        <option value='Low'>$</option>
                        <option value='Medium'>$$</option>
                        <option value='High'>$$$</option>
                    </select>
                    {errors.price && <p className="error">{errors.price}</p>}
                </section>
                <section className='form-section'>
                    <h3>What will be your business's preview image?</h3>
                    <input
                        type='text'
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        placeholder='URL'
                    />
                    {errors.preview_image && <p className="error">{errors.preview_image}</p>}
                </section>
                <section className='form-section'>
                    <h3>Set your business coordinates</h3>
                    <input
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Latitude"
                    />
                    {errors.latitude && <p className="error">{errors.latitude}</p>}
                    <input
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Longitude"
                    />
                    {errors.longitude && <p className="error">{errors.longitude}</p>}
                </section>
                <section className='form-section'>
                    <h3>What days of the week is your business open?</h3>
                    <input
                        type='text'
                        value={daysOpen}
                        onChange={(e) => setDaysOpen(e.target.value)}
                        placeholder='Days of Week Open'
                    />
                    {errors.days_open && <p className="error">{errors.days_open}</p>}
                </section>
                <button type='submit'>
                    {bus ? 'Update Business' : 'Create Business'}
                </button>
            </form>
        </div>
    );
};

export default BusinessForm;
