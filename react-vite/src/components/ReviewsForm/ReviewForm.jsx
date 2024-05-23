import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk, editReviewByIdThunk, getReviewByIdThunk } from '../../redux/review';
import './ReviewForm.css'
const ReviewForm = ({ review }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reviewText, setReviewText] = useState(review ? review[0]?.review : '');
    const [starRating, setStarRating] = useState(review ? review[0]?.star_rating : 1);
    const [errors, setErrors] = useState({});
    const { busId } = useParams()
    const user = useSelector(state => state.session.user);
    const { reviewId } = useParams()

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate]);

    useEffect(() => {
        dispatch(getReviewByIdThunk(reviewId))
    }, [dispatch, reviewId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewObj = {
            review: reviewText,
            star_rating: starRating
        };

        const res = await dispatch(createReviewThunk(busId, reviewObj))
        console.log(res)
        const data = review ? await dispatch(editReviewByIdThunk(review.id, reviewObj))
            : await dispatch(createReviewThunk(busId, reviewObj));

        if (data.errors) {
            setErrors(data.errors);
        }else{
            navigate(`/bus/${busId}`)
        }
    };

    return (
        <div className='reviewForm'>
            <h1 className=''>{review ? 'Update your review' : 'Create a review'}</h1>
            <form onSubmit={handleSubmit}>
                <section className='form-section'>
                    <h3>{"Your review"}</h3>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder='Write your review here'
                    ></textarea>
                    {errors.review && <p className="error">{errors.review}</p>}
                </section>
                <section className='form-section-star'>
                    <h3>{"Star Rating"}</h3>
                    <div className='stars'>
                        <div onClick={() => setStarRating(1)} className={starRating > 0 ? 'star active' : 'star'} />
                        <div onClick={() => setStarRating(2)} className={starRating > 1 ? 'star active' : 'star'} />
                        <div onClick={() => setStarRating(3)} className={starRating > 2 ? 'star active' : 'star'} />
                        <div onClick={() => setStarRating(4)} className={starRating > 3 ? 'star active' : 'star'} />
                        <div onClick={() => setStarRating(5)} className={starRating > 4 ? 'star active' : 'star'} />
                    </div>
                    <input
                        type="number"
                        value={starRating}
                        onChange={(e) => setStarRating(e.target.value)}
                        min="1"
                        max="5"
                    />

                    {errors.star_rating && <p className="error">{errors.star_rating}</p>}
                </section>
                <button type='submit'>
                    {review ? `Update Review` : `Create Review`}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
