import cloudinary from "./cloudinary";

export const uploadImage = async (file: File, folder: string) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    return new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: folder,
          },
          (err, result) => {
            if (err) {
              reject(err.message);
            }
            return resolve(result?.secure_url);
          }
        )
        .end(bytes);
    });
  } catch (error: any) {
    throw new Error(`,${error.message}`);
  }
};
