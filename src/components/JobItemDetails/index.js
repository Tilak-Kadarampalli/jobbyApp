import {Component} from 'react'
import Cookies from 'js-cookie'

class JobItemDetails extends Component {
  state = {jobDetails: null}

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

      console.log(data)
    }
  }

  render() {
    return (
      <div>
        <h1>Hii Jobs</h1>
      </div>
    )
  }
}

export default JobItemDetails
