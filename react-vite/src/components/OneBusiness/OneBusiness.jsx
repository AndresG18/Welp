import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessByIdThunk } from '../../redux/business';
import { getReviewsByBusinessIdThunk } from '../../redux/reviews';
import { getImagesByBusinessIdThunk } from '../../redux/images';
// import {useModal} from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import DeleteBusiness from "../DeleteBusiness";
import DeleteReview from "../DeleteReview";
import EditImages from "../EditImages";
import OpenModalButton from '../OpenModalButton';
import './OneBusiness.css';
import sadface from './sadface.jpg';
import { FaStoreAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";

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

    console.log('BUSINESS -------------> ', bus)
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

    const alternateMsg = `No Phone Number Available...`

    const manySadFaces = [sadface, sadface, sadface, sadface]
    const manyManySadFaces = [...manySadFaces, ...manySadFaces, ...manySadFaces, ...manySadFaces, ...manySadFaces]

    return (
        <div>
            {isLoaded && bus ?

                <div id='busbyid'>

                    <div className='bus-images-bar'>
                        <div className='image-slider'>
                            {!imagesArray.length && manyManySadFaces.map((image, index) => (
                                <div key={index} className='image-container'>
                                    <img className='sadface' src={image} alt='sad-face' />
                                    <div className='overlay'></div>
                                </div>
                            ))}

                            {imagesArray.length > 0 && imagesArray.concat(imagesArray, imagesArray, imagesArray, imagesArray).map((image, index) => (
                                <div key={index} className='image-container'>
                                    <img className='bus-quad-pic' src={image.url} alt='business-image' />
                                    <div className='overlay'></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className='bus-images-bar'>
                        <div className='image-slider'>
                            {imagesArray.length > 0 ? imagesArray.concat(imagesArray, imagesArray, imagesArray, imagesArray).map((image, index) => (
                                <img key={index} className='bus-quad-pic' src={image.url} alt='business-image' />
                            )) : (
                                <img className='bus-prev-img' src={bus.business.preview_image} alt='business-preview' />
                            )}
                        </div>
                    </div> */}

                    <div className="bus-title-block">
                        <h1 className="bus-name" style={{ fontSize: '50px' }}>{bus.business.name}</h1>
                        <div className="review-line" style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                            <FaStar style={{
                                color: bus.business.rating > 4.4 ? '#81FF79' :
                                    bus.business.rating > 3.4 ? '#B6F001' :
                                        bus.business.rating > 2.4 ? '#FFFB4A' :
                                            bus.business.rating > 1.4 ? 'red' :
                                                bus.business.rating > 0 ? 'red' : 'white'
                            }} />
                            <p className="bus-star-reviews">{bus.business.rating} ({reviews.reviews.length} reviews)</p>
                        </div>
                        <p className="bus-hours" style={{ fontSize: '20px', marginLeft: '2px', fontWeight: "bolder" }}> <span id="open-sign">OPEN</span> {bus.business.hours}</p>
                        <div id="category-price-block-onebus">
                            <p className="price" style={{ fontSize: '20px', marginLeft: '2px', color: "#02C585", fontWeight: "bolder" }}>{bus.business.price}</p>

                            <p className="cat-onebus">{bus.business.category_name}</p>
                        </div>
                    </div>

                    <div className="button-reviews-info">
                        <div className="bus-buttons-bar">
                            {
                                sessionUser &&
                                sessionUser.id !== bus.business.owner_id &&
                                !reviews.reviews.find(obj => obj.user_id === sessionUser.id) &&
                                <button className="modal-buttons" id="write-review-button" onClick={reviewClick}>Write Review</button>
                            }
                            {
                                sessionUser &&
                                sessionUser.id === bus.business.owner_id &&
                                <button className="modal-buttons" onClick={updateClick}>Update</button>
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

                        <div className="description-plus-info">
                            <div className="bus-description">
                                <h2 className="description-title">From this business</h2>
                                <p className="description-text">"{bus.business.description}"</p>
                            </div>

                            <div className="info-box">
                                <p className="info-box-1"> <FaStoreAlt /> {bus.business.category_name}</p>
                                <p className="info-box-2">
                                    <FaPhoneAlt /> {phoneArr[bus.business.id - 1] ? phoneArr[bus.business.id - 1] : alternateMsg}
                                </p>
                                <p className="info-box-3"> <FaAddressBook />{bus.business.address}</p>
                                <p className="info-box-4"> <FaLocationArrow />{bus.business.city}, {bus.business.state}</p>
                            </div>

                        </div>


                        <div className="lower-left-bus-info">
                            <div className="lower-left-bus-reviews">
                                <h2 className="reviews-title">Reviews</h2>
                                {!reviews.reviews.length && <p className="no-reviews reviewer-entire-block">Be the first to leave a review!</p>}
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
                                                            <button className="edit-review-btn" onClick={() => redirect(`/bus/${busId}/reviews/${obj.id}/edit`)}>Edit</button>
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
