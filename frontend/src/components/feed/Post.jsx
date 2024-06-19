import { useEffect, useState } from "react";
import { getLikes, tglLike } from "../../modules/feedApis";
import { userStore } from "../../stores/UserStore";


function Post({post}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [like, setLike] = useState(post.has_liked)
  const [likes, setLikes] = useState(post.likes_count)
  const {userInfo} = userStore();
  const createdAt = new Date(post.created_at).toLocaleDateString()


  function handelLike() {
    tglLike(post.post_id, userInfo.user_id)
    setLike(!like)

  }



  
  return (
    <div className="max-w-2xl w-4/6 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {createdAt}
        </span>
      </div>

      <div className="mt-2">
        <a
          href="#"
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          tabIndex="0"
          role="link"
        >
          {post?.post_title}
        </a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {post?.post_content}
        </p>
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

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button onClick={handelLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke=""
              className={`size-6 stroke-blue-500 ${like && "fill-blue-500"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          </button>
          <span className="text-sm text-gray-500"> {likes} Likes</span>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={apiUrl + post.author_image}
            className="hidden object-cover w-10 h-10 rounded-full sm:block"
            alt="avatar"
          />
          <a
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            tabIndex="0"
            role="link"
          >
            {post.first_name} {post.last_name}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Post