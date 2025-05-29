import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/db';

// Define a Mongoose schema and model for Book/Product
const bookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  isAvailable: Boolean,
  description: String,
  isPopular: Boolean,
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export async function GET() {
  try {
    await connectToDB();

    const books = await Book.find({}).lean();

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books list:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
