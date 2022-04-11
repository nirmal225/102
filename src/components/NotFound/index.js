import './index.css'
import Header from '../Header'

const NotFoundImage =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

const NotFound = () => (
  <div className="failure-container">
    <Header />
    <div className="failure-details-container">
      <div className="not-found-container">
        <img alt="not found" className="failure-view" src={NotFoundImage} />
        <h1>Page Not Found</h1>
        <p>we're sorry, the page you requested could not be found</p>
      </div>
    </div>
  </div>
)

export default NotFound
