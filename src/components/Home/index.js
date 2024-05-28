import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div>
      <h1>Find the job that fits your life</h1>
      <p>Millions of people looking for job</p>
      <Link to="/jobs">
        <button>Find Jobs</button>
      </Link>
    </div>
  </div>
)

export default Home
