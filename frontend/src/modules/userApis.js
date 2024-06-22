
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

export async function sendFriendRequest(friend_id, user_id) {
    const response = await fetch(`${apiUrl}/friend-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ friend_id, user_id }),
    });
    const data = await response.json();
    return data;
}

export async function getFriendRequests(user_id) {
    const response = await fetch(`${apiUrl}/friend-requests/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
}