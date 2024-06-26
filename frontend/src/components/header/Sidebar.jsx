import { useEffect, useState } from "react";
import { searchUsersApi } from "../../modules/basicApis";
import SearchResults from "./SearchResults";
import { Link } from "react-router-dom";
import { getFriendRequests } from "../../modules/userApis";

function Sidebar({tglMenu, setTglMenu, userInfo, handleSignOut}) {
    const [searchResults, setSearchResults] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [currentMenu, setCurrentMenu] = useState("Dashboard");
    const apiUrl = process.env.REACT_APP_API_URL;
    
    async function handelSearch(e) {
    e.preventDefault();
    console.log(e.target.value);
    if(e.target.value.length < 1){
        setSearchResults([]);
        return
    }
    const searchUsers = await searchUsersApi(e.target.value);
    console.log(searchUsers);
    setSearchResults(searchUsers);
    }

    useEffect(() => {
      async function getRequest() {
        const request = await getFriendRequests(userInfo.user_id);
        setFriendRequests(request);
        console.log(request);
      }
      getRequest();
    }, [])


  return (
    <aside className="absolute z-10 right-0 top-0 flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-l  dark:bg-gray-900 dark:border-gray-700">
      <button onClick={() => setTglMenu(!tglMenu)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute top-4 right-4 cursor-pointer dark:text-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex items-end w-fit px-4 -mx-2">
        <Link to="/home" className="flex items-center">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src={apiUrl + userInfo?.image_url}
            alt="avatar"
          />
        </Link>
        <div className="grid">
          <span className="text-base font-medium text-gray-800 dark:text-gray-200">
            {userInfo?.firstName} {userInfo?.lastName}
          </span>
          <span className="text-xs text-gray-600">{userInfo.email}</span>
        </div>
      </div>

      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          onChange={handelSearch}
          type="text"
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Search"
        />
        {searchResults.length > 0 && (
          <SearchResults searchResults={searchResults} />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            onClick={() => setCurrentMenu("Dashboard")}
            className={`flex items-center px-4 py-2 text-gray-600 ${
              currentMenu == "Dashboard" && "bg-gray-100 text-gray-700"
            } rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300 transform`}
            to="home"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Dashboard</span>
          </Link>

          <Link
            onClick={() => setCurrentMenu("Accounts")}
            className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md ${
              currentMenu == "Accounts" && "bg-gray-100 text-gray-700"
            } hover:bg-gray-100  hover:text-gray-700`}
            to="accounts"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Accounts</span>
          </Link>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Tickets</span>
          </a>

          <Link
            onClick={() => setCurrentMenu("Settings")}
            className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md ${
              currentMenu == "Settings" && "bg-gray-100 text-gray-700"
            } hover:bg-gray-100  hover:text-gray-700`}
            to="settings"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Settings</span>
          </Link>

          <hr className="my-6 border-gray-200 dark:border-gray-600" />
          <button onClick={handleSignOut} className="text-[15px] text-red-500">
            Sign out
          </button>
        </nav>
        {friendRequests.length > 0 &&
          friendRequests.map((request) => (
            <div
              key={request.friend_request_id}
              className="flex items-center justify-between gap-4 p-2 border-b"
            >
              <div className="flex gap-2 items-center ">
                <img className="w-10 h-10 rounded-full object-contain " src={apiUrl + request.image_url} alt="" />
                <h3 className="text-base font-semibold">{request.sender}</h3>
              </div>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600">
                Add
              </button>
            </div>
          ))}
      </div>
    </aside>
  );
}

export default Sidebar;
