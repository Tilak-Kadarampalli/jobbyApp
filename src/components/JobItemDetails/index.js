import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], apiStatus: true}

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
      }

      this.setState({
        jobDetails: processedData,
        similarJobs: data.similar_jobs,
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

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {jobDescription, lifeAtCompanyDesc} = jobDetails
    return (
      <div>
        <h1>{jobDescription}</h1>
        <p>{lifeAtCompanyDesc}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div>
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
