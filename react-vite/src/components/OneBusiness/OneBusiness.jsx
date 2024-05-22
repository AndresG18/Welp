import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBusinessByIdThunk} from '../../redux/business';            
import {getReviewsByBusinessIdThunk} from '../../redux/reviews';           
import {getImagesByBusinessIdThunk} from '../../redux/images';
// import {useModal} from "../../context/Modal";               
import DeleteBusiness from "../DeleteBusiness";
import DeleteReview from "../DeleteReview";
import OpenModalButton from '../OpenModalButton';
import './OneBusiness.css';

function OneBusiness(){
    const [isLoaded, setIsLoaded] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
    const {busId} = useParams();
    const bus = useSelector(state => state.business.business);     
    const reviews = useSelector(state => state.reviews.reviews);            
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.images.images);
    const redirect = useNavigate();

    // const {setModalContent} = useModal();

    console.log('BUSINESS -------------> ', bus)
    console.log('REVIEWS -------------->', reviews)
    console.log('USER ---------------->', sessionUser)
    console.log('IMAGES -------------->', images)

    useEffect(() => {
        async function getBusData(){
           await dispatch(getBusinessByIdThunk(busId));
           await dispatch(getReviewsByBusinessIdThunk(busId));
           await dispatch(getImagesByBusinessIdThunk(busId));
           setIsLoaded(true);
        }
        getBusData();
    }, [dispatch, busId, isLoaded]);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.BusinessImages.length); // Move to the next image
    //     }, 5000); // Change image every 5 seconds
    
    //     return () => clearInterval(interval); // Clear interval on component unmount
    //   }, [images.BusinessImages.length]);


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

    return(
        <div>
            {isLoaded && bus &&
            
                <div id='busbyid'>
                    <div className='bus-images-bar'>

                        {/* {(images.BusinessImages || []).map((image, index) => (
                            <img 
                                key={index}
                                className='bus-quad-pic'
                                style={{ height: '250px', width: '480px', display: index === currentIndex ? 'block' : 'none' }}
                                src={image.url}
                                alt='business-image'
                            />
                        ))} */}

                        <img className="bus-quad-pic" style={{height: '250px', width: '480px'}} src={bus.business.preview_image} alt="business-image" />
                        <img className="bus-quad-pic" style={{height: '250px', width: '480px'}} src={images.BusinessImages[0].url} alt="business-image" />
                        <img className="bus-quad-pic" style={{height: '250px', width: '480px'}} src={images.BusinessImages[1].url} alt="business-image" />
                        <img className="bus-quad-pic" style={{height: '250px', width: '480px'}} src={images.BusinessImages[2].url} alt="business-image" />
                    </div>

                    <div className="bus-title-block">
                        <h1 className="bus-name" style={{fontSize: '50px'}}>{bus.business.name}</h1>
                        <div className="review-line" style={{fontSize: '20px'}}>
                            <img className="review-star" src="" alt="star"/>
                            <p className="bus-star-reviews">{bus.business.rating} ({reviews.reviews ? reviews.reviews.length : 0} reviews)</p>
                        </div>
                        <p className="bus-hours" style={{fontSize: '20px'}}>{bus.business.hours}</p>
                    </div>

                    <div className="mid-section">
                        <div className="bus-buttons-bar">
                            {
                                sessionUser && 
                                sessionUser.id !== bus.business.owner_id && 
                                !reviews.reviews.find(obj => obj.user_id === sessionUser.id) &&
                                <button className="bus-review-btn" style={{height: '30px', width: '100px'}} onClick={reviewClick}>Write Review</button>
                            }
                            {
                                sessionUser && 
                                sessionUser.id === bus.business.owner_id && 
                                <button className="bus-update-btn" style={{height: '30px', width: '100px'}} onClick={updateClick}>Update</button>
                            }
                            {
                                sessionUser && 
                                sessionUser.id === bus.business.owner_id && 
                                (<OpenModalButton className='delete-bus' buttonText='Delete' modalComponent={<DeleteBusiness busId={busId}/>}/>)
                            }
                        </div>

                        <div className="info-box-right">
                            <h3 className="info-box-1" style={{fontSize: '30px'}}>{bus.business.category_name}</h3>
                            <h4 className="info-box-2" style={{fontSize: '22px'}}>{phoneArr[bus.business.id - 1]}</h4>
                            <h4 className="info-box-3" style={{fontSize: '22px'}}>{bus.business.address}</h4>
                            <h4 className="info-box-4" style={{fontSize: '22px'}}>{bus.business.city}, {bus.business.state}</h4>
                        </div>
                        
                        <div className="lower-left-bus-info">
                            <div className="bus-description">
                                <h2>From this business</h2>
                                <h3>{bus.business.description}</h3>
                            </div>

                            <div className="lower-left-bus-reviews">
                                <h2>Reviews</h2>
                                {reviews.reviews && reviews.reviews.map(obj => (
                                    <div className="all-reviews" key={obj.id}>
                                        <img style={{height: '100px', width: '100px'}} src={obj.user_id.profile_pic} alt="reviewer-pic"/>
                                        <p>{obj.review}</p>
                                        {
                                            sessionUser && 
                                            obj.user_id === sessionUser.id && 
                                            (<OpenModalButton className='delete-review' buttonText='Delete' modalComponent={<DeleteReview busId={busId} reviewId={obj.id}/>}/>)
                                        }
                                        <p>______________________________________</p>
                                    </div>
                                ))}
                            </div>
                        </div>   
                    </div>
                </div>
            }
        </div>
    )
}

export default OneBusiness;