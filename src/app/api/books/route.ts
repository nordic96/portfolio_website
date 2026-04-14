import { getBookData } from '@/src/lib/openlibrary';
import { BookApiResponse } from '@/src/types/book';
import { NextResponse } from 'next/server';

interface ISBNResponse {
  reading: string[];
  completed: string[];
}

export async function GET() {
  try {
    let isbnArr = [];
    let completedIsbnArr = [];
    const url = new URL(
      `${process.env.NEXT_PUBLIC_CDN_BASE}/resources/books.json`,
    );
    const isbnRes = await fetch(url);
    if (isbnRes.status === 200 && isbnRes.ok) {
      const data = (await isbnRes.json()) as ISBNResponse;
      isbnArr = data.reading || [];
      completedIsbnArr = data.completed || [];
    } else {
      throw new Error('failed to fetch isbn data');
    }
    const promiseArr = isbnArr.map((x) => getBookData(x));
    const completedArr = completedIsbnArr.map((x) => getBookData(x));

    const readingBooks = await Promise.all(promiseArr);
    const completedBooks = await Promise.all(completedArr);

    const preparedResponse: BookApiResponse = {
      reading_books: readingBooks,
      completed_books: completedBooks,
    };
    return NextResponse.json({ data: preparedResponse });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message });
    }
  }
}
