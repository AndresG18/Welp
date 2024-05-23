import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBusinessesThunk } from "../../redux/businesses";
import Businesses from "../Businesses/Businesses";
import "./BusinessManage.css"

function BusinessManage() {
  const dispatch = useDispatch()
  const businessList = useSelector(state => state.businesses?.currentBusinesses?.businesses)

  console.log(businessList)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getCurrentBusinessesThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    isLoaded ? (
      businessList && businessList.length > 0 ? (
        <div>
          <div>Your Businesses</div>
          <div>
            {businessList.map(business => (
              <Businesses key={business.id} business={business} />
            ))}
          </div>
        </div>
      ) : (
        <h1>You own no businesses</h1>
      )
    ) : (
      <div>Loading...</div>
    )
  );
}


export default BusinessManage
