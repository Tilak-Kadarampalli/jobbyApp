import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: [],
    minimumPackage: 0,
    searchQuery: '',
    jobsList: [],
    jobsLoading: false,
  }

  componentDidMount() {
    this.getJobsList()
  }

  onChangeType = option => {
    const {employmentType} = this.state
    if (employmentType.includes(option)) {
      this.setState(
        {
          employmentType: employmentType.filter(op => op !== option),
        },
        this.getJobsList,
      )
    } else {
      this.setState(
        {
          employmentType: [...employmentType, option],
        },
        this.getJobsList,
      )
    }
  }

  renderTypeFilters = () => {
    const {employmentType} = this.state
    return (
      <ul className="type-filters">
        <p>Type of employment</p>
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              value={eachType.employmentTypeId}
              id={eachType.employmentTypeId}
              checked={employmentType.includes(eachType.employmentTypeId)}
              onChange={() => this.onChangeType(eachType.employmentTypeId)}
            />
            <label htmlFor={eachType.employmentTypeId}>{eachType.label}</label>
          </li>
        ))}
      </ul>
    )
  }

  onChangeSalary = salaryRange => {
    this.setState({minimumPackage: parseInt(salaryRange)}, this.getJobsList)
  }

  renderSalaryFilters = () => {
    const {minimumPackage} = this.state

    return (
      <>
        <ul className="type-filters">
          <p>Salary Range</p>
          {salaryRangesList.map(eachType => (
            <li key={eachType.salaryRangeId}>
              <input
                type="radio"
                value={eachType.salaryRangeId}
                id={eachType.salaryRangeId}
                checked={minimumPackage === parseInt(eachType.salaryRangeId)}
                onChange={() => this.onChangeSalary(eachType.salaryRangeId)}
              />
              <label htmlFor={eachType.salaryRangeId}>{eachType.label}</label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  updateSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  getJobsList = async () => {
    this.setState({jobsLoading: true})
    const {employmentType, minimumPackage, searchQuery} = this.state
    const typeFilter = employmentType.join(',')

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeFilter}&minimum_package=${minimumPackage}&search=${searchQuery}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({jobsLoading: false})

      const updatedJobsList = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        jobDescription: eachJob.job_description,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
      }))

      this.setState({jobsList: updatedJobsList})
    } else {
      console.log('Error')
    }
  }

  renderJobsLoading = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  renderNoJobs = () => (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. try other filters.</p>
      </div>
    </>
  )

  renderJobsList = () => {
    const {jobsList} = this.state

    return (
      <div>
        {jobsList.length === 0 ? (
          <div>{this.renderNoJobs()}</div>
        ) : (
          <ul className="jobs-list-container">
            {jobsList.map(eachJob => (
              <JobItem details={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {jobsLoading} = this.state
    return (
      <div className="jobs-bg">
        <Header />
        <div className="jobs-container">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              onChange={this.updateSearchQuery}
            />
            <button
              type="button"
              onClick={this.getJobsList}
              className="search-button"
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />.
            </button>
          </div>

          <div className="jobs-content">
            <div className="left-column">
              <Profile />
              <hr className="horz-line" />
              <div>{this.renderTypeFilters()}</div>
              <hr className="horz-line" />
              <div>{this.renderSalaryFilters()}</div>
            </div>
            <div className="right-column">
              {jobsLoading === true
                ? this.renderJobsLoading()
                : this.renderJobsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
