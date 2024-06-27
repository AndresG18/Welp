import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createImageThunk } from '../../redux/image';
import { getBusinessByIdThunk } from '../../redux/business';

const BusinessImageForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState({});

    const user = useSelector(state => state.session.user);
    const business = useSelector(state => state?.business?.business?.business)
    const { busId } = useParams()
    // console.log(business)

    useEffect(() => {
        dispatch(getBusinessByIdThunk(busId))
        if (!user) navigate('/');
    }, [user, navigate, dispatch, busId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const imageObj = { url };
        const data = await dispatch(createImageThunk(busId, imageObj));

        if (data.errors || data.message) {
            setErrors(data?.errors);
        } else {
            setUrl('');
            navigate(`/bus/${busId}`);
        }
    };

    return (
        <div className='imageForm'>
            <h1>Add Image</h1>
            <form onSubmit={handleSubmit}>
                <section className='form-section'>
                    <h3>Image URL</h3>
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='Enter image URL'
                    />
                    {errors?.url && <p className="error">{errors?.url}</p>}
                </section>
                <button type='submit'>Add Image</button>
            </form>
        </div>
    );
};

export default BusinessImageForm;
