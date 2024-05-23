import { NavLink } from "react-router-dom"
import "./Businesses.css"

export default function Businesses({ business }) {
  return (
    <div>
      <NavLink to={`/bus/${business.id}`}>
        <div className="bus-card-image">
          <img src={`${business.preview_image ? business.preview_image : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}`} alt={business.name} loading="lazy" style={{ height: "150px", width: "150px" }} />
        </div>

        <div className="bus-card-details">
          <div className="bus-detail-name">
            {business.name}
          </div>

          <div className="bus-card-reviews">
            <div className='stars'>
              <div className={business.rating > 0 ? 'star active' : 'star'} />
              <div className={business.rating > 1 ? 'star active' : 'star'} />
              <div className={business.rating > 2 ? 'star active' : 'star'} />
              <div className={business.rating > 3 ? 'star active' : 'star'} />
              <div className={business.rating > 4 ? 'star active' : 'star'} />
            </div>
            {business.rating}
          </div>

          <div style={{ color: "green" }}>
            {business.price}
          </div>

          <div>
            <div>
              <p>{business.description}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}
