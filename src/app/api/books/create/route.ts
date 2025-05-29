import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/db";

const bookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  isAvailable: Boolean,
  description: String,
  isPopular: Boolean,
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();

    const { name, price, imageUrl, isAvailable, description, isPopular } = body;

    if (!name || price === undefined || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, imageUrl" },
        { status: 400 }
      );
    }

    const newBook = new Book({
      name,
      price,
      imageUrl,
      isAvailable: isAvailable ?? true,
      description: description ?? "",
      isPopular: isPopular ?? false,
    });

    await newBook.save();

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
