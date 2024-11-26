// uploadImage.js
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

// console.log("cname", cloudName);
// console.log("preset", uploadPreset);
export const uploadImageToCloudinary = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();

  // Append the file and preset
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    // Upload the image using fetch
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Return the uploaded image URL
      return data.secure_url;
    } else {
      // Handle error response
      throw new Error(data.error.message || "Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
