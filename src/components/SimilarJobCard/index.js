import './index.css'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  console.log(companyLogoUrl)

  return (
    <li className="similar-job-item-container">
      <div className="image-details-container">
        <img
          alt="similar job company logo"
          src={companyLogoUrl}
          className="similar-image"
        />
        <div className="employment-rating-container">
          <h1 className="job-employment-heading">{title}</h1>
          <p className="job-rating">{rating}</p>
        </div>
      </div>
      <h1 className="similar-job-description-container">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-location-type-container">
        <div className="icon-container">
          <ImLocation size={25} className="icon-image" />
          <p>{location}</p>
        </div>
        <div className="icon-container">
          <BsBriefcaseFill size={25} className="icon-image" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
