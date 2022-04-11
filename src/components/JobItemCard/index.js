import './index.css'

import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    location,
    packagePerAnnum,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-item-container">
        <div className="image-name-rating-container">
          <img
            alt="company logo"
            className="company-image"
            src={companyLogoUrl}
          />
          <div className="name-rating-container">
            <h1 className="heading-title">{title}</h1>
            <p className="heading-rating">{rating}</p>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="icon-container">
              <ImLocation size={25} className="icon-image" />
              <p className="location">{location}</p>
            </div>
            <div className="icon-container">
              <BsBriefcaseFill size={25} className="icon-image" />
              <p className="type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItemCard
