import {Component} from 'react'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import JobItem from '../JobItem'

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
  state = {employmentType: [], minimumPackage: 0, searchQuery: '', jobsList: []}

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
      <ul>
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
      <ul>
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
    )
  }

  updateSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  getJobsList = async () => {
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

      const updatedJobsList = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        jobDescription: eachJob.job_description,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employmentType,
      }))

      this.setState({jobsList: updatedJobsList})
    } else {
      console.log('Error')
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    return (
      <ul>
        {jobsList.map(eachJob => (
          <JobItem details={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <Profile />
        <div>
          <input type="text" onChange={this.updateSearchQuery} />
          <button type="button" onClick={this.getJobsList}>
            Search
          </button>
        </div>
        <div>{this.renderTypeFilters()}</div>
        <div>{this.renderSalaryFilters()}</div>
        <div>{this.renderJobsList()}</div>
      </div>
    )
  }
}

export default Jobs
