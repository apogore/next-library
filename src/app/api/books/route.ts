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

export async function GET(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id format' }, { status: 400 });
    }

    const book = await Book.findById(id).lean();

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
