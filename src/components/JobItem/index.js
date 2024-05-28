import {Link} from 'react-router-dom'

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
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
        <hr />
        <div>
          <p>{jobDescription}</p>
          <p>{location}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
