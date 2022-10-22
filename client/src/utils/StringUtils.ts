const MAX_LEN = 100;
function shortenString(str: string, maxLen?: number): string {
    let max = MAX_LEN;
    if (!!maxLen) max = maxLen;
    if (str.length <= max) return str;
    return `${str.substring(0, max)}...`;
}

const StringUtils = { shortenString };
export default StringUtils;
