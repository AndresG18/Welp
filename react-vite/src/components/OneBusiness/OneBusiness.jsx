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
    const dispatch = useDispatch();
    const {busId} = useParams();
    const bus = useSelector(state => state.business.business);     
    const reviews = useSelector(state => state.reviews.reviews);            
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.images);
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
        //    await dispatch(getImagesByBusinessIdThunk(busId));
           setIsLoaded(true);
        }
        getBusData();
    }, [dispatch, busId, isLoaded]);

    // const reserveClick = () => {
    //     alert('Feature coming soon')
    // }

    const updateClick = () => {
        redirect(`/bus/${busId}/edit`)
    }

    const reviewClick = () => {
        redirect(`/bus/${busId}/reviews/new`)
    }

    return(
        <div>
            {isLoaded && bus &&
            
                <div id='busbyid'>
                    <div className='bus-images-bar'>
                        {/* <img className='bus-main-pic' style={{height: '600px', width: '500px'}}src={bus.business.BusinessImages[0]?.url || '/default-image.jpg'} alt="small-1"/> */}
                        <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src={bus.business.preview_image} alt="business-image" />
                        <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src='' alt="business-image" />
                        <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src='' alt="business-image" />
                        <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src='' alt="business-image" />
                    </div>

                    <div className="bus-title-block">
                        <h1 className="bus-name" style={{fontSize: '40px'}}>{bus.business.name}</h1>
                        <div className="review-line">
                            <img className="review-star" src="" alt="star"/>
                            <p className="bus-star-reviews">{bus.business.rating} ({reviews.reviews ? reviews.reviews.length : 0} reviews)</p>
                        </div>
                        <p className="bus-hours">{bus.business.hours}</p>
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
                            <h3>Something something</h3>
                            <h4>Something something</h4>
                            <h4>{bus.business.address}</h4>
                            <h4>{bus.business.city}, {bus.business.state}</h4>
                        </div>

                    </div>

                    <div className="lower-left-container">
                        
                        <div className="lower-left-bus-info">
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
            }
        </div>
    )
}

export default OneBusiness;