import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BusinessForm from "../BusinessForm/BusinessForm"

export default function UpdateBusiness() {
  const bus = useSelector(state => state.business.business)
  const navigate = useNavigate()
  const { busId } = useParams()

  useEffect(() => {
    if (!bus) navigate(`/bus/${busId}`)
  })
  return (
    <BusinessForm bus={bus.business} />
  )
}
