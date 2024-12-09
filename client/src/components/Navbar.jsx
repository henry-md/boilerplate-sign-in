import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    console.log('in useEffect', cookies, cookies.token);
    setIsAuthenticated(Boolean(cookies.token) && cookies.token !== "undefined");
  }, [cookies, removeCookie]);

  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <ul className="absolute top-0 left-0 right-0 flex items-center justify-end gap-2 mx-16">
      <li><a className="flex items-center px-4 py-4 cursor-pointer hover:text-yellow-600" onClick={() => navigate("/")}>Home</a></li>
      {console.log('isAuthenticated', isAuthenticated, 'isHome', isHome)}
      {isAuthenticated && !isHome ? (
        <li><a className="flex items-center px-4 py-4 cursor-pointer hover:text-yellow-600" onClick={handleLogout}>Logout</a></li>
      ) : (
        <>
          <li><a className="flex items-center px-4 py-4 cursor-pointer hover:text-yellow-600" onClick={() => navigate("/login")}>Login</a></li>
          <li><a className="flex items-center px-4 py-4 cursor-pointer hover:text-yellow-600" onClick={() => navigate("/signup")}>Signup</a></li>
        </>
      )}
    </ul>
  )
};

export default Navbar;
