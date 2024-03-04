"use client";

import { CldUploadWidget } from "next-cloudinary";

const CloudUpload = () => {
  return (
    <CldUploadWidget uploadPreset="next_cloudinary_app">
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default CloudUpload;
