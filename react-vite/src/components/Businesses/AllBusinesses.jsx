import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBusinessesThunk } from "../../redux/businesses"
import Businesses from "./Businesses"

function AllBusinesses() {
  const dispatch = useDispatch()
  const businessList = useSelector(state => state.businesses?.Businesses?.businesses)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getAllBusinessesThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <div>
      <div>All Results</div>
      <div>
        {businessList.map(business => (
          <Businesses key={business.id} business={business} />
        ))}
      </div>
    </div>
  )
}

export default AllBusinesses
