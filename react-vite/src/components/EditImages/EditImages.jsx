// import React from 'react';
import { useModal } from '../../context/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteImages from '../DeleteImages';
import './EditImages.css';

export default function EditImages() {
    const {closeModal} = useModal();
    const {busId} = useParams();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/bus/${busId}/images/new`);
        closeModal();
    }

    return (
        <div id='edit-images-container'>
            <h1>Edit Images</h1>
            <div className='buttons-container'>
                <button id='edit-btn' style={{height: '30px', width: '130px'}} onClick={handleEdit}>Add Images</button>
                <OpenModalButton id='delete-btn' buttonText='Delete Images' modalComponent={<DeleteImages busId={busId}/>} beforeOpen={closeModal}/>
            </div>
        </div>
    );
}