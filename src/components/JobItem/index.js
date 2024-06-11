import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    rating,
    location,
    id,
    packagePerAnnum,
    title,
    jobDescription,
    employmentType,
  } = details

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} style={{textDecoration: 'none', color: 'white'}}>
        <div className="top-label">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating">
            <h1>{title}</h1>
            <p className="rating">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gold"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              {rating}
            </p>
          </div>
        </div>

        <div className="middle-label">
          <div className="middle-label">
            <p className="middle-text">{location}</p>
            <p className="middle-text">{employmentType}</p>
          </div>
          <p className="middle-text">{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <h1 style={{fontWeight: '500'}}>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
