import { uploadImage } from "@/lib/upload-image";
import { NextResponse } from "next/server";

export async function Post(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    const data = await uploadImage(image, "nextjs-imagegallery");
    return NextResponse.json(
      { msg: data },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error uploading image",error);
    return NextResponse.json(
        {error: "Failure uploading image"},
        {
            status: 500,
        }
    );
  }
}
