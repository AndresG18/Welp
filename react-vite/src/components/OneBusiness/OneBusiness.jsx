// import {useState, useEffect} from "react";
// // import {useParams} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {getBusinessByIdThunk} from '../../store/businesses';            // check var/func name
// import {fetchReviews} from '../../store/reviews';           // check var/func name
// import {useModal} from "../../context/Modal";               // optional modals???
// import ReviewFormModal from "../ReviewFormModal";
// import DeleteReviewModal from "../DeleteReviewModal";
// import OpenModalButton from '../OpenModalButton';

// function OneBusiness() {
//     const [isLoaded, setIsLoaded] = useState(false);
//     const dispatch = useDispatch();
//     const { spotId } = useParams();
//     const bus = useSelector(state => state.bizs.oneBusiness.busById);       // var names, as well as nested object path. do the same for following lines
//     const reviews = useSelector(state => state.reviews.reviews);
//     const sessionUser = useSelector(state => state.session.user);

//     const {setModalContent} = useModal();

//     // console.log('Reviews from useSelector-----> ', reviews)

//     // useEffect(() => {
//     //     async function getBusData(){
//     //        await dispatch(getBusinessByIdThunk(busId));
//     //        await dispatch(fetchReviews(busId));
//     //        setIsLoaded(true);
//     //     }
//     //     getBusData();
//     // }, [dispatch, busId, isLoaded]);

//     // const reserveClick = () => {
//     //     alert('Feature coming soon')
//     // }

//     const handleReviewModal = () => {
//         setModalContent(<ReviewFormModal busId={busId}/>)
//     }


//     return(
//         <div>
//             {isLoaded && bus &&

//                 <div id='busbyid'>
//                     <h1 className="bus-name" style={{fontSize: '40px'}}>{bus.name}</h1>
//                     <h3 className="bus-location" style={{fontSize: '28px'}}>{bus.city}, {bus.state}</h3>

//                     <div className='bus-imgs-block'>
//                         <div className='bus-main-pic-container'>
//                             <img className='bus-main-pic' style={{height: '600px', width: '500px'}}src={bus.BusinessImages[0]?.url} alt="main-pic"/>
//                         </div>
//                         <div className='bus-quad-pics-container'>
//                             <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src={bus.BusinessImages[1]?.url || '/chicken-no-img.jpg'} alt="small-1" />
//                             <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src={bus.BusinessImages[2]?.url || '/chicken-no-img.jpg'} alt="small-1" />
//                             <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src={bus.BusinessImages[3]?.url || '/chicken-no-img.jpg'} alt="small-1" />
//                             <img className="bus-quad-pic" style={{height: '250px', width: 'auto'}} src={bus.BusinessImages[4]?.url || '/chicken-no-img.jpg'} alt="small-1" />
//                         </div>
//                     </div>

//                     <div className="bus-page-lower">
//                         <div className="bus-page-lower-left">
//                             <p className="bus-host" style={{fontSize: '28px'}}>Hosted by {bus.Owner.firstName} {bus.Owner.lastName}</p>
//                             <p className="bus-description" style={{fontSize: '25px'}}>Features: {bus.description}</p>

//                             {!bus.numReviews ? <p style={{fontSize: '25px'}}>New</p> :
//                             bus.numReviews === 1 ? <p className="det-rev-sum" style={{fontSize: '25px'}}><img className="details-black-star" src='/black-star.jpg'/>
//                             {bus.avgStarRating.toFixed(1)} &#183; {bus.numReviews} Review</p> :
//                             <p className="det-rev-sum" style={{fontSize: '25px'}}><img className='details-black-star' src='/black-star.jpg'/>
//                             {bus.avgStarRating.toFixed(1)} &#183; {bus.numReviews} Reviews</p>}

//                             <div className='bus-review-list'>
//                                 {!reviews.length && sessionUser && sessionUser.id !== bus.Owner.id ?
//                                 (
//                                 <>
//                                     <p style={{fontSize: '25px'}}>Be the first to post a review!</p>
//                                     <button onClick={handleReviewModal} style={{fontSize: '25px'}}>Post Your Review</button>
//                                 </>
//                                 ) : (
//                                 <>
//                                     <p className="bus-reviews-subtitle" style={{fontSize: '25px'}}>Reviews:</p>
//                                     {sessionUser && sessionUser.id !== bus.Owner.id && !reviews.find(obj => obj.userId === sessionUser.id) &&
//                                     (<button onClick={handleReviewModal} style={{fontSize: '25px'}}>Post Your Review</button>)}
//                                 </>
//                                 )}

//                                 {
//                                 reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                                 .map((review, index) => (
//                                     <div key={index}>
//                                         <p style={{fontSize: '25px'}}>Reviewer: {review.User.firstName}</p>
//                                         <p style={{fontSize: '25px'}}>Date of review: {new Date(review.createdAt).toLocaleString("default", { month: "long", year: "numeric" })}</p>
//                                         <p style={{fontSize: '25px'}}>Comments: {review.review}</p>
//                                         <p style={{fontSize: '25px'}}>Rating: {review.stars}</p>

//                                         {sessionUser && review.userId === sessionUser.id &&
//                                         (<OpenModalButton className='delete-bus' buttonText='Delete' modalComponent={<DeleteReviewModal busId={busId} reviewId={review.id}/>}/>)}

//                                         <p>____________________________________________________</p>
//                                     </div>
//                                 ))}

//                             </div>
//                         </div>

//                         <div className="bus-page-lower-right">
//                             <div className='callout-box'>
//                                 <div className="callout-box-upper"><h2 style={{fontSize: '40px'}}>Don&apos;t miss out!</h2></div>
//                                 <div className='callout-box-mid'>
//                                     <div className="callout-right-text">
//                                         {!bus.numReviews ? <p className="callout-review-group" style={{fontSize: '30px'}}>New</p> :
//                                         bus.numReviews === 1 ? (<p className="callout-review-group" style={{fontSize: '30px'}}><img className="callout-black-star" src='/black-star.jpg'/>
//                                         {bus.avgStarRating.toFixed(1)} &#183; {bus.numReviews} Review</p>) :
//                                         <p className="callout-review-group" style={{fontSize: '30px'}}>
//                                             <img className="callout-black-star" src='/black-star.jpg'/>
//                                             {bus.avgStarRating.toFixed(1)} &#183; {bus.numReviews} Reviews
//                                         </p>}
//                                     </div>
//                                     <p className="callout-right-price" style={{fontSize: '30px'}}>{`$${bus.price} / night`}</p>
//                                 </div>
//                                 <button className='callout-box-reserve' onClick={reserveClick} style={{fontSize: '30px'}}>Reserve</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }

// export default OneBusiness;
