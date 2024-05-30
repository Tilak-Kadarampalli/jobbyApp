import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-bg">
      <h1>Find the job that fits your life</h1>
      <p>Millions of people looking for job</p>
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </div>
  </div>
)

export default Home
