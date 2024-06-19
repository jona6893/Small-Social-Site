// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;

export async function postToFeed(post) {
  const response = await fetch(`${apiUrl}/post-to-feed`, {
    method: "POST",
    headers: {
      //"Content-Type": "application/json",
    },
    credentials: "include",
    body: post,
  });
  const data = await response.json();
  return data;
}

export async function getFeed(user_id) {
  const response = await fetch(`${apiUrl}/get-feed/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}


export async function tglLike(postId, userId) {
  const response = await fetch(`${apiUrl}/tgl-like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ postId, userId }),
  });
  const data = await response.json();
  return data;
}

export async function getLikes(postId, user_id) {
  const response = await fetch(`${apiUrl}/get-likes/${postId}/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}