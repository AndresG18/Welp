import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessByIdThunk } from '../../redux/business';
import { getReviewsByBusinessIdThunk } from '../../redux/reviews';
import { getImagesByBusinessIdThunk } from '../../redux/images';
// import {useModal} from "../../context/Modal";
import DeleteBusiness from "../DeleteBusiness";
import DeleteReview from "../DeleteReview";
import EditImages from "../EditImages";
import OpenModalButton from '../OpenModalButton';
import './OneBusiness.css';

function OneBusiness() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userList, setUserList] = useState([]);
    const dispatch = useDispatch();
    const { busId } = useParams();
    const bus = useSelector(state => state.business.business);
    const reviews = useSelector(state => state.reviews.reviews);
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.images.images);
    const redirect = useNavigate();

    const [imagesArray, setImagesArray] = useState([]); // Added for carousel


    // const {setModalContent} = useModal();

    // console.log('BUSINESS -------------> ', bus)
    // console.log('REVIEWS -------------->', reviews)
    // console.log('USER ---------------->', sessionUser)
    // console.log('IMAGES -------------->', images)

    useEffect(() => {
        async function getBusData() {
            await dispatch(getBusinessByIdThunk(busId));
            await dispatch(getReviewsByBusinessIdThunk(busId));
            await dispatch(getImagesByBusinessIdThunk(busId));
            setIsLoaded(true);
        }
        getBusData();
    }, [dispatch, busId]);      // removed isLoaded

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users/');
            const data = await res.json();
            setUserList(data.users);
        };
        fetchUsers();
    }, []);


    useEffect(() => {
        if (images?.BusinessImages) {
            setImagesArray(images.BusinessImages);
        }
    }, [images]);

    // const reserveClick = () => {
    //     alert('Feature coming soon')
    // }

    const updateClick = () => {
        redirect(`/bus/${busId}/edit`)
    }

    const reviewClick = () => {
        redirect(`/bus/${busId}/reviews/new`)
    }

    const phoneArr = [
        '818-111-1111',
        '202-495-2222',
        '213-304-3333',
        '416-775-4444',
        '481-235-5555',
        '308-952-6666',
        '556-954-7777',
        '626-800-8888',
        '818-616-9999',
        '818-321-0000',
        '909-751-1234',
        '213-954-5678',
        '818-493-9012',
        '466-118-3456',
        '312-418-7890',
        '781-731-1234'
    ]

    return (
        <div>
            {isLoaded && bus ?

                <div id='busbyid'>

                    <div className='bus-images-bar'>
                        <div className='image-slider'>
                            {imagesArray.length > 0 && imagesArray.concat(imagesArray, imagesArray, imagesArray, imagesArray).map((image, index) => (
                                <img key={index} className='bus-quad-pic' src={image.url} alt='business-image' />
                            ))}
                        </div>
                    </div>

                    {/* <div className='bus-images-bar'>
                        <img className="bus-quad-pic" style={{ height: '250px', width: '480px' }} src={bus.business.preview_image} alt="business-image" />
                        {images && images.BusinessImages && images.BusinessImages.map((image, index) => (
                            <img
                                key={index}
                                className='bus-quad-pic'
                                style={{ height: '250px', width: '480px' }}
                                src={image.url}
                                alt='business-image'
                            />
                        ))}
                    </div> */}

                    <div className="bus-title-block">
                        <h1 className="bus-name" style={{ fontSize: '50px' }}>{bus.business.name}</h1>
                        <div className="review-line" style={{ fontSize: '20px' }}>
                            <img className="review-star" src="" alt="star" />
                            <p className="bus-star-reviews">{bus.business.rating} ({reviews ? reviews.length : 0} reviews)</p>
                        </div>
                        <p className="bus-hours" style={{ fontSize: '20px' }}>{bus.business.hours}</p>
                    </div>

                    <div className="mid-section">
                        <div className="bus-buttons-bar">
                            {
                                sessionUser &&
                                sessionUser.id !== bus.business.owner_id &&
                                !reviews.reviews.find(obj => obj.user_id === sessionUser.id) &&
                                <button className="bus-review-btn" style={{ height: '30px', width: '100px' }} onClick={reviewClick}>Write Review</button>
                            }
                            {
                                sessionUser &&
                                sessionUser.id === bus.business.owner_id &&
                                <button className="bus-update-btn" style={{ height: '30px', width: '100px' }} onClick={updateClick}>Update</button>
                            }
                            {
                                sessionUser &&
                                sessionUser.id === bus.business.owner_id &&
                                (<OpenModalButton className='delete-bus' buttonText='Delete' modalComponent={<DeleteBusiness busId={busId} />} />)
                            }
                            {
                                sessionUser &&
                                sessionUser.id === bus.business.owner_id &&
                                (<OpenModalButton className='edit-bus-images' buttonText='Images' modalComponent={<EditImages busId={busId} />} />)
                            }
                        </div>

                        <div className="info-box-right">
                            <h3 className="info-box-1" style={{ fontSize: '30px' }}>{bus.business.category_name}</h3>
                            <h4 className="info-box-2" style={{ fontSize: '22px' }}>{phoneArr[bus.business.id - 1]}</h4>
                            <h4 className="info-box-3" style={{ fontSize: '22px' }}>{bus.business.address}</h4>
                            <h4 className="info-box-4" style={{ fontSize: '22px' }}>{bus.business.city}, {bus.business.state}</h4>
                        </div>

                        <div className="lower-left-bus-info">
                            <div className="bus-description">
                                <h2 className="description-text">From this business</h2>
                                <h3>{bus.business.description}</h3>
                            </div>

                            <div className="lower-left-bus-reviews">
                                <h2 className="reviews-title">Reviews</h2>
                                {reviews.reviews && reviews.reviews.map(obj => {
                                    const user = userList ? userList.find(user => user.id === obj.user_id) : null;
                                    return (
                                        <div className="all-reviews" key={obj.id}>

                                            <div className="reviewer-entire-block">
                                                <div className="reviewer-profile-pic">
                                                    {
                                                        user && <img style={{ height: '100px', width: '100px' }}
                                                            src={user ? user.profile_pic : null} alt="reviewer-pic" />
                                                    }
                                                </div>

                                                <div className="reviewer-text-block">
                                                    <p className="reviewer-name">{user ? user.username : null}</p>

                                                    <p className="review-sentence">{obj.review}</p>

                                                    <div className="star-rating-group">
                                                        <div className='stars'>
                                                            <div className={obj.star_rating > 0 ? 'star active' : 'star'} />
                                                            <div className={obj.star_rating > 1 ? 'star active' : 'star'} />
                                                            <div className={obj.star_rating > 2 ? 'star active' : 'star'} />
                                                            <div className={obj.star_rating > 3 ? 'star active' : 'star'} />
                                                            <div className={obj.star_rating > 4 ? 'star active' : 'star'} />
                                                        </div>
                                                    </div>

                                                    {
                                                        sessionUser &&
                                                        obj.user_id === sessionUser.id &&
                                                        (<div className="reviews-button-block">
                                                            <OpenModalButton buttonText='Delete' modalComponent={<DeleteReview busId={busId} reviewId={obj.id} />} />
                                                            <button onClick={() => redirect(`/bus/${busId}/reviews/${obj.id}/edit`)} className="edit-delete-button">Edit</button>
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="reviews-white-space"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div> : (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">Loading...</div>
                    </div>
                )
            }
        </div>
    )
}

export default OneBusiness;
