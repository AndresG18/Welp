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

  if (businessList.length == 0) {
    return (
      <h1>You own no businesses</h1>
    )
  }

  return (
    isLoaded && (
      <div>
        <div>Your Businesses</div>
        <div>
          {businessList.map(business => (
            <Businesses key={business.id} business={business} />
          ))}
        </div>
      </div>
    )
  )

}


export default BusinessManage
