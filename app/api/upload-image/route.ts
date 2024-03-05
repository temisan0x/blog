import { uploadImage } from "@/lib/upload-image";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;
    const imageUrl = await uploadImage(image, "nextjs-imagegallery");

    return NextResponse.json({ imageUrl }, { status: 200 });
    console.log("worked...");
  } catch (error) {
    console.error("Error uploading image", error);
    return NextResponse.json(
      { error: "Failure uploading image" },
      { status: 500 }
    );
  }
}
