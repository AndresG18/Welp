import { useSelector } from "react-redux"
import BusinessForm from "../BusinessForm/BusinessForm"

export default function UpdateBusiness() {
    const bus = useSelector(state => state.business)
  return (
    <BusinessForm bus={bus} />
  )
}
