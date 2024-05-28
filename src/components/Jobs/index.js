import {Component} from 'react'
import Profile from '../Profile'

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
  state = {employmentType: [], minimumPackage: 0, searchQuery: ''}

  onChangeType = option => {
    const {employmentType} = this.state
    if (employmentType.includes(option)) {
      this.setState({
        employmentType: employmentType.filter(op => op !== option),
      })
    } else {
      this.setState({
        employmentType: [...employmentType, option],
      })
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
    this.setState({minimumPackage: parseInt(salaryRange)})
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

  render() {
    return (
      <div>
        <Profile />
        <div>
          <input type="text" onChange={this.updateSearchQuery} />
          <button type="button">Search</button>
        </div>
        <div>{this.renderTypeFilters()}</div>
        <div>{this.renderSalaryFilters()}</div>
      </div>
    )
  }
}

export default Jobs
