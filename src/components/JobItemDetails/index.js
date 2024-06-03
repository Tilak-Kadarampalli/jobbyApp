import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar, AiFillEnvironment} from 'react-icons/ai'
import {IoBriefcase} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

class JobItemDetails extends Component {
  state = {jobDetails: {}, skillsList: [], similarJobs: [], apiStatus: true}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const rawData = data.job_details

      const processedData = {
        id: rawData.id,
        companyLogoUrl: rawData.company_logo_url,
        companyWebsiteUrl: rawData.company_website_url,
        employmentType: rawData.employment_type,
        jobDescription: rawData.job_description,
        lifeAtCompanyDesc: rawData.life_at_company.description,
        lifeAtCompanyImgUrl: rawData.life_at_company.image_url,
        location: rawData.location,
        packagePerAnnum: rawData.package_per_annum,
        rating: rawData.rating,
        title: rawData.title,
      }

      const skillsList = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobs = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        title: eachJob.title,
        employmentType: eachJob.employment_type,
        jobDescription: rawData.job_description,
        location: rawData.location,
        rating: rawData.rating,
      }))

      this.setState({
        jobDetails: processedData,
        skillsList,
        similarJobs,
      })
    } else {
      this.setState({apiStatus: false})
    }
  }

  renderFailureView = () => (
    <div>
      <h1>Something went wrong!</h1>
    </div>
  )

  renderSkillsList = () => {
    const {skillsList} = this.state

    return (
      <ul>
        {skillsList.map(eachSkill => (
          <SkillCard details={eachSkill} key={eachSkill.name} />
        ))}
      </ul>
    )
  }

  renderSimilarJobsList = () => {
    const {similarJobs} = this.state

    return (
      <ul>
        {similarJobs.map(eachJob => (
          <SimilarJobItem key={eachJob.id} details={eachJob} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {
      jobDescription,
      lifeAtCompanyDesc,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      title,
      rating,
      companyLogoUrl,
      location,
    } = jobDetails
    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="top-label">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
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
          <div className="location-label">
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
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="h-line" />
          <div className="description-container">
            <div className="desc-head-label">
              <h1 className="sub-heads">Description</h1>
              <a href={companyWebsiteUrl} className="visit">
                Visit
                <BsBoxArrowUpRight />
              </a>
            </div>
            <p>{jobDescription}</p>
          </div>

          <p>{lifeAtCompanyDesc}</p>
          <div> {this.renderSkillsList()}</div>
        </div>
        <div>{this.renderSimilarJobsList()}</div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div className="job-details-page">
        <Header />
        {apiStatus === true ? (
          <> {this.renderSuccessView()} </>
        ) : (
          <>{this.renderFailureView()} </>
        )}
      </div>
    )
  }
}

export default JobItemDetails
