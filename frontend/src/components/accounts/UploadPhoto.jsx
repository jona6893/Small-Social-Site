import { useState } from "react";
import { changePhoto } from "../../modules/userApis";
import { userStore } from "../../stores/UserStore";


function UploadPhoto() {
const [alertMessage, setAlertMessage] = useState("");
const { userInfo } = userStore();

async function uploadPhoto() {
    event.preventDefault();
    console.log("event.target.image.files[0]")

    const MAX_IMG_SIZE = 4;
    if (event.target.image.files.length > 0) {
        const fileSize = event.target.image.files.item(0).size;
        const fileSizeMb = fileSize / 1024 ** 2;
        if (fileSizeMb > MAX_IMG_SIZE) {
        setAlertMessage(
            `Too big! Select an image under ${MAX_IMG_SIZE} MB!`
        );
        event.target.image.value = "";
        return;
        }
    }

    const formData = new FormData();
    formData.append("user_id", userInfo.user_id);
    formData.append("image_url", event.target.image.files[0]);
    const sendPhoto = await changePhoto(formData);
    console.log(sendPhoto);
}


  return (
    <div className="flex items-start">
      <form action="" onSubmit={uploadPhoto}>
        <span className="text-red-500">{alertMessage}</span>
        <div className="font-[sans-serif] max-w-md">
          <label className="text-base text-gray-500 font-semibold mb-2 block">
            Upload file
          </label>
          <input
            type="file"
            name="image"
            className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
          />
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG SVG, WEBP, and GIF are Allowed.
          </p>
        </div>
        <button type="submit" className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
          Change photo
        </button>
      </form>
    </div>
  );
}

export default UploadPhoto