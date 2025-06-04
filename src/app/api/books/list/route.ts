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

    // Map _id to id for client usage
    interface BookWithId {
      _id: { toString: () => string };
      [key: string]: unknown;
    }

    const booksWithId = (books as BookWithId[]).map((book) => ({
      ...book,
      id: book._id.toString(),
    }));

    return NextResponse.json(booksWithId);
  } catch (error) {
    console.error('Error fetching books list:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
