import './Footer.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import welpLogo from "../Navigation/navlogo.png"
import daniel from "./daniel.jpg"
import andres from "./andres.jpeg"
import chris from "./chris.jpeg"
import htmlIcon from "./html.svg"
import cssIcon from "./css.svg"
import javascriptIcon from "./javascript.svg"
import reactIcon from "./react.svg"
import reduxIcon from "./redux.svg"
import postgresqlIcon from "./postgresql.svg"
import sqliteIcon from "./sqlite.svg"
import flaskIcon from "./flask.svg"
import dockerIcon from "./docker.svg"
import pythonIcon from "./python.svg"

function Footer() {
  return (
    <div className="footer-container">
      <div className="devs-tech-boxes" id='developer-box'>
        <img src={welpLogo} id='welp-logo' /> Developers:
        <a href="https://github.com/ckang021/welp" id='github-link' target="_blank" rel="noreferrer"><FaGithub id='github-fa' />Project Repo</a>
        <div className='dev-intros-container'>
          <div className='intro-dev-area'>
            <p>Andres Garcia</p>
            <img src={andres} className='dev-headshot' />
            <div className='dev-intros-links'>
              <a href="" className='dev-git-linkedin' target="_blank" rel="noreferrer"><FaGithub id='github-fa' />Github</a>
              <a href="" className='dev-git-linkedin' target="_blank" rel="noreferrer"><FaLinkedin id='github-fa' />LinkedIn</a>
            </div>
          </div>

          <div className='intro-dev-area'>
            <p>Daniel Choi</p>
            <img src={daniel} className='dev-headshot' />
            <div className='dev-intros-links'>
              <a href="" className='dev-git-linkedin' target="_blank" rel="noreferrer"><FaGithub id='github-fa' />Github</a>
              <a href="" className='dev-git-linkedin' target="_blank" rel="noreferrer"><FaLinkedin id='github-fa' />LinkedIn</a>
            </div>
          </div>

          <div className='intro-dev-area'>
            <p>Chris Kang</p>
            <img src={chris} className='dev-headshot' />
            <div className='dev-intros-links'>
              <a href="https://github.com/ckang021" className='dev-git-linkedin' target="_blank" rel="noreferrer"><FaGithub id='github-fa' />Github</a>
              <a href="https://www.linkedin.com/in/chris-kang247/" className='dev-git-linkedin' target="_blank" rel="noreferrer"><FaLinkedin id='github-fa' />LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div className='dev-techs-box' id='technology-box'>
        <h2 className='tech-texts'>Technologies Used: </h2>
        <div className='tech-box-main'>
          <div className='space-tech-texts'>
            <h3 className='tech-texts' id='tech-title-underline'>Languages</h3>

            <div>
              <div className='tech-texts'>
                <img src={pythonIcon} alt="" className='icon-sizing' />
                Python
              </div>

            </div>
            <div className='tech-texts'>
              <img src={javascriptIcon} alt="" className='icon-sizing' />
              JavaScript
            </div>
            <div className='tech-texts'>
              <img src={htmlIcon} alt="" className='icon-sizing' />
              HTML
            </div>
            <div className='tech-texts'>
              <img src={pythonIcon} alt="" className='icon-sizing' />
              CSS
            </div>

          </div>
          <div className='space-tech-texts'>
            <h3 className='tech-texts' id='tech-title-underline'>Backend</h3>

            <div className='tech-texts'>
              <img src={flaskIcon} alt="" className='icon-sizing' />
              Flask
            </div>
            <div className='tech-texts'>
              <img src={flaskIcon} alt="" className='icon-sizing' />
              SQLAlchemy
            </div>
            <div className='tech-texts'>
              <img src={flaskIcon} alt="" className='icon-sizing' />
              Alembic
            </div>
            <div className='tech-texts'>
              <img src={postgresqlIcon} alt="" className='icon-sizing' />
              Postgres
            </div>
            <div className='tech-texts'>
              <img src={sqliteIcon} alt="" className='icon-sizing' />
              SQLite
            </div>
          </div>
          <div className='space-tech-texts'>
            <h3 className='tech-texts' id='tech-title-underline'>Frontend</h3>
            <div className='tech-texts'>
              <img src={reactIcon} alt="" className='icon-sizing' />
              React
            </div>
            <div className='tech-texts'>
              <img src={reduxIcon} alt="" className='icon-sizing' />
              Redux
            </div>
            <div className='tech-texts'>
              <img src={dockerIcon} alt="" className='icon-sizing' />
              Docker
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
