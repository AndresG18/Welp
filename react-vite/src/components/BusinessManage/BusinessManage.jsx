import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentBusinessesThunk } from "../../redux/businesses";
import Businesses from "../Businesses/Businesses";
import "./BusinessManage.css"

function BusinessManage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const businessList = useSelector(state => state.businesses?.currentBusinesses?.businesses)

  console.log(businessList)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getCurrentBusinessesThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  const createBus = (e) => {
    e.preventDefault()
    navigate("/bus/new")
  }

  return (
    isLoaded ? (
      businessList && businessList.length > 0 ? (
        <div className="busForm" style={{minWidth:'80%'}}>
          <div >Your Businesses</div>
          <div style={{width:'50rem'}}>
            {businessList.map(business => (
              <Businesses key={business.id} business={business} />
            ))}
          </div>

          <div>
            <button  onClick={createBus}>Create a New Business</button>
          </div>
        </div>
      ) : (
        <h1>You own no businesses</h1>
      )
    ) : (
      <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  
    )
  );
}


export default BusinessManage
