import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllBusinessesThunk} from '../../store/business';    //or whatever we decided to name it

function Businesses(){
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const bizs = useSelector(state => state.bizs.allBizs);          // check nested obj var names

    useEffect(() => {
        async function getBizsData(){
            await dispatch(getAllBusinessesThunk());
            setIsLoaded(true);
        }
        getBizsData();
    }, [dispatch]);


    return(
        <div className='all-bizs'>
            {isLoaded && Object.values(bizs).map(obj =>(

                <NavLink className='bizs-navlink' key={obj.id} to={`/${obj.id}`}>
                    <div className='bus-tile'>
                        <div className="tile-img-container">
                            <img className='tile-img' src={obj.previewImage} alt='bus-pic'/>     {/* variable name check "previewImage" */}
                        </div>
                        <h3 className='tile-location' style={{fontSize: '25px'}}>{obj.city}, {obj.state}</h3>
                        <div className="tile-footer">
                            <div className='tile-star-grouping'>
                                <img className='tile-star' src="/black-star.jpg" alt="img"/>
                                <h3 className='tile-avg-rating' style={{fontSize: '25px'}}>{typeof obj.avgRating === 'number' ? obj.avgRating.toFixed(1) : 'No Ratings'}</h3>
                            </div>
                            <p className='tile-price' style={{fontSize: '25px'}}>{`${obj.price}`}</p>
                        </div>
                    </div>
                </NavLink>
                
            ))}
        </div>
    )
}

export default Businesses;