import React from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import './DeleteReview.css';
import { getReviewsByBusinessIdThunk } from '../../redux/reviews';
import { deleteReviewByIdThunk } from '../../redux/review';
import { getBusinessByIdThunk } from '../../redux/business';

export default function DeleteReview({busId, reviewId}) {

  const {closeModal} = useModal()
  const dispatch = useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault()

    await dispatch(deleteReviewByIdThunk(reviewId))
    await dispatch(getBusinessByIdThunk(busId))
    await dispatch(getReviewsByBusinessIdThunk(busId))
    closeModal()
  }

  return (
    <div id='delete-review-container'>
      <div className='title'>
        <h1 style={{fontSize: '40px'}}>Delete review</h1>
      </div>
      <div className='buttons-container'>
        <button id='yes-btn' onClick={(e) => handleSubmit(e)}>YES</button>
        <button id='no-btn' onClick={closeModal}>NO</button>
      </div>
    </div>
  )
}