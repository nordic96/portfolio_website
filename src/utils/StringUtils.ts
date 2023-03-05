const MAX_LEN = 100;
function shortenString(str: string, maxLen?: number): string {
    let max = MAX_LEN;
    if (!!maxLen) max = maxLen;
    if (str.length <= max) return str;
    return `${str.substring(0, max)}...`;
}

const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const StringUtils = { shortenString, getFlagEmoji };
export default StringUtils;
