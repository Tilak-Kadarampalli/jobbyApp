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
    <li>
      <div>
        <img src={companyLogoUrl} />
        <h1>{title}</h1>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
