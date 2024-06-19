// Desc: Basic Api functions for the frontend

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
// checkSession Api function to check if the user is logged in
console.log(apiUrl);
export async function checkSession() {
  const response = await fetch(`${apiUrl}/get-session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}


// Sign out Api function to sign out the user
export async function signOutApi() {
  const response = await fetch(`${apiUrl}/signout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}


// Search Users Api function to search for users
export async function searchUsersApi(searchTerm) {
  const response = await fetch(`${apiUrl}/search-users?searchTerm=${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}