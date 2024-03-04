import { uploadImage } from "@/lib/upload-image";
import { NextResponse } from "next/server";


export async function Post(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image") as unknown as File;
  const data = await uploadImage(image, "nextjs-imagegallery");
  return NextResponse.json(
    { msg: image },
    {
      status: 200,
    }
  );
}
