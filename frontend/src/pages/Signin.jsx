import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/signin_signup/InputField";
import { loginApi } from "../modules/signupApi";
import { userStore } from "../stores/UserStore";
import { useEffect, useState } from "react";
import { checkSession } from "../modules/basicApis";
function Signin() {
  const [errorMessage, setErrorMessage] = useState({error: null});
  const { setUserInfo, } = userStore();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const remember_me = e.target.remember_me.checked;
    const jsonData = { email, password, remember_me };
    const response = await loginApi(jsonData);
    console.log(response);
    if (response.message === "Login successful") {
      console.log("Login successful");
      setUserInfo(response.user);
      setTimeout(() => {
        return navigate(`/home/`, { replace: true });
        //window.location.href = "/home";
      }, 1000);
    } 
    if(response.message === "Login failed") {
      setErrorMessage({error: "Invalid email or password"});
    }
  }

   useEffect(() => {

     async function session() {
       const check = await checkSession();
       console.log("check session", check);
       setUserInfo(check);
       if (check.user_id) {
         console.log("logged in");
         navigate(`/home/`, { replace: true });
       }
     }
     session();
   }, []);

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full sm:px-6 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 ">
                  Don&apos;t have an account{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </div>
              {errorMessage.error && <p className="text-red-500">{errorMessage.error}</p>}
              <InputField
                name={"email"}
                label={"Email"}
                type={"email"}
                placeholder={"Enter email"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </InputField>
              <InputField
                name={"password"}
                label={"Password"}
                type={"password"}
                placeholder={"Enter password"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </InputField>
              <div className="flex items-center justify-between gap-2 mt-5">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to="forgot-password"
                    className="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
