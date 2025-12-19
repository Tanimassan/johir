import { NextResponse } from "next/server";
import cloudinary from "../lib/cloudanary";
import connectMongo, { Link } from "../lib/database";

export async function POST(request) {
  try {
    await connectMongo(); // connect before using MongoDB

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const service = formData.get("service");
    const name = formData.get("name");
    const sediol = formData.get("sediol");
    const file = formData.get("photo");

    if (!title || !description || !service || !name || !sediol || !file) {
      return NextResponse.json({
        success: false,
        message: "All fields required!",
      });
    }
    console.log({
      "title": title,
      "description": description,
      "service": service,
      "name": name, "sediol": sediol,
      "file": file

    })
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(base64Image, {
      folder: "homes",
    });

    // Save MongoDB
    //     const newItem = await Link.create({
    //         title,
    //         description,
    //         url,                                // ✅ saving the URL field
    //         photos: [upload.secure_url],
    //     });
    // // Upload image to Cloudinary
    // const uploadResult = await cloudinary.uploader.upload(
    //   Buffer.from(await file.arrayBuffer())
    // );

    const newHome = await Link.create({
      title,
      description,
      service,
      name,
      sediol,
      photo: upload.secure_url,
    });
    console.log("hi", newHome)
    return NextResponse.json({ success: true, homes: newHome });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const homes = await Link.find({}).sort({ _id: -1 });
    return NextResponse.json({ success: true, homes });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
