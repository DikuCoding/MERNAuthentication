
import { Link } from "react-router-dom";
import "./style.css"


const Navbar = () => {
      return (
        <>
          <li className="nav-item">
             <Link className="nav-link" to="/home">Home</Link>
             <Link className="nav-link" to="/logIn">Login</Link>
             <Link className="nav-link" to="/signup">Signup</Link>
             <Link className="nav-link" to="/usersData">UsersData</Link>
          </li>
        {/* <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li> */}
        </>
      )
  
}

export default Navbar

