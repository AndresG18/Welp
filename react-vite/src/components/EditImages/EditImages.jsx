import { useModal } from '../../context/Modal';
// import { useDispatch, } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
// import { deleteImageThunk } from '../../redux/image';
// import { getBusinessByIdThunk } from '../../redux/business';
// import { getReviewsByBusinessIdThunk } from '../../redux/reviews';
import './EditImages.css';

export default function EditImages(){
    const {closeModal} = useModal()
    // const dispatch = useDispatch()
    const {busId} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // await dispatch(deleteImageThunk(imageId))
        // await dispatch(getBusinessByIdThunk(busId))
        // await dispatch(getReviewsByBusinessIdThunk(busId))
        closeModal()
    }

    const handleEdit = () => {
        navigate(`/bus/${busId}/images/new`)
        closeModal()
    }

    return (
        <div id='edit-images-container'>
            <p>Show thumbnail of all images</p>
            <p>By clicking on thumbnail, delete that image?</p>
            <p>Unsure how to go about this... o_0?</p>
            <div className='buttons-container'>
                <button id='edit-btn' onClick={handleEdit}>Edit Images</button>
                <button id='delete-btn' onClick={(e) => handleSubmit(e)}>Delete Image</button>
            </div>
        </div>
    )
}