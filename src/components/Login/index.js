import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    this.setState({showErrorMsg: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg, username: '', password: ''})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="userName" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          value={username}
          onChange={this.updateUsername}
          className="input-container"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="passWord" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          id="passWord"
          placeholder="Password"
          value={password}
          onChange={this.updatePassword}
          className="input-container"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-bg">
        <div className="login-card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-img"
            />
          </div>
          <form onSubmit={this.submitForm}>
            <div>{this.renderUsername()}</div>
            <div>{this.renderPassword()}</div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {showErrorMsg ? <p className="error-text">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
