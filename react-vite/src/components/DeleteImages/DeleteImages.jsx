import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteImageThunk } from '../../redux/image';
import { getImagesByBusinessIdThunk } from '../../redux/images';
import './DeleteImages.css';

export default function DeleteImages() {
    const {closeModal} = useModal();
    const {busId} = useParams();
    const dispatch = useDispatch();
    const images = useSelector(state => state.images.images);
    const [imagesArray, setImagesArray] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            await dispatch(getImagesByBusinessIdThunk(busId));
        };
        fetchImages();
    }, [dispatch, busId]);

    useEffect(() => {
        if (images?.BusinessImages) {
            setImagesArray(images.BusinessImages);
        }
    }, [images]);

    const handleDelete = async (imageId) => {
        await dispatch(deleteImageThunk(imageId));
        await dispatch(getImagesByBusinessIdThunk(busId));
    };

    return (
        <div id='delete-images-container'>
            <h1 className='delete-img-title'>Delete Images</h1>
            <p>Click on the images you would like to delete</p>
            <div className='images-buttons-container'>
                {imagesArray.map(image => (
                    <button key={image.id} className='image-button' onClick={() => handleDelete(image.id)}>
                        <img className='thumbnail-image' src={image.url} alt='business-image'/>
                    </button>
                ))}
            </div>
            <button onClick={closeModal} style={{height: '40px', width: '100px'}}>Close</button>
        </div>
    );
}