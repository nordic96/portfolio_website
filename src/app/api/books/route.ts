import { getBookData } from '@/src/lib/openlibrary';
import { BookApiResponse } from '@/src/types/book';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isbnArr = ['9780099584575'];
    const completedIsbnArr = [
      '9781473695993',
      '9780132350884',
      '9789352135240',
      '9780143124986',
    ];
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
