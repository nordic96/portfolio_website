function formatShortDate(str: string): string {
    const d = new Date(str);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    }).format(d);
    return formattedDate;
}

const dateUtils = { formatShortDate };
export default dateUtils;
