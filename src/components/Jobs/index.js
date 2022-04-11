import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobItemCard from '../JobItemCard'
import FilterGroup from '../FilterGroup'
import UserProfile from '../UserProfile'
import Header from '../Header'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: '',
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchInput, activeSalaryRangeId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jobsApiUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&minimum_package=${activeSalaryRangeId}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        role: eachJob.role,
        title: eachJob.title,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        location: eachJob.location,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsListDetailsView = () => {
    const {jobsList} = this.state
    const showJobs = jobsList.length > 0

    return showJobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItemCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          alt="no jobs"
          className="no-jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  onClickJobsList = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        alt="failure view"
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader
        testid="loader"
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
      />
    </div>
  )

  renderJobsSectionView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderJobsListDetailsView()
      default:
        return null
    }
  }

  onClickEnterSearchInput = () => {
    this.getJobsList()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          placeholder="Search"
          testid="searchButton"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onClickEnterSearchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  changeSalaryActiveId = id => {
    this.setState(
      {
        activeSalaryRangeId: id,
      },
      this.getJobsList,
    )
  }

  render() {
    const {activeSalaryRangeId} = this.state

    console.log(activeSalaryRangeId)
    return (
      <div className="jobs-details-container">
        <Header />
        <div className="jobs-container">
          <div className="user-sort-container">
            <UserProfile />
            <FilterGroup
              salaryRangesList={salaryRangesList}
              changeSalaryActiveId={this.changeSalaryActiveId}
            />
          </div>
          <div className="jobs-search-container">
            {this.renderSearchInput()}
            {this.renderJobsSectionView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
