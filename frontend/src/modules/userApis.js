
// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;


export async function changePhoto(photo) {
    const response = await fetch(`${apiUrl}/update-image`, {
      method: "POST",
      headers: {},
      credentials: "include",
      body: photo,
    });
    const data = await response.json();
    return data;
}
