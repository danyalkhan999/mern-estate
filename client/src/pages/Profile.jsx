import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { uploadImageToCloudinary } from "../services/cloudinary/uploadSingleImage";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [profileImage, setProfileImage] = useState(currentUser.avatar);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  // console.log("image-file", file);

  const handleUpload = async (imgFile) => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsUploading(true);
    try {
      const uploadUrl = await uploadImageToCloudinary(imgFile);
      console.log("image url", uploadUrl);
      if (uploadUrl) {
        setProfileImage(uploadUrl);
        setSuccessMessage("Profile image is added.");
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Failed!!!, Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={profileImage}
          alt="profile-img"
          className="rounded-full h-24 w-24 onject-cover cursor-pointer self-center mt-2"
        />
        {isUploading && (
          <p className="text-sm text-center text-gray-500 mt-1">Uploading...</p>
        )}
        {successMessage && (
          <p className="text-sm text-center text-green-500 mt-1">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-center text-red-500 mt-1">
            {errorMessage}
          </p>
        )}

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500  cursor-pointer">Delete Account</span>
        <span className="text-red-500  cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
