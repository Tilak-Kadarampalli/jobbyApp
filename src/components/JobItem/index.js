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
            <p>{title}</p>
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
            <p className="middle-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>{' '}
              {location}
            </p>
            <p className="middle-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-briefcase-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" />
                <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" />
              </svg>
              {'  '}
              {employmentType}
            </p>
          </div>
          <p className="middle-text">{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <p style={{fontWeight: '500'}}>Description</p>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
