import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(process.env.CLOUDINARY_CLOUD_NAME);

// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // // file has been uploaded successfull
    // console.log("file is uploaded on cloudinary: ", res);

    fs.unlinkSync(localFilePath);

    return res;
  } catch (error) {
    console.log("Cloudinary error : ", error);

    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    if (!publicId) {
      console.log("No public ID provided");
      return null;
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result;
  } catch (error) {
    console.log("Cloudinary delete Error :", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
