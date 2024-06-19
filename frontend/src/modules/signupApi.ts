interface SignupData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const apiUrl = process.env.REACT_APP_API_URL;
export async function signupApi(jsonData: SignupData) {
  //console.log(jsonData);
  const response = await fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });
  const data = await response.json();
  return data;
}

export async function loginApi(jsonData: SignupData) {
  //console.log(jsonData);
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jsonData),
  });
  const data = await response.json();
  return data;
} 