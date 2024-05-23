import  { useState, useEffect } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createImageThunk } from '../../redux/image';

const BusinessImageForm = ( ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState({});

    const user = useSelector(state => state.session.user);
    const {busId} = useParams()
    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        const imageObj = { url };
        const data = await dispatch(createImageThunk(busId, imageObj));
        
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setUrl(''); // Clear the input field after successful submission
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
                </section>
                {errors.url && <p className="error">{errors.url}</p>}
                <button type='submit'>Add Image</button>
            </form>
        </div>
    );
};

export default BusinessImageForm;
