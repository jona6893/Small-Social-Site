import { useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import { signOutApi } from "../../modules/basicApis";
import Sidebar from "./Sidebar";

export default function Header() {
    const { userInfo, setUserInfo } = userStore();
    const [tglMenu, setTglMenu] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navbarLinks = [
      { name: "Dashboard", path: "/home" },
      /*     { name: "Home", path: "/" },
      { name: "Sign up", path: "/signup" },
      { name: "Sign in", path: "/signin" }, */
    ];

   async function handleSignOut() {
      console.log("sign out")
      const response = await signOutApi()
      console.log(response)
      if (response.message === "Signout successful"){
        setUserInfo(null);
        window.location.href = "/signin";
      }
    }
    

  return (
    <header className="relative">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className=" flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Folio
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {userInfo?.user_id ? (
              <div className="flex flex-wrap items-center justify-center gap-4 cursor-pointer">
                <button onClick={() => setTglMenu(!tglMenu)}>
                  <img
                    src={apiUrl+userInfo?.image_url}
                    className="w-12 h-12 rounded-full"
                  />
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="signup"
                  className="w-fit shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign up
                </Link>
                <Link
                  to="/signin"
                  className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border  rounded-full md:inline-flex"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
          {tglMenu && <Sidebar setTglMenu={setTglMenu} tglMenu={tglMenu} userInfo={userInfo} handleSignOut={handleSignOut} />}
        </div>
      </nav>
    </header>
  );
}
