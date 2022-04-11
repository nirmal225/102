import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userData: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const token = Cookies.get('jwt_token')
    console.log(token)
    const jobsApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData

    return (
      <div className="user-profile-container">
        <img alt="profile" className="image" src={profileImageUrl} />
        <h1 className="heading">{name}</h1>
        <p className="bio-paragraph">{shortBio}</p>
      </div>
    )
  }

  onClickUserProfile = () => {
    this.getUserDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickUserProfile}
      >
        Retry
      </button>
    </div>
  )

  renderUserDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        {this.renderUserDetails()}
        <hr className="line" />
      </div>
    )
  }
}

export default UserProfile
