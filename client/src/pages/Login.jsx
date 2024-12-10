import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../hooks/use-auth.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // form state for login
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // handle errors with toast
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      handleError(result.error);
    } else {
      handleSuccess(result.message);
      navigate("/dashboard");
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="h-[100vh] w-full flex justify-center items-center">
        <div className="form-container">
          <h2>Login Account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account? <Link to={"/register"}>Signup</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
