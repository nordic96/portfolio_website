export async function getBookData(isbn: string) {
  try {
    const url = new URL('https://openlibrary.org/api/books');
    url.searchParams.append('bibkeys', `ISBN:${isbn}`);
    url.searchParams.append('jscmd', 'data');
    url.searchParams.append('format', 'json');

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200 || !res.ok) {
      throw new Error('Server Error from OpenLibrary');
    }

    const data = await res.json();
    const processedData = data[`ISBN:${isbn}`];
    return processedData;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
}
