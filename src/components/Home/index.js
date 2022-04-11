import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home-header-container">
    <Header />
    <div className="home-container">
      <div className="container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary information ,
          company reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="jobs">
          <button className="jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
