import { NavLink } from "react-router-dom"
import "./Businesses.css"
import sadface from './sadface.jpg'

export default function Businesses({ business }) {
  return (
    <div className="bus-card">
      <NavLink to={`/bus/${business.id}`}>
        <div className="bus-card-image">
          <img src={`${business.preview_image ? business.preview_image : sadface}`} alt={business.name} loading="lazy" className="bus-card-image" />
        </div>

        <div className="bus-card-details">
          <div className="bus-detail-name">
            {business.name}
          </div>

          <div className="bus-card-reviews">
            <div className='stars'>
              <div className={business.rating > 0 ? 'star active' : 'star'} />
              <div className={business.rating > 1.4 ? 'star active' : 'star'} />
              <div className={business.rating > 2.4 ? 'star active' : 'star'} />
              <div className={business.rating > 3.4 ? 'star active' : 'star'} />
              <div className={business.rating > 4.4 ? 'star active' : 'star'} />
              <div id="bus-rating" style={{
                color: business.rating > 4.4 ? '#81FF79' :
                  business.rating > 3.4 ? '#B6F001' :
                    business.rating > 2.4 ? '#FFFB4A' :
                      business.rating > 1.4 ? 'red' :
                        business.rating > 0 ? 'red' : 'white'
              }}>
                {business.rating}
              </div>
            </div>
          </div>

          <div className="bus-card-bottom">
            <div className="bus-price-category">
              <div id="bus-price">
                {business.price}
              </div>
              <div id="bus-category">
                {business.category_name}
              </div>
            </div>


            <div>
              <div>
                <p id="bus-description">"{business.description}"</p>
              </div>
            </div>
          </div>

        </div>
      </NavLink >
    </div >
  )
}
