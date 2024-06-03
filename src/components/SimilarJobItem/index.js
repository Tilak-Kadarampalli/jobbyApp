import {AiFillStar, AiFillEnvironment} from 'react-icons/ai'
import {IoBriefcase} from 'react-icons/io5'
import './index.css'

const SimilarJobItem = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    title,
    employmentType,
    jobDescription,
    location,
    rating,
  } = details

  return (
    <li className="similar-job-card">
      <div className="top-label">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="title-rating">
          <h1 className="title">{title}</h1>
          <p>
            <span>
              <AiFillStar className="star-logo" />
            </span>{' '}
            {rating}
          </p>
        </div>
      </div>
      <div>
        <h1 className="sub-heads">Description</h1>
        <p> {jobDescription}</p>
      </div>
      <div className="location-label">
        <p>
          <span>
            <AiFillEnvironment className="" />
          </span>{' '}
          {location}
        </p>
        <p>
          <span>
            <IoBriefcase />
          </span>{' '}
          {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobItem
