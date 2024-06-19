import { useState } from "react";
import { postToFeed } from "../../modules/feedApis";
import { ValidatePostContent, ValidatePostTitle } from "../../modules/validate";
import { feedStore } from "../../stores/FeedStore";
import { userStore } from "../../stores/UserStore";

function PostField() {
    const { feedList, setFeedList } = feedStore();
    const { userInfo } = userStore();
    const [alertMessage, setAlertMessage] = useState("");
    async function handelPost(event) {
      event.preventDefault();

      if(ValidatePostTitle(event.target.postTitle.value) === false) {
        setAlertMessage("Post title must be between 3 and 100 characters");
        return;
      }
      if(ValidatePostContent(event.target.postContent.value) === false) {
        setAlertMessage("Post content must be between 3 and 1000 characters");
        return;
      }
      const MAX_IMG_SIZE = 4;
      if (event.target.image.files.length > 0) {
        const fileSize = event.target.image.files.item(0).size;
        const fileSizeMb = fileSize / 1024 ** 2;
        if (fileSizeMb > MAX_IMG_SIZE) {
          setAlertMessage(`Too big! Select an image under ${MAX_IMG_SIZE} MB!`);
          event.target.image.value = "";
          return;
        }
      }


      console.log(event.target.image.files[0])
      const formData = new FormData();
      formData.append('postTitle', event.target.postTitle.value);
      formData.append('postContent', event.target.postContent.value);
      formData.append('user_id', userInfo.user_id);
      formData.append('image_url', event.target.image.files[0]);
      const sendPost = await postToFeed(formData);
      console.log(sendPost);
      setFeedList([...feedList, sendPost[0]]);
      event.target.postTitle.value = "";
      event.target.postContent.value = "";
      event.target.image.value = "";
      setAlertMessage("");
    }

  return (
    <section className="mx-auto max-w-screen-xl">
      <form
        onSubmit={handelPost}
        action=""
        className="p-8 max-w-2xl w-4/6 mx-auto drop-shadow bg-white flex flex-col gap-4 items-end"
      >
        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-sm text-gray-500 dark:text-gray-300"
          >
            Title
          </label>

          <input
            type="text"
            name="postTitle"
            placeholder="Post title"
            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </div>
        <textarea
          name="postContent"
          placeholder="lorem..."
          className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        ></textarea>
        <input
          className="block w-fit mr-auto border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"
          type="file"
          name="image"
          accept=".jpeg, .jpg, .png, .webp"
        />
        <div className="flex justify-between w-full text-red-500">
          <span>{alertMessage}</span>
          <button
            className="w-fit shadow-xl py-2.5 px-8 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostField