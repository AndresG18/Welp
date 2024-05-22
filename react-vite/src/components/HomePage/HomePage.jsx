import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import image1 from './photo1.jpg'
import image2 from './photo2.jpg'
import image3 from './photo3.jpg'
import image4 from './photo4.jpg'
import logo from './logowhitebig.png'
import './HomePage.css'


const backImage = [image1, image2, image3, image4]

export default function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [backImg, setBackImg] = useState(0)


  useEffect(() => {
    const transition = setInterval(() => {
      setBackImg((prev) => ++prev % backImage.length)
    }, 7000)

    return () => {
      clearInterval(transition)
    }
  }, []);

  return (
    <div className="home">
      <div className="main-home" style={{ backgroundImage: `url(${backImage[backImg]})` }}>
        <div className="main-button-header">
          <div>
            <h1 id="home-title">This is...</h1><img src={logo} id="logo-image" />
          </div>
          <div id="main-button">
            <div>
              <button id="check-button" onClick={() => navigate('/bus')}>Check out businesses</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
