import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ReviewForm from "../ReviewsForm/ReviewForm"

export default function UpdateReview() {
  const reviews = useSelector(state => state.reviews.reviews.reviews)
  const navigate = useNavigate()
  const { busId } = useParams()
  const { reviewId } = useParams()
  const reviewFilter = reviews.filter(review => review.id == reviewId)

  // console.log(reviewId)
  // console.log(reviewFilter)

  useEffect(() => {
    if (!reviews) navigate(`/bus/${busId}`)
  })
  return (
    <ReviewForm review={reviewFilter} />
  )
}
