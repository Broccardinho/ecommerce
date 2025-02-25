// import React from 'react';
// import {Link} from 'react-router-dom';
// import Login from './Login';
// import Register from './Register';
// import Logout from './Logout';
// import useNavigate from 'react-router-dom';
//
// const Navbar = () => {
//         const navigate = useNavigate();
//         navigate("/login");
//         const [isAuthenticated, setIsAuthenticated] = useState(false);
//         const userProfilePicture = localStorage.getItem("userProfilePicture");
//
//         return(
//             <nav>
//                 <Link to="/" className="navbar-logo">Ecommerce</Link>
//             <form>
//                 <input type="search"
//                        placeholder="Search"
//                           aria-label="Search"
//                        />
//                        <button type="submit">Search</button>
//             </form>
//                 <div>
//                     {!isAuthenticated ? (
//                         <>
//                             <Login onLoginSuccess={() => {
//                                 setIsAuthenticated(true);
//                                 setUserProfilePicture(localStorage.getItem("userProfilePicture"));
//                             }}/>
//                             <Register />
//                         </>
//                     ) : (
//                         <>
//                             <div>
//                                 <img
//                                     src={userProfilePicture}
//                                     alt="Profile"
//                                 />
//                             </div>
//                             <Logout
//                                 onLogoutSuccess={() => {
//                                     setIsAuthenticated(false);
//                                 }}
//                             />
//                         </>
//                     )}
//                 </div>
//                 <Link to="/cart">
//                     Cart
//                     <span>(0)</span>
//                 </Link>
//             </nav>
//         )
// }
// export default Navbar;