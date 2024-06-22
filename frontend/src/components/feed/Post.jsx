import { useEffect, useState } from "react";
import { getLikes, tglLike } from "../../modules/feedApis";
import { userStore } from "../../stores/UserStore";
import { feedStore } from "../../stores/FeedStore";


function Post({ post, handleDelete }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [like, setLike] = useState(post.has_liked);
  const [likes, setLikes] = useState(post.likes_count);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { userInfo } = userStore();
  const { setFeedList } = feedStore();
  const createdAt = new Date(post.created_at).toLocaleDateString();

  async function handleLike() {
    try {
      setLike(!like);
      const response = await tglLike(post.post_id, userInfo.user_id);
      //console.log(response); // "Operation successful"

      if (like === true) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-2xl sm:w-2/3 w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={apiUrl + post.author_image}
            className="hidden object-cover w-10 h-10 rounded-full sm:block"
            alt="avatar"
          />
          <div className="grid">
          <a
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            tabIndex="0"
            role="link"
          >
            {post.first_name} {post.last_name}
          </a>
        <span className="text-xs font-light text-gray-600 dark:text-gray-400">
          {createdAt}
        </span>
          </div>
        </div>
      </div>

        {post.image_url !== null && (
          <div className="w-full flex justify-center">
            <img
              src={`${apiUrl}${post.image_url}`}
              alt=""
              className="rounded-lg object-contain w-fit h-64 mt-4"
            />
          </div>
        )}
      <div className="mt-2">
        {/* <a
          href="#"
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          tabIndex="0"
          role="link"
        >
          {post?.post_title}
        </a> */}
        <p className="mt-2 text-gray-700">
          {post?.post_content}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button onClick={handleLike}>
            {like ? (
              <svg
                className="w-6 h-6 text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className={`w-6 h-6 text-blue-500`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                />
              </svg>
            )}
          </button>
          <span className="text-sm text-gray-500"> {likes} Likes</span>
        </div>
        {confirmDelete ? (
          <div className="flex bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => {
                handleDelete(post.post_id), setConfirmDelete(!confirmDelete);
              }}
              className="bg-red-500 text-white px-2"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(!confirmDelete)}
              className="bg-gray-100 text-black px-2"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(!confirmDelete)}
            aria-label="Delete Post"
          >
            <svg
              className="w-6 h-6 text-red-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post