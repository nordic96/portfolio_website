export interface Author {
  url: string;
  name: string;
}

export interface BookData {
  url: string;
  key: string;
  title: string;
  authors: Author[];
  number_of_pages: number;
  publish_date: string;
  cover?: {
    small?: string;
    medium?: string;
    large?: string;
  };
}

export interface BookApiResponse {
  reading_books: BookData[];
  completed_books: BookData[];
}
